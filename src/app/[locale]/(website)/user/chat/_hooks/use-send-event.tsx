import { useEffect, useRef, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { getOrInitWebSocket, wsSendEvent } from "../_ws"
import { WSSendEventPayloadByEvent, WSSendEvents } from "../_ws/events"

type PendingEvent<T extends WSSendEvents> = {
  id: string
  event: T
  payload: WSSendEventPayloadByEvent[T]
}

export function useSendEvent() {
  const [lastEventId, setLastEventId] = useState<string>()
  const queueRef = useRef<PendingEvent<WSSendEvents>[]>([])
  const socketRef = useRef<WebSocket | null>(null)
  const handlerRef = useRef<(() => void) | null>(null)
  const wasOpenRef = useRef(false)

  const flushQueue = () => {
    console.log("[useSendEvent] Flushing queue")
    const socket = getOrInitWebSocket()
    if (!socket || socket.readyState !== WebSocket.OPEN) return

    while (queueRef.current.length) {
      const next = queueRef.current.shift()
      if (!next) continue

      wsSendEvent(next.event, next.payload, next.id)
    }
  }

  useEffect(() => {
    // Function to set up event listener for current socket
    const setupSocketListener = (socket: WebSocket) => {
      // Remove old listener if it exists
      if (socketRef.current && handlerRef.current) {
        socketRef.current.removeEventListener("open", handlerRef.current)
      }

      // Create new handler
      const handleOpen = () => {
        console.log("[useSendEvent] WebSocket opened, flushing queue")
        wasOpenRef.current = true
        flushQueue()
      }

      // Store references
      socketRef.current = socket
      handlerRef.current = handleOpen

      // Add listener to new socket
      socket.addEventListener("open", handleOpen)

      // If socket is already open, flush immediately
      if (socket.readyState === WebSocket.OPEN) {
        if (!wasOpenRef.current) {
          console.log("[useSendEvent] WebSocket already open, flushing queue")
          wasOpenRef.current = true
          flushQueue()
        }
      } else {
        wasOpenRef.current = false
      }
    }

    // Check socket state periodically to catch new socket instances
    const checkSocket = () => {
      const socket = getOrInitWebSocket()

      if (!socket) {
        // Socket doesn't exist, reset tracking
        if (socketRef.current) {
          socketRef.current = null
          handlerRef.current = null
          wasOpenRef.current = false
        }
        return
      }

      // If socket instance changed, set up listener for new socket
      if (socket !== socketRef.current) {
        console.log(
          "[useSendEvent] Socket instance changed, setting up new listener"
        )
        setupSocketListener(socket)
      } else if (socket.readyState === WebSocket.OPEN && !wasOpenRef.current) {
        // Same socket instance but just became open
        console.log("[useSendEvent] Socket became open, flushing queue")
        wasOpenRef.current = true
        flushQueue()
      } else if (socket.readyState !== WebSocket.OPEN) {
        wasOpenRef.current = false
      }
    }

    // Initial check
    checkSocket()

    // Poll every 200ms to catch socket instance changes and state transitions
    const interval = setInterval(checkSocket, 200)

    return () => {
      clearInterval(interval)
      // Clean up event listener
      if (socketRef.current && handlerRef.current) {
        socketRef.current.removeEventListener("open", handlerRef.current)
      }
      socketRef.current = null
      handlerRef.current = null
    }
  }, [])

  const sendEvent = <E extends WSSendEvents>(
    event: E,
    payload: WSSendEventPayloadByEvent[E]
  ) => {
    const id = uuidv4()
    const socket = getOrInitWebSocket()

    if (!socket || socket.readyState !== WebSocket.OPEN) {
      queueRef.current.push({ id, event, payload })
      return id
    }

    wsSendEvent(event, payload, id)
    setLastEventId(id)
    return id
  }

  return { sendEvent, lastEventId }
}
