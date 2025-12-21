import { useQuery } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import api from "../_services/axios"
import { WS_ON_EVENTS } from "../_ws/events"
import { useWsEvent } from "./use-ws-event"

type UnreadCountResponse = {
  data: {
    count: number
  }
  status: "success"
}

const getUnreadChatsCount = async (): Promise<number> => {
  const response = await api.get<UnreadCountResponse>(
    `/conversations/unread-count`
  )

  const data = response.data

  return data.data.count
}

export const useUnreadChatsCount = () => {
  useWsEvent(WS_ON_EVENTS.UNREAD_CONVERSATIONS_COUNT_UPDATE, () => {
    queryClient.invalidateQueries({
      queryKey: ["unread-chats-count"],
    })
  })

  return useQuery({
    queryKey: ["unread-chats-count"],
    queryFn: () => {
      return getUnreadChatsCount()
    },
    staleTime: Infinity,
  })
}
