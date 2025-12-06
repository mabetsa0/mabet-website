import createMiddleware from "next-intl/middleware"
import { NextRequest } from "next/server"
import { routing } from "@/lib/i18n/routing"

const handleI18nRouting = createMiddleware(routing)

export default function proxy(req: NextRequest) {
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

  return res
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}
