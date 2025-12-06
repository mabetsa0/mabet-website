import { getChatAccessToken } from "@/app/[locale]/(website)/user/chat/_services/get-access-token"
import { getCachedTokenFromCookie } from "./get-cached-access-token"

export const getAccessToken = async (token: string) => {
  const accessToken = await getCachedTokenFromCookie()
  if (accessToken) {
    return {
      cached: true,
      token: accessToken,
    }
  }

  const newAccessToken = await getChatAccessToken(token)
  return {
    cached: false,
    token: newAccessToken,
  }
}
