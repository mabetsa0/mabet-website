import { LOCALSTORAGE_SESSION_KEY } from "@/config"
import { getLocaleFromUrl } from "@/utils/get-locale"
import axios from "axios"

export const logout = async () => {
  await axios.post("/api/logout")
  window.localStorage.removeItem(LOCALSTORAGE_SESSION_KEY)
  const locale = getLocaleFromUrl() as "en" | "ar"
  window.location.href = `/${locale}`
}
