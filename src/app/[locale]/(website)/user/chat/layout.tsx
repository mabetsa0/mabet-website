import { UserStoreProvider } from "./_stores/user-store-provider"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserStoreProvider user={null}>{children}</UserStoreProvider>
    </>
  )
}
