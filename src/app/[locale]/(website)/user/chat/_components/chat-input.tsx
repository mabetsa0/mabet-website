"use client"

import React, { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { ActionIcon, Button } from "@mantine/core"
import { Textarea } from "@mantine/core"
import { Send } from "lucide-react"
import { useSendMessage } from "../_hooks/use-send-message"

const ChatInput = () => {
  const textAreRef = useRef<HTMLTextAreaElement>(null)
  const { uuid } = useParams<{ uuid: string }>()!
  const { sendMessage, isLoading, error } = useSendMessage()
  const t = useTranslations("chat")

  // dynamic resizing text area
  const textRowCount = textAreRef.current
    ? textAreRef.current.value.split("\n").length
    : 1
  const rows = textRowCount <= 3 ? textRowCount : 3

  const [inputMessage, setInputMessage] = useState("")
  const handleInputMessageChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = (e) => {
    setInputMessage(e.target.value)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    sendMessage({
      conversation_uuid: uuid,
      content: inputMessage,
    })

    // Clear input after sending
    setInputMessage("")
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
              disabled={isLoading || !inputMessage.trim()}
            >
              <Send className="rtl:-rotate-90" />
            </ActionIcon>
          }
          placeholder={t("input.placeholder")}
          value={inputMessage}
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
