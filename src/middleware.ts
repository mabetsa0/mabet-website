import createMiddleware from "next-intl/middleware"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import { routing } from "@/lib/i18n/routing"
import { CHAT_ACCESS_TOKEN_COOKIE } from "./config"

const handleI18nRouting = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
  const res = handleI18nRouting(req)
  const cookiesStore = await cookies()

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

  if (req.nextUrl.pathname.includes("/chat")) {
    const accessToken = cookiesStore.get(ACCESS_TOKEN_COOKIE)
  }

  return res
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}
