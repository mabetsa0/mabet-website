"use client"

import { useTranslations } from "next-intl"
import { notifications } from "@mantine/notifications"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getChatInfo } from "../_services/get-chat-info"
import { useChatsListStore } from "../_stores/chats-list-store-provider"
import { Message } from "../_types/chat-response"
import { type Conversation } from "../_types/chats-response"
import { WS_ON_EVENTS } from "../_ws/events"
import { WsEventHandler } from "../_ws/events-handler"
import { useWsEvent } from "./use-ws-event"

export const useReceiveMessage = () => {
  const queryClient = useQueryClient()
  const { conversations, upsertConversation, appendSingleConversation } =
    useChatsListStore((state) => state)
  const t = useTranslations("chat-list")

  const mutation = useMutation({
    mutationFn: getChatInfo,
    onSuccess(data) {
      appendSingleConversation(data)
    },
    onError() {
      notifications.show({
        color: "red",
        title: t("errors.title"),
        message: t("errors.message"),
      })
    },
  })
  const handleReceiveMessage: WsEventHandler<
    typeof WS_ON_EVENTS.MESSAGE_RECEIVED
  > = (data) => {
    const uuid = data.conversation_uuid
    queryClient.setQueryData<{
      pages: { messages: Message[]; has_more: boolean }[]
    }>(["chat-messages", uuid], (oldData) => {
      if (!oldData) {
        return {
          pages: [],
          has_more: true,
        }
      }

      // Add to the first page at the beginning
      // This should make it appear at the end after all reversals
      return {
        ...oldData,
        pages: oldData.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              messages: [data, ...page.messages],
            }
          }
          return page
        }),
      }
    })

    // Update the chats list so that the corresponding conversation reflects
    // the newest message and moves to the top of the list.
    const existingConversation = conversations.find(
      (conversation) => conversation.uuid === uuid
    )

    if (existingConversation) {
      const updatedConversation: Conversation = {
        ...existingConversation,
        last_message: {
          ...existingConversation.last_message,
          id: data.id,
          sender_id: data.sender_id,
          sender_type: data.sender_type,
          sender_name: data.sender_name,
          conversation_uuid: data.conversation_uuid,
          content: data.content,
          // Ensure we store a string timestamp as expected by Conversation
          created_at: new Date(data.created_at).toISOString(),
        },
        unread_messages_count: existingConversation.unread_messages_count + 1,
      }

      upsertConversation(updatedConversation)
      return
    }

    // refresh the chats list
    mutation.mutate({ uuid })
  }
  // Register the MESSAGE_SENT event listener
  useWsEvent(WS_ON_EVENTS.MESSAGE_RECEIVED, handleReceiveMessage)
}
