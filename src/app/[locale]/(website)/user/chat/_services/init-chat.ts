import { ChatInfoResponse } from "../_types/chat-info-response"
import api from "./axios"

export const initChat = async ({
  topicType = "unit",
  topicId,
  accessToken,
  partnerId,
}: {
  topicType?: string
  topicId: string
  accessToken: string
  partnerId: string
}) => {
  const response = await api.get<ChatInfoResponse>(
    `/conversations/partner/${partnerId}?topicType=${topicType}&topicId=${topicId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  return response.data.data
}
