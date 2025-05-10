import { Space, Stack } from "@mantine/core"
import SearchBar from "../components/search-bar"
import { Suspense } from "react"

const Page = async ({
  params,
}: {
  params: Promise<{
    city_id: string
  }>
}) => {
  return (
    <Stack gap={"xl"}>
      <Space />
      <Suspense>
        <SearchBar />
      </Suspense>
    </Stack>
  )
}

export default Page
