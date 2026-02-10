import { getLocale } from "next-intl/server"
import { redirect } from "next/navigation"
import axios from "axios"
import { SESSION_COOKIE } from "@/config"
import { getServerSession } from "@/services/get-server-session"
import { useSession } from "@/stores/session-store"
import { getClientSession } from "@/utils/get-client-session"
import { getLocaleFromUrl } from "@/utils/get-locale"

const baseURL =
  process.env.NEXT_PUBLIC_TEST == "true"
    ? "https://mabet.dev/api"
    : "https://app.mabet.com.sa/api"
// const baseURL = "https://mabet.dev/api/v2";

const Mabet = axios.create({
  baseURL: baseURL + "/v2",
})

const apiV2_1 = axios.create({
  baseURL: baseURL + "/v2.1",
})

const BlogApi = axios.create({
  baseURL: "https://app.mabet.com.sa/api/v2/blog",
})

export const Seo = axios.create({
  baseURL: baseURL + "/v2/seo",
})
Seo.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") {
      const locale = await getLocale()
      config.headers["Accept-Language"] = locale
    } else {
      // Client-side
      config.headers["Accept-Language"] = getLocaleFromUrl()
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

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)
// Add a request interceptor to include the authentication token
Mabet.interceptors.request.use(
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
      session = getClientSession()
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
apiV2_1.interceptors.request.use(
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
BlogApi.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") {
      const locale = await getLocale()
      config.headers["Accept-Language"] = locale
    } else {
      // Client-side
      config.headers["Accept-Language"] = getLocaleFromUrl()
    }

    config.headers["User-Agent"] = "web"

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

Mabet.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log("🚀 ~ error:", error)
    if (error.response?.status === 401) {
      if (typeof window === "undefined") {
        const { cookies } = await import("next/headers")

        const cookieStore = await cookies()
        cookieStore.delete(SESSION_COOKIE)
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
apiV2_1.interceptors.response.use(
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

export default Mabet
export { apiV2_1 }

export { BlogApi }