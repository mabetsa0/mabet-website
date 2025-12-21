import { ChatResponse } from "../_types/chat-response"
import api from "./axios"

export const deleteMessage = async ({
  messageId,
  token,
}: {
  messageId: string | number
  token: string
}) => {
  const response = await api.delete<ChatResponse>(`/messages/${messageId}`)
  return response.data.data
}
