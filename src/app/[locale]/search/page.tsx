import { Space, Stack } from "@mantine/core"
import SearchBar from "../components/search-bar"
import { Suspense } from "react"
import { SearchParams } from "./@types/search-params"
import Results from "./components/results"

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) => {
  return (
    <Stack gap={"xl"}>
      <Space />
      <Suspense>
        <SearchBar />
      </Suspense>
      <Results searchparams={searchParams} />
    </Stack>
  )
}

export default Page
