"use server"
import { cookies } from "next/headers"
import { CHAT_SESSION_COOKIE } from "@/config"

export const getCachedTokenFromCookie = async () => {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get(CHAT_SESSION_COOKIE)

  if (!tokenCookie) return null

  return tokenCookie.value
}
