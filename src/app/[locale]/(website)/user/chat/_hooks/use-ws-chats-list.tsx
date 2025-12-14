"use client"

import { useEffect, useRef, useState } from "react"
import { useSendEvent } from "../_hooks/use-send-event"
import { useWsEvent } from "../_hooks/use-ws-event"
import { useUserStore } from "../_stores/user-store-provider"
import { Conversation } from "../_types/chats-response"
import { WS_ON_EVENTS, WS_SEND_EVENTS } from "../_ws/events"
import { WsEventHandler } from "../_ws/events-handler"

export const useWsChatsList = (accessToken: string) => {
  const setUser = useUserStore((state) => state.setUser)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { sendEvent } = useSendEvent()
  const lastAuthenticateEventIdRef = useRef<string | null>(null)
  const lastGetPageEventIdRef = useRef<string | null>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const conversationsPageSize = 10

  const handleAuthenticated: WsEventHandler<
    typeof WS_ON_EVENTS.AUTHENTICATED
  > = (data) => {
    setIsLoading(false)
    setError(null)
    setConversations(data.first_conversations_page)
    setHasMore(data.first_conversations_page.length >= conversationsPageSize)
    setUser({
      id: data.user_id.toString(),
      name: data.user_name,
      type: data.user_type as "user" | "guest",
    })
  }
  // Register the event listener
  useWsEvent(WS_ON_EVENTS.AUTHENTICATED, handleAuthenticated)

  const handleConversationsPage: WsEventHandler<
    typeof WS_ON_EVENTS.CONVERSATIONS_PAGE
  > = (data, id) => {
    // Only handle responses related to the latest GET_CONVERSATION_PAGE event we sent
    if (id !== lastGetPageEventIdRef.current) return

    setIsFetchingNextPage(false)
    if (data.conversations_page.length > 0) {
      setConversations((prev) => [...prev, ...data.conversations_page])
      // If we got fewer conversations than requested, there are no more pages
      setHasMore(
        data.has_more !== undefined
          ? data.has_more
          : data.conversations_page.length >= conversationsPageSize
      )
    } else {
      setHasMore(false)
    }
  }

  useWsEvent(WS_ON_EVENTS.CONVERSATIONS_PAGE, handleConversationsPage)

  const handleError: WsEventHandler<typeof WS_ON_EVENTS.ERROR> = (data, id) => {
    // Handle errors related to AUTHENTICATE event
    if (id === lastAuthenticateEventIdRef.current) {
      setIsLoading(false)
      setError(data.message)
      setConversations([])
      return
    }

    // Handle errors related to GET_CONVERSATION_PAGE event
    if (id === lastGetPageEventIdRef.current) {
      setIsFetchingNextPage(false)
      setError(data.message)
    }
  }

  useWsEvent(WS_ON_EVENTS.ERROR, handleError)

  // Send authenticate event
  useEffect(() => {
    setIsLoading(true)
    setHasMore(true)
    setConversations([])
    lastAuthenticateEventIdRef.current = sendEvent(
      WS_SEND_EVENTS.AUTHENTICATE,
      {
        token: accessToken,
        first_conversations_page_size: conversationsPageSize,
      }
    )!
  }, [accessToken])

  // Fetch next page function
  const fetchNextPage = () => {
    if (isFetchingNextPage || !hasMore || conversations.length === 0) {
      return
    }

    const oldestConversation = conversations[conversations.length - 1]
    if (!oldestConversation) return

    setIsFetchingNextPage(true)
    lastGetPageEventIdRef.current = sendEvent(
      WS_SEND_EVENTS.GET_CONVERSATION_PAGE,
      {
        oldest_conversation_uuid: oldestConversation.uuid,
        conversations_page_size: conversationsPageSize,
      }
    )
  }

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    if (isFetchingNextPage || !triggerRef.current || !hasMore || isLoading) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchNextPage()
          }
        })
      },
      {
        rootMargin: "100px", // Start loading when trigger is 100px away from viewport
      }
    )

    observer.observe(triggerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [
    isFetchingNextPage,
    hasMore,
    isLoading,
    conversations.length,
    fetchNextPage,
  ])

  //   refetch the chats list
  const refetch = () => {
    setIsLoading(true)
    setHasMore(true)
    setConversations([])
    lastAuthenticateEventIdRef.current = sendEvent(
      WS_SEND_EVENTS.AUTHENTICATE,
      {
        token: accessToken,
        first_conversations_page_size: conversationsPageSize,
      }
    )!
  }

  return {
    data: conversations,
    isLoading,
    isFetchingNextPage,
    hasMore,
    error,
    refetch,
    triggerRef,
  }
}
