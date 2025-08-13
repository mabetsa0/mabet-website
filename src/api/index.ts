import { BAYUT_KEY } from "@/components/unit/track-bayut"
import axios from "axios"
import { getSession } from "next-auth/react"
import { getLocale } from "next-intl/server"

const baseURL = process.env.NEXT_PUBLIC_TEST ? "https://mabet.dev/api/v2" : "https://app.mabet.com.sa/api/v2"
// const baseURL = "http://mabeet.test/api/v2"

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
      const { getServerSession } = await import("next-auth")
      const { authOptions } = await import("@/lib/auth/auth")
      session = await getServerSession(authOptions)
      const locale = await getLocale()
      config.headers["Accept-Language"] = locale
    } else {
      // Client-side
      session = await getSession()
      config.headers["Accept-Language"] = window.location.pathname.startsWith("/ar") ? "ar" : "en"

      const bayut = window.localStorage.getItem(BAYUT_KEY)
      if (bayut) {
        const value = JSON.parse(bayut)
        if (new Date(value.date) < new Date()) {
          if (value.source) config.headers["source"] = value.source
          if (value.utm_phone_number) config.headers["utm_phone_number"] = value.utm_phone_number
        }
      }
    }

    if (session?.user?.access_token) {
      config.headers["Authorization"] = `Bearer ${session.user.access_token}`
    }
    config.headers["User-Agent"] = "web"

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)
BlogApi.interceptors.request.use(
  async (config) => {
    if (typeof window === "undefined") {
      const locale = await getLocale()
      config.headers["Accept-Language"] = locale
    } else {
      // Client-side
      config.headers["Accept-Language"] = window.location.pathname.startsWith("/ar") ? "ar" : "en"
    }

    config.headers["User-Agent"] = "web"

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

const oldURL =
  process.env.NODE_ENV === "development" ? "https://dev.mabet-app.com/api/v1" : "https://app.mabet.com.sa/api/v1"

const OldMabeet = axios.create({
  baseURL: oldURL,
})

OldMabeet.interceptors.request.use(
  async (config) => {
    let session

    if (typeof window === "undefined") {
      // Server-side
      const { getServerSession } = await import("next-auth")
      const { authOptions } = await import("@/lib/auth/auth")
      session = await getServerSession(authOptions)

      const locale = await getLocale()
      config.headers["Accept-Language"] = locale
    } else {
      // Client-side
      session = await getSession()
      config.headers["Accept-Language"] = window.location.pathname.startsWith("/ar") ? "ar" : "en"
    }

    if (session?.user?.access_token) {
      config.headers["Authorization"] = `Bearer ${session.user.access_token}`
    }
    config.headers["User-Agent"] = "web"

    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  },
)

export default Mabeet
export { BlogApi, OldMabeet }
