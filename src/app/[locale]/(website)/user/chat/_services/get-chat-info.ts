import { ChatInfoResponse } from "../_types/chat-info-response"
import api from "./axios"

export const getChatInfo = async ({
  uuid,
  token,
}: {
  uuid: string
  token: string
}) => {
  const response = await api.get<ChatInfoResponse>(`/conversations/${uuid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data.data
}
