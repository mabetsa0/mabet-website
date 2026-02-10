"use client"

import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, Indicator } from "@mantine/core"
import { Badge } from "@mantine/core"
import dayjs from "dayjs"
import "dayjs/locale/ar"
import "dayjs/locale/en"
import relativeTime from "dayjs/plugin/relativeTime"
import { Check, CheckCheck, User } from "lucide-react"
import { cn } from "@/lib/cn"
import { useTypingIndicator } from "../_hooks/use-typing-indicator"
import { useUserStore } from "../_stores/user-store-provider"
import { Conversation } from "../_types/chats-response"

dayjs.extend(relativeTime)

type MessageDeliveryStatus = "none" | "sent" | "read"

const MessageStatusIcon = ({ status }: { status: MessageDeliveryStatus }) => {
  if (status === "sent") {
    return <Check className="size-1 text-gray-400" />
  }
  if (status === "read") {
    return <CheckCheck className="size-1 text-[#0e9fff]" />
  }
  return null
}

const ChatItem = ({ conversation }: { conversation: Conversation }) => {
  const pathName = usePathname()
  const locale = useLocale()
  dayjs.locale(locale)
  const t = useTranslations("chat")
  const { isTyping } = useTypingIndicator(conversation.uuid)
  const user = useUserStore((s) => s.user)

  // Calculate delivery status for last message
  let deliveryStatus: MessageDeliveryStatus = "none"
  const lastMessage = conversation.last_message

  if (lastMessage && user) {
    const isOwnMessage =
      lastMessage.sender_id === Number(user.id) &&
      lastMessage.sender_type === user.type
    const isAdmin = lastMessage.sender_type === "admin"

    // WhatsApp-like ticks only for the current user's non-admin messages
    if (isOwnMessage && !isAdmin) {
      const currentUserIdNum = Number(user.id)
      const currentUserType = user.type

      const othersReadPositions =
        conversation.read_positions?.filter(
          (pos) =>
            !(
              pos.user_id === currentUserIdNum &&
              pos.user_type === currentUserType
            )
        ) ?? []

      const messageTimestamp = lastMessage.created_at
        ? new Date(lastMessage.created_at).getTime()
        : Number.NaN

      const hasBeenReadBySomeoneElse = othersReadPositions.some((pos) => {
        const readTs = new Date(pos.timestamp).getTime()
        if (Number.isNaN(readTs) || Number.isNaN(messageTimestamp)) return false
        return readTs >= messageTimestamp
      })

      // Two blue ticks if at least one other participant has a read timestamp
      // that is at or after this message; otherwise single gray tick.
      deliveryStatus = hasBeenReadBySomeoneElse ? "read" : "sent"
    }
  }

  return (
    <div className="relative">
      <Link
        prefetch={false}
        scroll={false}
        href={`/user/chat/${conversation.uuid}`}
      >
        <div
          className={cn(
            "relative flex gap-0.5 bg-white py-0.5 duration-100 hover:bg-[#FAFAFA] sm:px-1",
            pathName.includes(conversation.uuid) && "bg-[#FAFAFA]"
          )}
        >
          <Indicator
            inline
            position="top-start"
            size={12}
            color="green"
            offset={10}
            zIndex={1}
            disabled={conversation.online_participants.length == 0}
          >
            <Avatar
              src={conversation.image}
              className="relative aspect-square size-4"
            >
              <User />
            </Avatar>
          </Indicator>
          <div className="grow leading-normal">
            <div className="mb-0.5">
              <p className="line-clamp-1 w-full font-bold">
                {conversation.topic_name || "unknown"}
              </p>
              <p className="line-clamp-1 text-xs font-semibold">
                <span>
                  {t("host")}: {conversation.title?.trim() || "unknown"}{" "}
                  {isTyping && (
                    <span className="inline-block px-px text-[11px] text-gray-500">
                      {t("is-typing")}
                    </span>
                  )}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-1">
              {deliveryStatus !== "none" && (
                <MessageStatusIcon status={deliveryStatus} />
              )}
              <span
                className={cn(
                  "block truncate text-sm text-[#767676]",
                  conversation.unread_messages_count > 0 && "font-bold text-black"
                )}
              >
                {conversation.last_message?.content}
              </span>

            </div>
          </div>
          <div className="ms-auto flex shrink-0 flex-col items-end justify-between">
            <span className="block text-[10px] leading-loose text-gray-700">
              {(() => {
                const date = dayjs(
                  conversation.last_message?.created_at ||
                  conversation.created_at
                )
                return date.isSame(dayjs(), "day")
                  ? date.format("hh:mm A")
                  : date.format("DD MMM YYYY")
              })()}
            </span>
            {conversation.unread_messages_count ? (
              <div className="mb-[2px]">
                <Badge size="md" circle>
                  {conversation.unread_messages_count}
                </Badge>
              </div>
            ) : null}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ChatItem
