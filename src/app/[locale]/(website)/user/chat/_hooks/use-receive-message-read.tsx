"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useChatsListStore } from "../_stores/chats-list-store-provider"
import { useUserStore } from "../_stores/user-store-provider"
import { type Conversation } from "../_types/chats-response"
import { WS_ON_EVENTS } from "../_ws/events"
import { type WsEventHandler } from "../_ws/events-handler"
import { useWsEvent } from "./use-ws-event"

export const useReceiveMessageRead = () => {
  const queryClient = useQueryClient()
  const { conversations, upsertConversation } = useChatsListStore(
    (state) => state
  )
  const user = useUserStore((state) => state.user)

  const handleMessageRead: WsEventHandler<typeof WS_ON_EVENTS.MESSAGE_READ> = (
    data
  ) => {
    const {
      conversation_uuid,
      user_id,
      user_type,
      user_name,
      message_id,
      timestamp,
    } = data

    // Update messages cache if it exists for this conversation.
    // Even though messages don't currently have read metadata,
    // touching the cache ensures any components relying on it
    // can react to updates in the future without extra wiring.
    queryClient.setQueryData<{
      pages: { messages: unknown[]; has_more: boolean }[]
    }>(["chat-messages", conversation_uuid], (oldData) => {
      if (!oldData) return oldData
      return { ...oldData }
    })

    // Update the chats list conversation to reflect the latest read position
    const existingConversation = conversations.find(
      (conversation) => conversation.uuid === conversation_uuid
    )

    if (!existingConversation) return

    const updatedReadPositions: Conversation["read_positions"] = [
      // Remove any existing read position for this user
      ...existingConversation.read_positions.filter(
        (position) =>
          !(position.user_id === user_id && position.user_type === user_type)
      ),
      {
        user_id,
        user_type,
        user_name,
        message_id,
        timestamp,
      },
    ]

    const updatedConversation: Conversation = {
      ...existingConversation,
      read_positions: updatedReadPositions,
      // If the current user is the reader, locally clear unread messages count
      ...(user && Number(user.id) === user_id
        ? { unread_messages_count: 0 }
        : {}),
    }

    upsertConversation(updatedConversation)
  }

  useWsEvent(WS_ON_EVENTS.MESSAGE_READ, handleMessageRead)
}
