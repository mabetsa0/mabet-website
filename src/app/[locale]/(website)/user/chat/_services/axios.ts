import axios from "axios"
import { getChatSessionStore } from "../_stores/session-store-provider"

export const chatBaseURL =
  process.env.NEXT_PUBLIC_TEST == "true"
    ? "https://chat-experimental.mabet-app.com/api/v1"
    : "https://chat.mabet-app.com/api/v1"
export const mainBaseURL =
  process.env.NEXT_PUBLIC_TEST == "true"
    ? "https://mabet.dev/chat/api/v2"
    : "https://app.mabet.com.sa/chat/api/v2"

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


// Track if we're currently refreshing to avoid multiple simultaneous refresh attempts
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (error?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, queue this request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      // Only attempt refresh on client side
      if (typeof window !== "undefined") {
        try {
          const session = getChatSessionStore()
          const mainSession = await import("@/utils/get-client-session").then(
            (module) => module.getClientSession()
          )

          // If no main session, clear chat token and reject
          if (!mainSession?.access_token) {
            if (session) {
              session.setState({ accessToken: null })
            }
            isRefreshing = false
            processQueue(new Error("No main session available"), null)
            return Promise.reject(error)
          }

          // Attempt to refresh the chat access token
          const refreshResponse = await fetch("/api/chat/auth", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${mainSession.access_token}`,
            },
          })

          if (!refreshResponse.ok) {
            // Refresh failed, clear token and reject
            if (session) {
              session.setState({ accessToken: null })
            }
            isRefreshing = false
            processQueue(new Error("Failed to refresh token"), null)
            return Promise.reject(error)
          }

          const { token: newAccessToken } = await refreshResponse.json()

          // Update the session store with new token
          if (session && newAccessToken) {
            session.setState({ accessToken: newAccessToken })
          }

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

          // Process queued requests
          isRefreshing = false
          processQueue(null, newAccessToken)

          // Retry the original request
          return api(originalRequest)
        } catch (refreshError) {
          // Refresh attempt failed
          const session = getChatSessionStore()
          if (session) {
            session.setState({ accessToken: null })
          }
          isRefreshing = false
          processQueue(refreshError, null)
          return Promise.reject(refreshError)
        }
      } else {
        // Server-side: just clear token and reject
        isRefreshing = false
        return Promise.reject(error)
      }
    }

    // For non-401 errors or if retry already attempted, reject normally
    return Promise.reject(error)
  }
)
export { mainApi }
export default api
