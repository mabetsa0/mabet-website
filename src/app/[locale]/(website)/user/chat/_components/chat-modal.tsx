"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { ActionIcon, Button, Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useMutation } from "@tanstack/react-query"
import { MessageCircle } from "lucide-react"
import { ChatProvider } from "../_contexts/chat-context"
import { initChat } from "../_services/init-chat"
import { SessionStoreProvider } from "../_stores/session-store-provider"
import { UserType } from "../_stores/user-store"
import { UserStoreProvider } from "../_stores/user-store-provider"
import { ChatInfo } from "../_types/chat-info-response"
import ChatBody from "./chat-body"

function ChatModal({
  accessToken,
  topicId,
  partnerId,
}: {
  accessToken: string
  topicId: string
  partnerId: string
}) {
  const t = useTranslations("chat")
  const [opened, { open, close }] = useDisclosure(false)
  const [chatInfo, setChatInfo] = useState<ChatInfo | null>(null)
  const mutation = useMutation({
    mutationFn: initChat,
    onSuccess: (data) => {
      setChatInfo(data)
    },
  })

  const handleInitChat = async () => {
    if (chatInfo) {
      open()
      return
    }
    await mutation.mutateAsync({
      topicId,
      partnerId,
      accessToken,
    })
    open()
  }

  return (
    <>
      <Drawer
        offset={8}
        radius={14}
        opened={opened}
        onClose={close}
        title={chatInfo?.title ?? t("title")}
        classNames={{
          body: "h-[calc(100%-60px)] p-0",
        }}
      >
        <UserStoreProvider
          user={{
            id: chatInfo?.initiator_id?.toString() ?? "",
            name: chatInfo?.initiator_name ?? "",
            type: (chatInfo?.initiator_type as UserType) ?? "user",
          }}
        >
          <SessionStoreProvider accessToken={accessToken}>
            <ChatProvider chatData={chatInfo}>
              <ChatBody uuid={chatInfo?.uuid ?? ""} isModal={true} />
            </ChatProvider>
          </SessionStoreProvider>
        </UserStoreProvider>
      </Drawer>

      <ActionIcon
        size={50}
        loading={mutation.isPending}
        className="fixed right-3 bottom-3 z-50"
        onClick={handleInitChat}
        variant="filled"
        radius="xl"
      >
        <MessageCircle size={20} />
      </ActionIcon>
    </>
  )
}

export default ChatModal
