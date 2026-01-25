import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { ActionIcon, Avatar, Indicator } from "@mantine/core"
import { ChevronRight, User } from "lucide-react"
import { useChatData } from "../_contexts/chat-context"
import { useTypingIndicator } from "../_hooks/use-typing-indicator"
import { useChatsListStore } from "../_stores/chats-list-store-provider"

const ChatHeader = () => {
  const chatData = useChatData()

  const chatList = useChatsListStore((s) => s.conversations)

  const online_participants =
    chatList.find((c) => c.uuid === chatData.uuid)?.online_participants || []

  const router = useRouter()
  const { isTyping } = useTypingIndicator(chatData.uuid)
  const t = useTranslations("chat")
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-1 border-b border-b-gray-100 bg-[#FAFAFA] p-1">
      <div className="flex grow items-start gap-0.5">
        <ActionIcon
          variant="transparent"
          size="lg"
          onClick={() => router.push("/user/chat")}
        >
          <ChevronRight className="ltr:rotate-180" />
        </ActionIcon>
        <Indicator
          inline
          position="top-start"
          size={12}
          color="green"
          offset={5}
          zIndex={1}
          disabled={online_participants.length == 0}
        >
          <Avatar src={chatData.image} className="size-3">
            <User />
          </Avatar>
        </Indicator>
        <div className="flex flex-col">
          <div className="mb-0.5">
            <p className="text-h5 flex gap-0.5 font-bold">
              <span>{chatData.title?.trim() || "unknown"}</span>
            </p>
          </div>
          {isTyping && (
            <span className="text-[11px] text-gray-500">{t("is-typing")}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
