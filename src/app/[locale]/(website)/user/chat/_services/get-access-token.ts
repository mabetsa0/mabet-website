import { mainApi } from "./axios"

export const getChatAccessToken = async (token: string) => {
  const response = await mainApi.post<{ token: string; type: string }>(
    `/chat-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${decodeURIComponent(token)}`,
      },
    }
  )

  return response.data.token
}
