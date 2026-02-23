"use client"

import { useTranslations } from "next-intl"
import { Button, Loader, ScrollArea } from "@mantine/core"
import { MessageSquare, RefreshCcw } from "lucide-react"
import { useWsChatsList } from "../_hooks/use-ws-chats-list"
import ChatItem from "./chat-item"
import WhatsAppSupport from "./whatsapp-fixed-chat"

const ChatList = () => {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasMore,
    error,
    refetch,
    triggerRef,
  } = useWsChatsList()
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
            <Button
              onClick={refetch}
              leftSection={<RefreshCcw className="size-1" />}
            >
              {t("reload")}
            </Button>
          </div>
        ) : data && data.length > 0 ? (
          <div key="data" className="divide-y divide-gray-100">
            <WhatsAppSupport />

            {data.map((conversation) => (
              <div key={conversation.uuid}>
                <ChatItem key={conversation.uuid} conversation={conversation} />
              </div>
            ))}
            {/* Trigger element for infinite scroll */}
            {hasMore && <div ref={triggerRef} className="h-4" />}
            {/* Loading indicator for next page */}
            {isFetchingNextPage && (
              <div className="flex w-full items-center justify-center py-4">
                <Loader size="sm" />
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-[calc(100vh-65px)] flex-col items-center justify-center gap-1 text-center">
            <MessageSquare strokeWidth={1.2} className="size-4 text-gray-700" />
            <div className="">
              <p className="text-lg font-medium text-black">{t("no-chats")}</p>
              <p className="text-sm text-gray-500">
                {t("no-chats-description")}
              </p>
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default ChatList
