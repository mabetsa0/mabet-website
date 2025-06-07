import { useSession } from "@/lib/session-store"
import { getLocaleFromUrl } from "@/utils/get-locale"
import axios from "axios"

export const logout = async () => {
  await axios.post("/api/logout")
  useSession.getState().updateSession(null)
  const locale = getLocaleFromUrl() as "en" | "ar"
  window.location.href = `/${locale}`
}
