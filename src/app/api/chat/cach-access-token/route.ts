import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { CHAT_SESSION_COOKIE } from "@/config"

export async function POST(request: NextRequest) {
  const { accessToken } = await request.json()
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cookieStore = await cookies()

  // Save to cookies
  const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000)

  cookieStore.set(CHAT_SESSION_COOKIE, accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    expires: expiresAt,
    path: "/",
  })

  return NextResponse.json({ token: accessToken }, { status: 200 })
}
