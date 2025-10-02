import { getServerSession } from "@/lib/get-server-session"
import { getLocaleFromUrl } from "@/utils/get-locale"
import { getSession } from "@/utils/get-session"
import axios from "axios"
import { getLocale } from "next-intl/server"

import { useSession } from "@/lib/session-store"
import { redirect } from "next/navigation"

const baseURL =
  process.env.NEXT_PUBLIC_TEST == "true"
    ? "https://mabet.dev/companies/api/v1"
    : "https://app.mabet.com.sa/companies/api/v1"

const integrationApi = axios.create({
  baseURL: baseURL,
})

// Add a request interceptor to include the authentication token
integrationApi.interceptors.request.use(
  async (config) => {
    let session: {
      access_token: string
    } | null

    if (typeof window === "undefined") {
      session = await getServerSession()
      const locale = await getLocale()
      config.headers["Accept-Language"] = locale
    } else {
      // Client-side
      session = getSession()
      config.headers["Accept-Language"] = getLocaleFromUrl()
    }
    if (session?.access_token) {
      config.headers["Authorization"] = `Bearer ${session.access_token}`
    }

    // turn URLSearchParams to object , and handle arrays
    if (config.params && config.params instanceof URLSearchParams) {
      const paramsObject: Record<string, unknown> = {}
      for (const [key, value] of config.params.entries()) {
        if (key.endsWith("[]")) {
          //  for arrays
          paramsObject[key.slice(0, -2)] = value.split(",").filter(Boolean)
        } else {
          // Otherwise, just assign the value
          paramsObject[key] = value
        }
      }

      config.params = paramsObject
    }

    config.headers["User-Agent"] = "web"

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

integrationApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log("🚀 ~ error:", error)
    if (error.response?.status === 401) {
      if (typeof window === "undefined") {
        const { cookies } = await import("next/headers")

        const cookieStore = await cookies()
        cookieStore.delete("session")
        redirect("/")
      } else {
        axios.post("/api/logout")
        useSession.getState().updateSession(null)

        const locale = getLocaleFromUrl() as "en" | "ar"
        window.location.href = `/${locale}`
      }
    }

    // Prepare fallback message with status code
    const statusCode = error?.response?.status ?? "Unknown"
    const fallbackMessage = `Request failed with status code ${statusCode}`

    // Set custom message
    error.message =
      error?.response?.data?.errors?.[0] ??
      error?.response?.data?.message ??
      fallbackMessage

    return Promise.reject(error)
  }
)

export default integrationApi
