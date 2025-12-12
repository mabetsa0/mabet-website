"use client"

import { useTranslations } from "next-intl"
import { Button, Loader, ScrollArea } from "@mantine/core"
import { MessageSquare, RefreshCcw } from "lucide-react"
import { useWsChatsList } from "../_hooks/use-ws-chats-list"
import { useSessionStore } from "../_stores/session-store-provider"
import ChatItem from "./chat-item"

const ChatList = () => {
  const accessToken = useSessionStore((state) => state.accessToken)
  const { data, isLoading, error, refetch } = useWsChatsList(accessToken)
  const t = useTranslations("chat")
  return (
    <div className="h-[calc(100vh-73px)]">
      <p className="text-h3 sm:text-h2 border-b border-b-gray-100 py-1.5 font-bold">
        {t("title")}
      </p>
      <ScrollArea className="h-[calc(100vh-165px)]">
        {isLoading ? (
          <div
            key="loader"
            className="flex h-[calc(100vh-165px)] w-full items-center justify-center"
          >
            <Loader />
          </div>
        ) : error ? (
          <div
            key="error"
            className="flex h-[calc(100vh-165px)] flex-col items-center justify-center gap-2 text-red-500"
          >
            {error}
            <Button onClick={refetch}>
              <RefreshCcw className="size-4" />
              <span>اعادة التحميل</span>
            </Button>
          </div>
        ) : data && data.length > 0 ? (
          <div key="data" className="divide-y divide-gray-100">
            {data.map((conversation) => (
              <div key={conversation.uuid}>
                <ChatItem key={conversation.uuid} conversation={conversation} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-[calc(100vh-65px)] flex-col items-center justify-center gap-4 text-center">
            <MessageSquare className="text-muted-foreground size-12" />
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg font-medium">
                لا توجد محادثات
              </p>
              <p className="text-muted-foreground text-sm">
                لم يتم العثور على أي محادثات حتى الآن
              </p>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default ChatList
