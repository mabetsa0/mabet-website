"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { notifications } from "@mantine/notifications"
import { useQueryClient } from "@tanstack/react-query"
import { useChatData } from "../_contexts/chat-context"
import { useSendEvent } from "../_hooks/use-send-event"
import { useWsEvent } from "../_hooks/use-ws-event"
import { useUserStore } from "../_stores/user-store-provider"
import { Message } from "../_types/chat-response"
import { WS_ON_EVENTS, WS_SEND_EVENTS } from "../_ws/events"
import useWsError from "./use-ws-error"

type MessageSentEventPayload = Message

type SendMessageParams = {
  conversation_uuid: string
  content: string
}

export const useSendMessage = () => {
  const t = useTranslations("chat")
  const user = useUserStore((state) => state.user)
  const chatData = useChatData()
  const uuid = chatData?.uuid
  const queryClient = useQueryClient()
  const { sendEvent } = useSendEvent()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lastSendMessageEventIdRef = useRef<string | null>(null)
  const optimisticMessageIdRef = useRef<string | null>(null)

  const handleMessageSent = (data: MessageSentEventPayload, id: string) => {
    // Only handle responses related to the latest SEND_MESSAGE event we sent
    if (id !== lastSendMessageEventIdRef.current) return

    setIsLoading(false)
    setError(null)

    // Update the query cache: replace optimistic message with real message
    queryClient.setQueryData<{
      pages: { messages: Message[]; has_more: boolean }[]
    }>(["chat-messages", uuid], (oldData) => {
      if (!oldData) return oldData

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          messages: page.messages.map((msg) =>
            msg.id === optimisticMessageIdRef.current ? data : msg
          ),
        })),
      }
    })

    // Clear the optimistic message ID
    optimisticMessageIdRef.current = null
  }

  // Register the MESSAGE_SENT event listener
  useWsEvent(WS_ON_EVENTS.MESSAGE_SENT, handleMessageSent)

  const handleError = (data: { code: string; message: string }) => {
    setIsLoading(false)
    setError(data.message)
    notifications.show({
      title: t("errors.send-message"),
      message: data.message,
      color: "red",
      autoClose: 5000,
      position: "top-right",
    })

    // Remove the optimistic message from cache on error
    queryClient.setQueryData<{
      pages: { messages: Message[]; has_more: boolean }[]
    }>(["chat-messages", uuid], (oldData) => {
      if (!oldData) return oldData

      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          messages: page.messages.filter(
            (msg) => msg.id !== optimisticMessageIdRef.current
          ),
        })),
      }
    })

    // Clear the optimistic message ID
    optimisticMessageIdRef.current = null
  }

  useWsError(lastSendMessageEventIdRef.current ?? undefined, handleError)

  const sendMessage = ({ conversation_uuid, content }: SendMessageParams) => {
    if (!user) {
      setError("User not found")
      return
    }

    if (!content.trim()) {
      setError("Message content cannot be empty")
      return
    }

    setIsLoading(true)
    setError(null)

    // Create optimistic message
    const optimisticId = `optimistic-${Date.now()}-${Math.random()}`
    optimisticMessageIdRef.current = optimisticId

    const optimisticMessage: Message = {
      id: optimisticId,
      sender_id: parseInt(user.id),
      sender_type: user.type,
      sender_name: user.name,
      conversation_uuid,
      content: content.trim(),
      created_at: new Date(),
    }

    // Add optimistic message to cache
    // Note: use-infinite-chat does: pages.toReversed().flatMap(page => page.messages.reverse())
    // Cache: pages = [page1 (oldest), ..., pageN (newest)], messages = [oldest, ..., newest]
    // After toReversed(): [pageN, ..., page1]
    // After reverse messages: each page becomes [newest, ..., oldest]
    // Flattened: [pageN newest...oldest, ..., page1 newest...oldest]
    // This gives newest first, but comment says "oldest first, newest last"
    // So maybe pages/messages are stored differently, or the transformation works differently
    //
    // Since user says message appears in reverse, and we're adding to last page at end,
    // after reversal it becomes first. So we should add to first page at beginning.
    queryClient.setQueryData<{
      pages: { messages: Message[]; has_more: boolean }[]
    }>(["chat-messages", uuid], (oldData) => {
      if (!oldData) {
        return {
          pages: [
            {
              messages: [optimisticMessage],
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
              messages: [optimisticMessage, ...page.messages],
            }
          }
          return page
        }),
      }
    })

    // Send the message via WebSocket
    lastSendMessageEventIdRef.current = sendEvent(WS_SEND_EVENTS.SEND_MESSAGE, {
      conversation_uuid,
      type: "text",
      content: content.trim(),
    })
  }

  return {
    sendMessage,
    isLoading,
    error,
  }
}
