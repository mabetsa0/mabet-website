import { redirect } from "@/lib/i18n/navigation"
import ChatList from "./_components/chat-list"
import { getCachedTokenFromCookie } from "./_lib/get-cached-access-token"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  try {
    const accessToken = await getCachedTokenFromCookie()
    if (!accessToken) {
      throw new Error("Token cookie not found")
    }

    return (
      <main className="relative h-[calc(100vh-73px)]">
        <div className="flex h-full">
          <div className="max-w-sm shrink-0 border-r-gray-100 border-l-gray-100 max-sm:w-full sm:min-w-[300px] md:min-w-[320px] lg:min-w-[360px] sm:ltr:border-r sm:rtl:border-l">
            <ChatList />
          </div>

          {children}
        </div>
      </main>
    )
  } catch (error) {
    return redirect({ href: "/", locale: "ar" })
  }
}
