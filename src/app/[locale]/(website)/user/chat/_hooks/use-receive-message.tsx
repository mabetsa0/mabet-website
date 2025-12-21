"use client"

import { useQueryClient } from "@tanstack/react-query"
import { Message } from "../_types/chat-response"
import { WS_ON_EVENTS, WS_ON_KEYS, WSOnEvents } from "../_ws/events"
import { WsEventHandler } from "../_ws/events-handler"
import { useWsEvent } from "./use-ws-event"

export const useReceiveMessage = () => {
  const queryClient = useQueryClient()

  const handleReceiveMessage: WsEventHandler<
    typeof WS_ON_EVENTS.MESSAGE_RECEIVED
  > = (data: Message) => {
    const uuid = data.conversation_uuid
    queryClient.setQueryData<{
      pages: { messages: Message[]; has_more: boolean }[]
    }>(["chat-messages", uuid], (oldData) => {
      if (!oldData) {
        return {
          pages: [
            {
              messages: [data],
              has_more: false,
            },
          ],
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
  }
  // Register the MESSAGE_SENT event listener
  useWsEvent(WS_ON_EVENTS.MESSAGE_RECEIVED, handleReceiveMessage)
}
