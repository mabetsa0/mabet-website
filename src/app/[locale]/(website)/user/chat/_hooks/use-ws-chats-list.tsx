"use client"

import { useEffect, useRef, useState } from "react"
import { useSendEvent } from "../_hooks/use-send-event"
import { useWsEvent } from "../_hooks/use-ws-event"
import { Conversation } from "../_types/chats-response"
import { WS_ON_EVENTS, WS_SEND_EVENTS } from "../_ws/events"
import { WsEventHandler } from "../_ws/events-handler"

export const useWsChatsList = (accessToken: string) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { sendEvent } = useSendEvent()
  const lastGetPageEventIdRef = useRef<string | null>(null)
  const isInitialLoadRef = useRef<boolean>(true)
  const triggerRef = useRef<HTMLDivElement>(null)
  const conversationsPageSize = 10

  const handleConversationsPage: WsEventHandler<
    typeof WS_ON_EVENTS.CONVERSATIONS_PAGE
  > = (data, id) => {
    // Only handle responses related to the latest GET_CONVERSATION_PAGE event we sent
    if (id !== lastGetPageEventIdRef.current) return

    const isInitialLoad = isInitialLoadRef.current
    if (isInitialLoad) {
      setIsLoading(false)
      isInitialLoadRef.current = false
    } else {
      setIsFetchingNextPage(false)
    }

    setError(null)

    if (data.conversations_page.length > 0) {
      if (isInitialLoad) {
        setConversations(data.conversations_page)
      } else {
        setConversations((prev) => [...prev, ...data.conversations_page])
      }
      // If we got fewer conversations than requested, there are no more pages
      setHasMore(
        data.has_more !== undefined
          ? data.has_more
          : data.conversations_page.length >= conversationsPageSize
      )
    } else {
      setHasMore(false)
      if (isInitialLoad) {
        setConversations([])
      }
    }
  }

  useWsEvent(WS_ON_EVENTS.CONVERSATIONS_PAGE, handleConversationsPage)

  const handleError: WsEventHandler<typeof WS_ON_EVENTS.ERROR> = (data, id) => {
    // Handle errors related to GET_CONVERSATION_PAGE event
    if (id === lastGetPageEventIdRef.current) {
      if (isInitialLoadRef.current) {
        setIsLoading(false)
        isInitialLoadRef.current = false
      } else {
        setIsFetchingNextPage(false)
      }
      setError(data.message)
      if (isInitialLoadRef.current) {
        setConversations([])
      }
    }
  }

  useWsEvent(WS_ON_EVENTS.ERROR, handleError)

  // Initial load - send GET_CONVERSATION_PAGE with null to start from beginning
  useEffect(() => {
    setIsLoading(true)
    setHasMore(true)
    setConversations([])
    isInitialLoadRef.current = true
    lastGetPageEventIdRef.current = sendEvent(
      WS_SEND_EVENTS.GET_CONVERSATION_PAGE,
      {
        oldest_conversation_uuid: null,
        conversations_page_size: conversationsPageSize,
      }
    )!
  }, [accessToken, sendEvent])

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
    isInitialLoadRef.current = true
    lastGetPageEventIdRef.current = sendEvent(
      WS_SEND_EVENTS.GET_CONVERSATION_PAGE,
      {
        oldest_conversation_uuid: null,
        conversations_page_size: conversationsPageSize,
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
