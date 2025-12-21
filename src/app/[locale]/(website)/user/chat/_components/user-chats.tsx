"use client"

import { ActionIcon, Badge } from "@mantine/core"
import { MessageCircle } from "lucide-react"
import { useUnreadChatsCount } from "@/app/[locale]/(website)/user/chat/_hooks/use-unread-chats-count"
import { Link } from "@/lib/i18n/navigation"

const UserChats = () => {
  const { data: unreadCount = 0 } = useUnreadChatsCount()

  return (
    <Link href="/user/chat">
      <ActionIcon
        variant="subtle"
        size="lg"
        aria-label="Chats"
        className="relative"
      >
        <MessageCircle size={22} />
        {unreadCount > 0 && (
          <Badge
            size="sm"
            circle
            className="absolute -top-1 -right-1 min-w-[20px] px-1"
            color="red"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </ActionIcon>
    </Link>
  )
}

export default UserChats
