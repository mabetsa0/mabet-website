import { ChatListResponse } from "../_types/chats-response"
import api from "./axios"

export const getChatList = async ({
  ...params
}: {
  params: Record<string, any>
}) => {
  const response = await api.get<ChatListResponse>(`/conversations`, {
    ...params,
  })
  return response.data
}
