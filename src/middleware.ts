import { routing } from "@/lib/i18n/routing"
import createMiddleware from "next-intl/middleware"
import { NextRequest, userAgent } from "next/server"

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

export default createMiddleware(routing)

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}
