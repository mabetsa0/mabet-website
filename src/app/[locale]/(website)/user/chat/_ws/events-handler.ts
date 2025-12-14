import { WSOnEventContentByEvent, WSOnEvents } from "./events"

export type WsEventHandler<T extends WSOnEvents> = (
  data: WSOnEventContentByEvent[T],
  id: string
) => void

const handlers: Partial<Record<WSOnEvents, WsEventHandler<any>[]>> = {}

export function onEvent<T extends WSOnEvents>(event: T, cb: WsEventHandler<T>) {
  if (!handlers[event]) handlers[event] = []
  handlers[event].push(cb)

  return () => {
    handlers[event] = handlers[event]?.filter((h) => h !== cb)
  }
}

export function emitEvent<T>(event: WSOnEvents, data: T, id: string) {
  if (handlers[event]) {
    handlers[event].forEach((h) => h(data, id))
  }
}
