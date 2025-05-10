import { Space, Stack } from "@mantine/core"
import { Suspense } from "react"
import SearchBar from "../components/search-bar"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack gap={"xl"}>
      <Space />
      <Suspense>
        <SearchBar />
      </Suspense>
      {children}
    </Stack>
  )
}

export default Layout
