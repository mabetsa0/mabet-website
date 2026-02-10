import { WS_ON_EVENTS } from "../_ws/events"
import { useWsEvent } from "./use-ws-event"

type WsErrorData = { code: string; message: string }
type WsErrorCallback = (data: WsErrorData) => void
const useWsError = (eventId: string | undefined, callback: WsErrorCallback) => {
  const handleError = (data: WsErrorData, id: string) => {
    if (id !== eventId || !eventId) return
    callback(data)
  }

  // Register the ERROR event listener
  useWsEvent(WS_ON_EVENTS.ERROR, handleError)
}

export default useWsError
