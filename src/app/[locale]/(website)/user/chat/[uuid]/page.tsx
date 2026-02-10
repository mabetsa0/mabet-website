// import AdminChatBody from "@/components/admin-chat-body"
import ChatBody from "../_components/chat-body"
import { ChatProvider } from "../_contexts/chat-context"
import { getChatInfo } from "../_services/get-chat-info"

export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string; token: string }>
}) {
  const { uuid } = await params

  try {
    const chatData = await getChatInfo({
      uuid,
    })

    return (
      <ChatProvider chatData={chatData}>
        <ChatBody uuid={uuid} />
      </ChatProvider>
    )
  } catch (error: any) {
    console.error(error)
    return (
      <div className="py-2 text-center text-red-500">
        {JSON.stringify(error.message)}
      </div>
    )
  }
}
