"use client"

import { useCallback } from "react"
import { useSendEvent } from "../_hooks/use-send-event"
import { useChatsListStore } from "../_stores/chats-list-store-provider"
import { useUserStore } from "../_stores/user-store-provider"
import { Conversation } from "../_types/chats-response"
import { WS_SEND_EVENTS } from "../_ws/events"

export const useSendReadMessage = (conversationUuid: string) => {
  const { sendEvent } = useSendEvent()
  const { conversations, upsertConversation } = useChatsListStore((state) => ({
    conversations: state.conversations,
    upsertConversation: state.upsertConversation,
  }))
  const user = useUserStore((state) => state.user)

  const markAsRead = useCallback(
    (messageId: string) => {
      if (!conversationUuid || !messageId) return

      // Send read event to the server
      sendEvent(WS_SEND_EVENTS.READ_MESSAGE, {
        conversation_uuid: conversationUuid,
        message_id: messageId,
      })

      // Optimistically update the chats list so unread badge disappears immediately
      if (!user) return

      const existingConversation = conversations.find(
        (conversation) => conversation.uuid === conversationUuid
      )

      if (!existingConversation) return

      const optimisticTimestamp = new Date().toISOString()

      const updatedReadPositions: Conversation["read_positions"] = [
        // Remove any existing read position for this user
        ...existingConversation.read_positions.filter(
          (position) =>
            !(
              position.user_id === Number(user.id) &&
              position.user_type === user.type
            )
        ),
        {
          user_id: Number(user.id),
          user_type: user.type,
          user_name: user.name,
          message_id: messageId,
          timestamp: optimisticTimestamp,
        },
      ]

      const updatedConversation: Conversation = {
        ...existingConversation,
        read_positions: updatedReadPositions,
        unread_messages_count: 0,
      }

      upsertConversation(updatedConversation)
    },
    [conversationUuid, conversations, sendEvent, upsertConversation, user]
  )

  return { markAsRead }
}
