import { ChatInfoResponse } from "../_types/chat-info-response"
import api from "./axios"

export const getChatInfo = async ({ uuid }: { uuid: string }) => {
  const response = await api.get<ChatInfoResponse>(`/conversations/${uuid}`)

  return response.data.data
}
