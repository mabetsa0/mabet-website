"use client"

import { ActionIcon, Indicator } from "@mantine/core"
import { MessageCircle } from "lucide-react"
import { useUnreadMessagesCount } from "@/app/[locale]/(website)/user/chat/_hooks/use-unread-messages-count"
import { Link } from "@/lib/i18n/navigation"

const UserChats = () => {
  const { data: unreadCount = 0 } = useUnreadMessagesCount()

  return (
    <Link href="/user/chat">
      <Indicator
        inline
        label={unreadCount > 99 ? "99+" : unreadCount}
        disabled={unreadCount === 0}
        size={16}
      >
        <ActionIcon
          variant="subtle"
          size="lg"
          aria-label="Chats"
          className="relative"
        >
          <MessageCircle size={18} />
        </ActionIcon>
      </Indicator>
    </Link>
  )
}

export default UserChats
