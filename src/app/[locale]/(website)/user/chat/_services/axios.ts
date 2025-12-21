import axios from "axios"
import { getChatSessionStore } from "../_stores/session-store-provider"

export const chatBaseURL =
  process.env.NEXT_PUBLIC_TEST == "true"
    ? "https://chat-experimental.mabet-app.com/api/v1"
    : // "https://chat-test.mabet-app.com/api/v1"
      "https://chat.mabet-app.com/api/v1"
export const mainBaseURL =
  process.env.NEXT_PUBLIC_TEST == "true"
    ? "https://mabet.dev"
    : "https://app.mabet.com.sa"

const api = axios.create({
  baseURL: chatBaseURL,
})

const mainApi = axios.create({
  baseURL: mainBaseURL,
})

api.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    const accessToken =
      await import("@/app/[locale]/(website)/user/chat/_lib/get-cached-access-token").then(
        (module) => module.getCachedTokenFromCookie()
      )
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  } else {
    const session = getChatSessionStore()
    if (session?.getState().accessToken) {
      config.headers.Authorization = `Bearer ${session.getState().accessToken}`
    }
  }

  return config
})

export { mainApi }
export default api
