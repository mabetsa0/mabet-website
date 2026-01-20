"use client"

import React, { useRef } from "react"
import { useTranslations } from "next-intl"
import { ActionIcon, Textarea } from "@mantine/core"
import { Send } from "lucide-react"
import { useChatData } from "../_contexts/chat-context"
import { useSendEvent } from "../_hooks/use-send-event"
import { useSendMessage } from "../_hooks/use-send-message"
import { useChatDraft } from "../_hooks/use-chat-draft"
import { WS_SEND_EVENTS } from "../_ws/events"

const ChatInput = () => {
  const textAreRef = useRef<HTMLTextAreaElement>(null)
  const lastTypingStartSentAtRef = useRef<number>(0)
  const chatData = useChatData()
  const uuid = chatData.uuid
  const { sendMessage, isLoading, error } = useSendMessage()
  const { sendEvent } = useSendEvent()
  const { draft, setDraft, clearDraft } = useChatDraft(uuid)
  const t = useTranslations("chat")

  // dynamic resizing text area
  const textRowCount = draft.split("\n").length
  const rows = textRowCount <= 3 ? textRowCount : 3

  const handleInputMessageChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    const value = e.target.value
    setDraft(value)

    // Send a throttled typing_start event so others see the typing indicator
    const now = Date.now()
    if (
      uuid &&
      value.trim().length > 0 &&
      now - lastTypingStartSentAtRef.current > 3000
    ) {
      lastTypingStartSentAtRef.current = now
      // Backend expects a string payload; send the conversation UUID
      sendEvent(WS_SEND_EVENTS.TYPING_START, uuid)
    }
  }

  const handleSendMessage = async () => {
    if (!draft.trim() || isLoading) return

    sendMessage({
      conversation_uuid: uuid,
      content: draft,
    })

    // Clear input after sending
    clearDraft()
    // Reset textarea height
    if (textAreRef.current) {
      textAreRef.current.style.height = "auto"
    }
  }

  // handling sending message using enter key
  const handleEnterKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const keyDown = e.key
    if (keyDown === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex items-center gap-1 bg-white px-1 py-1">
      <div className="relative w-full">
        <Textarea
          variant="filled"
          ref={textAreRef}
          rows={rows}
          rightSectionWidth={80}
          rightSection={
            <ActionIcon
              size={"xl"}
              radius={"xl"}
              onClick={handleSendMessage}
              loading={isLoading}
              disabled={!draft.trim()}
            >
              <Send className="rtl:-rotate-90" />
            </ActionIcon>
          }
          placeholder={t("input.placeholder")}
          value={draft}
          onChange={handleInputMessageChange}
          onKeyDown={handleEnterKeyDown}
          size="lg"
          classNames={{
            input: "py-1 max-h-[90px]",
          }}
          className="resize-none rounded-lg"
        />
      </div>

      {error && (
        <div className="absolute -top-2 left-1 text-sm text-red-500">
          {error}
        </div>
      )}
    </div>
  )
}

export default ChatInput
