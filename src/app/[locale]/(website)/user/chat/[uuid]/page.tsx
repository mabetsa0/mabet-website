import { Avatar } from "@mantine/core"
import { User } from "lucide-react"
// import AdminChatBody from "@/components/admin-chat-body"
import BackButton from "../_components/back-button"
import ChatBody from "../_components/chat-body"
import { ChatProvider } from "../_contexts/chat-context"
import { getCachedTokenFromCookie } from "../_lib/get-cached-access-token"
import { getChatInfo } from "../_services/get-chat-info"

export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string; token: string }>
}) {
  const { uuid } = await params

  const accessToken = await getCachedTokenFromCookie()

  if (!accessToken) {
    throw new Error("Access token not found")
  }
  try {
    const chatData = await getChatInfo({
      uuid,
      token: accessToken,
    })

    return (
      <ChatProvider chatData={chatData}>
        <ChatBody uuid={uuid} />
      </ChatProvider>
    )
  } catch (error) {
    console.error(error)
    return <div>{JSON.stringify(error)}</div>
  }
}
