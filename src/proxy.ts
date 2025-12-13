import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { getChatAccessToken } from "@/app/[locale]/(website)/user/chat/_services/get-access-token"
import { CHAT_SESSION_COOKIE } from "@/config"
import { routing } from "@/lib/i18n/routing"
import { getServerSession } from "./services/get-server-session"

const handleI18nRouting = createMiddleware(routing)

export default async function proxy(req: NextRequest) {
  const res = handleI18nRouting(req)

  if (req.nextUrl.pathname.includes("/gathern")) {
    res.headers.set(
      "x-meta-title",
      encodeURIComponent(
        req.nextUrl.pathname.startsWith("/ar")
          ? "شقق جاذر ان"
          : "Gathern apartments"
      )
    )
  }

  if (
    req.nextUrl.pathname.includes("/chat") ||
    req.nextUrl.pathname.includes("/units/")
  ) {
    const session = await getServerSession()
    if (!session) {
      return res
    }

    // Check if chat access token is cached in cookies
    const cachedToken = req.cookies.get(CHAT_SESSION_COOKIE)?.value
    let chatAccessToken = cachedToken

    // If no cached token, generate one from user access token
    if (!chatAccessToken && session.access_token) {
      try {
        chatAccessToken = await getChatAccessToken(session.access_token)

        if (chatAccessToken) {
          // Store chat access token in cookies on the response
          const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours

          res.cookies.set(CHAT_SESSION_COOKIE, chatAccessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            expires: expiresAt,
            path: "/",
          })
        }
      } catch (error) {
        // If token generation fails, log error but don't block the request
        // The chat page can handle the error appropriately
        console.error("Failed to generate chat access token:", error)
      }
    }
  }

  return res
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}
