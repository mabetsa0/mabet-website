import { useRouter } from "next/navigation"
import { ActionIcon, Avatar } from "@mantine/core"
import { ChevronRight, User } from "lucide-react"
import { useChatData } from "../_contexts/chat-context"

const ChatHeader = () => {
  const chatData = useChatData()
  const router = useRouter()
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-1 border-b border-b-gray-100 bg-[#FAFAFA] p-1">
      <div className="flex grow items-center gap-0.5">
        <ActionIcon
          variant="transparent"
          size="lg"
          onClick={() => router.push("/user/chat")}
        >
          <ChevronRight className="ltr:rotate-180" />
        </ActionIcon>
        <Avatar
          src={chatData.image}
          className="border-primary size-3 border-[3px]"
        >
          <User />
        </Avatar>
        <div>
          <div className="mb-0.5">
            <p className="text-h5 flex gap-0.5 font-bold">
              <span>{chatData.title?.trim() || "unknown"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
