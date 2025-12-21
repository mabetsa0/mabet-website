import { ChatInfoResponse } from "../_types/chat-info-response"
import api from "./axios"

export const initChat = async ({
  topicType = "unit",
  topicId,
  partnerId,
}: {
  topicType?: string
  topicId: string
  partnerId: string
}) => {
  const response = await api.get<ChatInfoResponse>(
    `/conversations/partner/${partnerId}?topicType=${topicType}&topicId=${topicId}`
  )

  return response.data.data
}
