import { cookies } from "next/headers"
import { getCachedTokenFromCookie } from "./_lib/get-cached-access-token"
import { UserStoreProvider } from "./_stores/user-store-provider"

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const accessToken = await getCachedTokenFromCookie()
  return (
    <>
      <UserStoreProvider user={null}>{children}</UserStoreProvider>
    </>
  )
}
