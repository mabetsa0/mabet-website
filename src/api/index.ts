import { BAYUT_KEY } from "@/config"
import { getServerSession } from "@/lib/get-server-session"
import { useSession } from "@/lib/session-store"
import { getLocaleFromUrl } from "@/utils/get-locale"
import { getSession } from "@/utils/get-session"
import axios from "axios"
import { getLocale } from "next-intl/server"
import { redirect } from "next/navigation"

const baseURL =
  process.env.NEXT_PUBLIC_TEST === "test"
    ? "https://mabet.dev/api/v2"
    : "https://app.mabet.com.sa/api/v2"
// const baseURL = "https://mabet.dev/api/v2"

const Mabeet = axios.create({
  baseURL: baseURL,
})

const BlogApi = axios.create({
  baseURL: "https://app.mabet.com.sa/api/v2/blog",
})

export const Seo = axios.create({
  baseURL: baseURL + "/seo",
})
// Add a request interceptor to include the authentication token
Mabeet.interceptors.request.use(
  async (config) => {
    console.log("🚀 ~ config:", config.url)
    let session

    if (typeof window === "undefined") {
      // Server-side

      session = await getServerSession()
      const locale = await getLocale()
      config.headers["Accept-Language"] = locale
    } else {
      // Client-side
      session = getSession()
      config.headers["Accept-Language"] = getLocaleFromUrl()

      const bayut = window.localStorage.getItem(BAYUT_KEY)
      if (bayut) {
        const value = JSON.parse(bayut)
        if (new Date(value.date) < new Date()) {
          if (value.source) config.headers["source"] = value.source
          if (value.utm_phone_number)
            config.headers["utm_phone_number"] = value.utm_phone_number
        }
      }
    }

    if (session?.access_token) {
      config.headers["Authorization"] = `Bearer ${session.access_token}`
    }
    config.headers["User-Agent"] = "web"

    return config
  },
  (error) => {
    console.log("🚀 ~ error:", error)
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

const oldURL =
  process.env.NODE_ENV === "development"
    ? "https://dev.mabet-app.com/api/v1"
    : "https://app.mabet.com.sa/api/v1"

const OldMabeet = axios.create({
  baseURL: oldURL,
})

OldMabeet.interceptors.request.use(
  async (config) => {
    let session

    if (typeof window === "undefined") {
      // Server-side

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
    config.headers["User-Agent"] = "web"

    return config
  },
  (error) => {
    console.log("🚀 ~ error:", error)
    // Do something with request error
    return Promise.reject(error)
  }
)
Mabeet.interceptors.response.use(
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
        await axios.post("/api/logout")
        useSession.getState().updateSession(null)
        const locale = getLocaleFromUrl() as "en" | "ar"
        window.location.href = `/${locale}`
      }
    }
    return Promise.reject(error)
  }
)

export default Mabeet
export { BlogApi, OldMabeet }
