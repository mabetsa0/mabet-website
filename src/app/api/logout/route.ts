import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import {
  INTEGRATION_COOKIE_NAME,
  SESSION_COOKIE,
  CHAT_SESSION_COOKIE,
} from "@/config"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)

  cookieStore.delete(INTEGRATION_COOKIE_NAME)
  cookieStore.delete(CHAT_SESSION_COOKIE)
  return NextResponse.json({
    message: "Logged out successfully",
  })
}
