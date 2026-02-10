"use client"

import { useEffect, useRef } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { getChat } from "../_services/get-chat"

type UseInfiniteChatParams = {
  uuid: string
}

export const useInfiniteChat = ({ uuid }: UseInfiniteChatParams) => {
  const triggerRef = useRef<HTMLDivElement>(null)
  const isFetchingRef = useRef(false)
  const lastFetchTimeRef = useRef<number>(0)

  const query = useInfiniteQuery({
    queryKey: ["chat-messages", uuid],
    queryFn: async ({ pageParam }) => {
      return await getChat({
        uuid,
        oldestMessageId: pageParam,
        pageSize: 20,
      })
    },
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
    refetchOnReconnect: "always",
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.has_more
        ? lastPage.messages[lastPage.messages.length - 1].id
        : null
    },
  })

  // Update refs when fetching state changes
  useEffect(() => {
    isFetchingRef.current = query.isFetching || query.isFetchingNextPage
    if (!isFetchingRef.current) {
      lastFetchTimeRef.current = Date.now()
    }
  }, [query.isFetching, query.isFetchingNextPage])

  // Set up intersection observer for infinite scroll to top
  useEffect(() => {
    if (
      query.isFetching ||
      query.isFetchingNextPage ||
      !triggerRef.current ||
      !query.hasNextPage ||
      query.isLoading
    )
      return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Prevent rapid successive fetches
            const now = Date.now()
            const timeSinceLastFetch = now - lastFetchTimeRef.current

            // Only fetch if:
            // 1. Not currently fetching
            // 2. At least 500ms has passed since last fetch
            // 3. Has next page
            if (
              !isFetchingRef.current &&
              timeSinceLastFetch >= 500 &&
              query.hasNextPage
            ) {
              isFetchingRef.current = true
              query.fetchNextPage()
            }
          }
        })
      },
      {
        rootMargin: "50px", // Reduced from 100px to be less aggressive
        threshold: 0.1, // Only trigger when at least 10% visible
      }
    )

    observer.observe(triggerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [
    query.isFetching,
    query.isFetchingNextPage,
    query.hasNextPage,
    query.fetchNextPage,
    query.isLoading,
  ])

  // Reverse each page's messages and flatten all pages
  // This ensures messages are displayed in chronological order (oldest first, newest last)
  const allMessages =
    query.data?.pages
      .toReversed()
      .flatMap((page) => [...page.messages].reverse()) || []

  return {
    ...query,
    messages: allMessages,
    triggerRef,
  }
}
