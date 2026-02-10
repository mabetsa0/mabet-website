import { useQuery } from "@tanstack/react-query"
import api from "../_services/axios"
import { WS_ON_EVENTS } from "../_ws/events"
import { useWsEvent } from "./use-ws-event"

type UnreadMessagesCountResponse = {
  data: {
    count: number
  }
  status: "success"
}

const getUnreadMessagesCount = async (): Promise<number> => {
  const response = await api.get<UnreadMessagesCountResponse>(
    `/messages/unread-count`
  )

  const data = response.data

  return data.data.count
}

export const useUnreadMessagesCount = () => {
  const query = useQuery({
    queryKey: ["unread-messages-count"],
    queryFn: () => {
      return getUnreadMessagesCount()
    },
    staleTime: Infinity,
  })
  useWsEvent(WS_ON_EVENTS.UNREAD_MESSAGES_COUNT_UPDATE, () => {
    query.refetch()
  })
  return query
}
