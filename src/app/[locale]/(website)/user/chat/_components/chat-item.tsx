"use client"

import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar } from "@mantine/core"
import { Badge } from "@mantine/core"
import dayjs from "dayjs"
import "dayjs/locale/ar"
import "dayjs/locale/en"
import relativeTime from "dayjs/plugin/relativeTime"
import { User } from "lucide-react"
import { cn } from "@/lib/cn"
import { Conversation } from "../_types/chats-response"

dayjs.extend(relativeTime)

const ChatItem = ({ conversation }: { conversation: Conversation }) => {
  const pathName = usePathname()
  const locale = useLocale()
  dayjs.locale(locale)
  const t = useTranslations("chat")

  return (
    <div className="relative">
      <Link
        prefetch={false}
        scroll={false}
        href={`/user/chat/${conversation.uuid}`}
      >
        <div
          className={cn(
            "relative flex gap-0.5 bg-white px-1 py-0.5 duration-100 hover:bg-[#FAFAFA]",
            pathName.includes(conversation.uuid) && "bg-[#FAFAFA]"
          )}
        >
          <div className="flex gap-0.5">
            <div className="relative">
              <Avatar
                src={conversation.image}
                className="relative aspect-square size-4"
              >
                <User />
              </Avatar>
              {conversation.online_participants.length > 0 ? (
                <span className="absolute bottom-0 left-[4px] block h-1 w-1 rounded-full bg-green-500"></span>
              ) : null}
            </div>
          </div>

          <div className="grow leading-normal">
            <div className="mb-0.5">
              <p className="w-full max-w-[180px] truncate font-bold">
                {conversation.topic_name || "unknown"}
              </p>
              <p className="text-xs font-semibold">
                <span>
                  {t("host")}: {conversation.title?.trim() || "unknown"}
                </span>
              </p>
            </div>

            <span
              className={cn(
                "max-[200px] block truncate text-sm text-gray-500",
                conversation.unread_messages_count > 0 && "font-bold text-black"
              )}
            >
              {conversation.last_message?.content}
            </span>
          </div>
          <div className="ms-auto flex flex-col items-end justify-between">
            <span className="block text-[10px] leading-loose text-gray-500">
              {(() => {
                const date = dayjs(
                  conversation.last_message?.created_at ||
                    conversation.created_at
                )
                return date.isSame(dayjs(), "day")
                  ? date.fromNow()
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
