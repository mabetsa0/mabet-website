import { useQuery } from "@tanstack/react-query"
import api from "../_services/axios"

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
  return useQuery({
    queryKey: ["unread-chats-count"],
    queryFn: () => {
      return getUnreadChatsCount()
    },
    staleTime: Infinity,
  })
}
