"use client"

import { useState } from "react"
import { useUserStore } from "../_stores/user-store-provider"
import { WS_ON_EVENTS } from "../_ws/events"
import { WsEventHandler } from "../_ws/events-handler"
import { useWsEvent } from "./use-ws-event"

/**
 * Hook that listens to `typing_update` events for the current conversation
 * and exposes whether another participant is currently typing.
 */
export const useTypingIndicator = (conversationUuid: string) => {
  const user = useUserStore((state) => state.user)
  const [isTyping, setIsTyping] = useState(false)

  const handleTypingUpdate: WsEventHandler<
    typeof WS_ON_EVENTS.TYPING_UPDATE
  > = (data) => {
    // Ignore updates for other conversations
    if (data.conversation_uuid !== conversationUuid) return

    // Ignore our own typing updates
    if (
      user &&
      data.user_id === Number(user.id) &&
      data.user_type === user.type
    ) {
      return
    }

    setIsTyping(data.is_typing)
  }

  useWsEvent(WS_ON_EVENTS.TYPING_UPDATE, handleTypingUpdate)

  return { isTyping }
}
