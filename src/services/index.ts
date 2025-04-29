import { getLocaleFromUrl } from "@/utils/get-locale"
import { getSession } from "@/utils/get-session"
import axios from "axios"
import { getLocale } from "next-intl/server"

const baseURL = process.env.NEXT_PUBLIC_TEST
  ? "https://mabet.dev/api/v2"
  : "https://app.mabet.com.sa/api/v2"
// const baseURL = "http://mabeet.test/api/v2"

const Mabet = axios.create({
  baseURL: baseURL,
})

const BlogApi = axios.create({
  baseURL: "https://app.mabet.com.sa/api/v2/blog",
})

export const Seo = axios.create({
  baseURL: baseURL + "/seo",
})
// Add a request interceptor to include the authentication token
Mabet.interceptors.request.use(
  async (config) => {
    console.log("🚀 ~ config:", config.url)
    let session: {
      access_token: string
      id: string
    } | null

    if (typeof window === "undefined") {
      const locale = await getLocale()
      config.headers["Accept-Language"] = locale
    } else {
      // Client-side
      session = getSession()
      config.headers["Accept-Language"] = getLocaleFromUrl()
      if (session?.access_token) {
        config.headers["Authorization"] = `Bearer ${session.access_token}`
      }
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

export default Mabet
export { BlogApi }
