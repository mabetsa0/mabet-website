import axios from "axios"
import { useSession } from "@/stores/session-store"
import { getLocaleFromUrl } from "@/utils/get-locale"

export const logout = async () => {
  await axios.post("/api/logout")
  useSession.getState().updateSession(null)
  const locale = getLocaleFromUrl() as "en" | "ar"
  window.location.href = `/${locale}`
}
