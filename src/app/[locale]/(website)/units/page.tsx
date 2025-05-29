import { Box, Space, Stack } from "@mantine/core"
import { Suspense } from "react"
import SearchBar from "../components/search-bar"
import Results from "./components/results"

const Page = () => {
  return (
    <Stack gap={"xl"}>
      <Space />
      <Box visibleFrom="md">
        <Suspense>
          <SearchBar />
        </Suspense>
      </Box>

      <Suspense>
        <Results />
      </Suspense>
    </Stack>
  )
}

export default Page
