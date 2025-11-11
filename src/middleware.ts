import { routing } from "@/lib/i18n/routing"
import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse, userAgent } from "next/server"

// export default async function middleware(request: NextRequest) {
//   const handleI18nRouting = createMiddleware(routing)

//   const url = request.nextUrl
//   const { device } = userAgent(request)

//   // device.type can be: 'mobile', 'tablet', 'console', 'smarttv',
//   // 'wearable', 'embedded', or undefined (for desktop browsers)
//   const viewport = device.type || "desktop"

//   url.searchParams.set("viewport", viewport)

//   const response = handleI18nRouting(request)
//   return response
// }

const handleI18nRouting = createMiddleware(routing)

export default function middleware(req: NextRequest) {
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
