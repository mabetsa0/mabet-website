"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button, Drawer } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useMutation } from "@tanstack/react-query"
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
        title={t("title")}
        classNames={{
          body: "h-[calc(100%-60px)]",
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

      <Button
        loading={mutation.isPending}
        className="fixed right-4 bottom-4 z-50"
        onClick={handleInitChat}
      >
        Open Drawer
      </Button>
    </>
  )
}

export default ChatModal
