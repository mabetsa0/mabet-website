import { useEffect, useRef } from "react"
import { getOrInitWebSocket } from "../_ws"
import { WSOnEvents } from "../_ws/events"
import { onEvent } from "../_ws/events-handler"

export function useWsEvent<T>(
  event: WSOnEvents,
  callback: (data: T, id: string) => void
) {
  // Use ref to store the latest callback without re-registering the listener
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    getOrInitWebSocket() // ensure socket is open

    // Create a stable wrapper that always calls the latest callback
    const stableCallback = (data: T, id: string) => {
      callbackRef.current(data, id)
    }

    const unsubscribe = onEvent(event, stableCallback)

    return () => unsubscribe()
  }, [event, callback])
}
