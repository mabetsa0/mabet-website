import { ChatResponse } from "../_types/chat-response"
import api from "./axios"

export const getChat = async ({
  uuid,
  oldestMessageId,
  pageSize = 20,
}: {
  uuid: string
  oldestMessageId?: string | number
  pageSize?: number
}) => {
  const response = await api.get<ChatResponse>(
    `/conversations/${uuid}/messages`,
    {
      params: {
        oldestMessageId,
        pageSize,
      },
    }
  )
  return response.data.data
}
