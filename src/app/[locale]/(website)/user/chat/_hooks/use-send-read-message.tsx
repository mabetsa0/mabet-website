"use client"

import { useCallback } from "react"
import { useSendEvent } from "../_hooks/use-send-event"
import { WS_SEND_EVENTS } from "../_ws/events"

export const useSendReadMessage = (conversationUuid: string) => {
  const { sendEvent } = useSendEvent()

  const markAsRead = useCallback(
    (messageId: string) => {
      if (!conversationUuid || !messageId) return

      sendEvent(WS_SEND_EVENTS.READ_MESSAGE, {
        conversation_uuid: conversationUuid,
        message_id: messageId,
      })
    },
    [conversationUuid, sendEvent]
  )

  return { markAsRead }
}
