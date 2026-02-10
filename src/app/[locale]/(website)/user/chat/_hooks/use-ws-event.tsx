import { useEffect } from "react"
import { getOrInitWebSocket } from "../_ws"
import { WSOnEvents } from "../_ws/events"
import { onEvent, WsEventHandler } from "../_ws/events-handler"

export function useWsEvent<T extends WSOnEvents>(
  event: T,
  callback: WsEventHandler<T>
) {
  useEffect(() => {
    getOrInitWebSocket()
    const unsubscribe = onEvent(event, callback)

    return () => unsubscribe()
  }, [event, callback])
}
