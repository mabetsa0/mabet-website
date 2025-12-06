import { getCachedTokenFromCookie } from "./_lib/get-cached-access-token"
import { UserStoreProvider } from "./_stores/user-store-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  const accessToken = getCachedTokenFromCookie()
  console.log("🚀 ~ Layout ~ accessToken:", accessToken)
  return (
    <>
      <UserStoreProvider user={null}>{children}</UserStoreProvider>
    </>
  )
}
