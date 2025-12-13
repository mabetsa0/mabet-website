"use client"

import React, { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import { Group, Loader, ScrollArea, Stack, Text } from "@mantine/core"
import dayjs from "dayjs"
import { mabetLogo } from "@/assets"
import { cn } from "@/lib/cn"
import { useChatData } from "../_contexts/chat-context"
import { useInfiniteChat } from "../_hooks/use-infinite-chat"
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
  const t = useTranslations("chat")
  const chatData = useChatData()
  const user = useUserStore((s) => s.user)
  const { messages, isLoading, isFetchingNextPage, hasNextPage, triggerRef } =
    useInfiniteChat({ uuid })

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const hasScrolledToBottomRef = useRef(false)
  const lastMessageIdRef = useRef<string | null>(null)

  // Scroll to bottom function
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    // Try to find the ScrollArea viewport
    const viewport = scrollAreaRef.current

    if (viewport) {
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior,
      })
    } else if (lastMessageRef.current) {
      // Fallback to scrollIntoView
      lastMessageRef.current.scrollIntoView({ behavior })
    }
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
    if (!isLoading && messages.length > 0 && !hasScrolledToBottomRef.current) {
      // Use instant scroll for initial load
      scrollToBottom("instant")
      hasScrolledToBottomRef.current = true
      lastMessageIdRef.current = messages[messages.length - 1]?.id || null
    }
  }, [isLoading])

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

  if (isLoading || !user?.id)
    return (
      <div className="relative inset-0 z-1 flex w-full items-center justify-center bg-white max-sm:absolute sm:h-[calc(100vh-100px)]">
        <Loader />
      </div>
    )

  return (
    <div
      className={cn(
        "relative inset-0 z-1 flex h-full w-full flex-col bg-white",
        !isModal ? "max-sm:absolute" : ""
      )}
    >
      {isModal ? null : <ChatHeader />}
      <ScrollArea viewportRef={scrollAreaRef} className="h-full">
        {!isModal && <div className="h-6"></div>}
        {/* Infinite scroll trigger at the top */}

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
        {hasNextPage && (
          <div ref={triggerRef} className="flex justify-center py-1">
            {isFetchingNextPage ? (
              <Loader size={"xs"} />
            ) : (
              <div className="h-1" />
            )}
          </div>
        )}

        <div className="px-[4px]">
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

          {/* Messages */}
          {messages.map((message, index) => {
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
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                >
                  <Message {...message} />
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </ScrollArea>
      <ChatInput />
    </div>
  )
}

export default ChatBody
