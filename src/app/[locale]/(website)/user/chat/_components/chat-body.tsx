"use client"

import React, { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Group, Loader, ScrollArea, Stack, Text } from "@mantine/core"
import dayjs from "dayjs"
import { mabetLogo } from "@/assets"
import { cn } from "@/lib/cn"
import { useChatData } from "../_contexts/chat-context"
import { useInfiniteChat } from "../_hooks/use-infinite-chat"
import { useSendReadMessage } from "../_hooks/use-send-read-message"
import { useUserStore } from "../_stores/user-store-provider"
import ChatHeader from "./chat-header"
import ChatInput from "./chat-input"
import DateIndicator from "./date-indicator"
import Message from "./message"
import UnitCard from "./unit-card"

const ChatBody = ({
  uuid,
  isModal = false,
}: {
  uuid: string
  isModal?: boolean
}) => {
  const user = useUserStore((state) => state.user)
  const t = useTranslations("chat")
  const chatData = useChatData()
  const { messages, isLoading, isFetchingNextPage, hasNextPage, triggerRef } =
    useInfiniteChat({ uuid })
  const { markAsRead } = useSendReadMessage(uuid)

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const hasScrolledToBottomRef = useRef(false)
  const lastMessageIdRef = useRef<string | null>(null)
  const lastReadReportedMessageIdRef = useRef<string | null>(null)
  const previousScrollHeightRef = useRef<number>(0)
  const previousMessageCountRef = useRef<number>(0)
  const wasFetchingNextPageRef = useRef<boolean>(false)

  // Scroll to bottom function
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const viewport = scrollAreaRef.current
    viewport?.scrollTo({
      top: viewport!.scrollHeight,
      behavior,
    })
  }
  // scroll to top
  const scrollToTop = () => {
    scrollAreaRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Scroll to bottom on initial load
  useEffect(() => {
    if (user?.id && !isLoading && !hasScrolledToBottomRef.current) {
      // Use instant scroll for initial load
      scrollToBottom("instant")
      hasScrolledToBottomRef.current = true
      lastMessageIdRef.current = messages[messages.length - 1]?.id || null
      // Initialize scroll height ref
      if (scrollAreaRef.current) {
        previousScrollHeightRef.current = scrollAreaRef.current.scrollHeight
        previousMessageCountRef.current = messages.length
      }
    }
  }, [isLoading, user?.id, messages])

  // Preserve scroll position when loading older messages (scrolling to top)
  useEffect(() => {
    const viewport = scrollAreaRef.current
    if (!viewport || isLoading || messages.length === 0) return

    // Check if we just finished fetching next page (loading older messages)
    const justFinishedFetching =
      wasFetchingNextPageRef.current && !isFetchingNextPage
    const messageCountIncreased =
      messages.length > previousMessageCountRef.current

    // Only preserve scroll if we just finished loading older messages
    if (justFinishedFetching && messageCountIncreased) {
      // Calculate the difference in scroll height
      const currentScrollHeight = viewport.scrollHeight
      const scrollHeightDiff =
        currentScrollHeight - previousScrollHeightRef.current

      // Preserve scroll position by adjusting scrollTop
      // This keeps the user at the same visual position after new content is added above
      if (scrollHeightDiff > 0) {
        viewport.scrollTop = viewport.scrollTop + scrollHeightDiff
      }
    }

    // Update refs for next comparison
    wasFetchingNextPageRef.current = isFetchingNextPage
    previousScrollHeightRef.current = viewport.scrollHeight
    previousMessageCountRef.current = messages.length
  }, [messages, isLoading, isFetchingNextPage])

  // Scroll to bottom when new messages are added at the end (after sending)
  useEffect(() => {
    if (!hasScrolledToBottomRef.current || messages.length === 0) return

    const lastMessage = messages[messages.length - 1]
    const currentLastMessageId = lastMessage?.id

    // Only scroll if the last message ID changed (new message added at the end)
    if (
      currentLastMessageId &&
      currentLastMessageId !== lastMessageIdRef.current
    ) {
      lastMessageIdRef.current = currentLastMessageId
      // Use smooth scroll for new messages
      scrollToBottom("smooth")
    }
  }, [messages])

  // Mark the last message as read when:
  // - the chat is first opened (after messages load)
  // - new messages arrive while the user is on this chat
  useEffect(() => {
    if (!user?.id || messages.length === 0) return

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || String(lastMessage.sender_id) == String(user.id)) return

    // Avoid sending duplicate READ_MESSAGE for the same last message
    if (lastReadReportedMessageIdRef.current === lastMessage.id) return

    lastReadReportedMessageIdRef.current = lastMessage.id
    markAsRead(lastMessage.id)
  }, [messages.length, user?.id, markAsRead])

  return (
    <div
      className={cn(
        "relative inset-0 z-1 flex h-full w-full flex-col bg-white",
        !isModal ? "max-sm:absolute" : ""
      )}
    >
      {isModal ? null : <ChatHeader />}
      <ScrollArea viewportRef={scrollAreaRef} className="h-full">
        {isModal || isLoading ? null : <div className="h-6"></div>}

        {hasNextPage || isLoading ? null : (
          <>
            {!isModal && chatData.topic_id ? (
              <UnitCard
                unit={{
                  name: chatData.topic_name || "unknown",
                  id: chatData.topic_id.toString() || "unknown",
                  image: chatData.image || "",
                }}
                scrollIntoView={scrollToTop}
              />
            ) : null}
          </>
        )}

        <div className="px-[4px]">
          {hasNextPage || isLoading ? null : (
            <Stack gap={"6"} className="px-1">
              <Group
                wrap="nowrap"
                align="start"
                p={"sm"}
                className="border-primary rounded border"
                bg={"#18807826"}
              >
                <img alt="mabet" src={mabetLogo.src} width={42} />
                <Stack gap={"4"}>
                  <Text className="text-h5 font-bold">
                    {t("important-note.title")}
                  </Text>
                  <Text size={"sm"} className="text-primary">
                    {t("important-note.description")}
                  </Text>
                </Stack>
              </Group>
              <Group
                wrap="nowrap"
                align="start"
                p={"sm"}
                my={"xs"}
                className="border-primary rounded border"
                bg={"#18807826"}
              >
                <img alt="mabet" src={mabetLogo.src} width={42} />
                <Stack gap={"4"}>
                  <Text className="text-h5 font-bold">
                    {t("disclaimer.title")}
                  </Text>
                  <Text size={"sm"} className="text-primary">
                    {t("disclaimer.description")}
                  </Text>
                </Stack>
              </Group>
            </Stack>
          )}

          {hasNextPage && (
            <div ref={triggerRef} className="flex justify-center py-1">
              {isFetchingNextPage ? (
                <Loader size={"xs"} />
              ) : (
                <div className="h-1" />
              )}
            </div>
          )}

          {/* Messages */}
          {messages.length > 0 && user?.id
            ? messages.map((message, index) => {
              return (
                <React.Fragment key={`message_${message.id}`}>
                  {index === 0 ||
                    dayjs(message.created_at).format("DD/MM/YYYY") !==
                    dayjs(messages[index - 1]?.created_at).format(
                      "DD/MM/YYYY"
                    ) ? (
                    <DateIndicator date={message.created_at} />
                  ) : null}
                  <div
                    ref={
                      index === messages.length - 1 ? lastMessageRef : null
                    }
                  >
                    <Message {...message} />
                  </div>
                </React.Fragment>
              )
            })
            : null}
        </div>
      </ScrollArea>
      <ChatInput />
    </div>
  )
}

export default ChatBody
