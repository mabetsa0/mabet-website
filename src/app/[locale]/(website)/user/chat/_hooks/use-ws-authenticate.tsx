"use client"

import { useEffect, useRef, useState } from "react"
import { useSendEvent } from "../_hooks/use-send-event"
import { useWsEvent } from "../_hooks/use-ws-event"
import { useUserStore } from "../_stores/user-store-provider"
import { WS_ON_EVENTS, WS_SEND_EVENTS } from "../_ws/events"
import { WsEventHandler } from "../_ws/events-handler"

export const useWsAuthenticate = (accessToken: string) => {
  const setUser = useUserStore((state) => state.setUser)
  const [error, setError] = useState<string | null>(null)
  const { sendEvent } = useSendEvent()
  const lastAuthenticateEventIdRef = useRef<string | null>(null)

  const handleAuthenticated: WsEventHandler<
    typeof WS_ON_EVENTS.AUTHENTICATED
  > = (data) => {
    setError(null)
    setUser({
      id: data.user_id.toString(),
      name: data.user_name,
      type: data.user_type as "user" | "guest",
    })
  }
  // Register the event listener
  useWsEvent(WS_ON_EVENTS.AUTHENTICATED, handleAuthenticated)

  const handleError: WsEventHandler<typeof WS_ON_EVENTS.ERROR> = (data, id) => {
    // Handle errors related to AUTHENTICATE event
    if (id === lastAuthenticateEventIdRef.current) {
      setError(data.message)
      return
    }
  }

  useWsEvent(WS_ON_EVENTS.ERROR, handleError)

  // Send authenticate event
  useEffect(() => {
    lastAuthenticateEventIdRef.current = sendEvent(
      WS_SEND_EVENTS.AUTHENTICATE,
      {
        token: accessToken,
        first_conversations_page_size: 0,
      }
    )!
  }, [accessToken])

  return {
    error,
  }
}
