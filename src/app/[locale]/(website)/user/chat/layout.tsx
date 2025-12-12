import { redirect } from "@/lib/i18n/navigation"
import ChatList from "./_components/chat-list"
import { getCachedTokenFromCookie } from "./_lib/get-cached-access-token"
import { SessionStoreProvider } from "./_stores/session-store-provider"
import { UserStoreProvider } from "./_stores/user-store-provider"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const accessToken = await getCachedTokenFromCookie()
  if (!accessToken) {
    return redirect({ href: "/", locale: "ar" })
  }
  return (
    <UserStoreProvider user={null}>
      <SessionStoreProvider accessToken={accessToken}>
        <main className="relative h-[calc(100vh-73px)]">
          <div className="flex h-full">
            <div className="shrink-0 border-r-gray-100 border-l-gray-100 max-sm:w-full sm:min-w-[300px] md:min-w-[320px] lg:min-w-[360px] sm:ltr:border-r sm:rtl:border-l">
              <ChatList />
            </div>

            {children}
          </div>
        </main>
      </SessionStoreProvider>
    </UserStoreProvider>
  )
}
