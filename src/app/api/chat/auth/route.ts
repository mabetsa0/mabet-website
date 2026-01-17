import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { getCachedTokenFromCookie } from "@/app/[locale]/(website)/user/chat/_lib/get-cached-access-token"
import { getChatAccessToken } from "@/app/[locale]/(website)/user/chat/_services/get-access-token"
import { CHAT_SESSION_COOKIE } from "@/config"

export async function POST(request: NextRequest) {
  const headerToken = request.headers.get("Authorization")
  const token = headerToken?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let accessToken = await getCachedTokenFromCookie()

  if (accessToken) {
    return NextResponse.json({ token: accessToken }, { status: 200 })
  }

  const cookieStore = await cookies()
  // If no valid cached token, fetch it
  if (!accessToken) {
    try {
      accessToken = await getChatAccessToken(token)

      if (!accessToken) {
        throw new Error("Failed to fetch access token")
      }

      // Save to cookies
      const expiresAt = new Date(Date.now() + 5 * 60 * 60 * 1000)

      cookieStore.set(CHAT_SESSION_COOKIE, accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: expiresAt,
        path: "/",
      })

      return NextResponse.json({ token: accessToken }, { status: 200 })
    } catch (error: unknown) {
      // Handle unauthorized errors
      const status = (error as { response?: { status: number } })?.response
        ?.status

      // Clear any invalid cookies
      cookieStore.delete(CHAT_SESSION_COOKIE)

      // If it's an authentication/authorization error, return 401
      if (status === 401 || status === 403) {
        return new NextResponse(
          JSON.stringify({
            error: "Unauthorized",
            message: "Invalid or expired token",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
      }

      // For other errors, redirect to home
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ token: accessToken }, { status: 200 })
}
