import { cookies } from "next/headers"
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
        <main className="h-[calc(100vh-73px)]">
          <div className="flex h-full">
            <div className="min-w-[360px] border-e border-e-gray-100 lg:min-w-[390px]">
              <ChatList accessToken={accessToken} />
            </div>
            <div className="w-full">{children}</div>
          </div>
        </main>
      </SessionStoreProvider>
    </UserStoreProvider>
  )
}
