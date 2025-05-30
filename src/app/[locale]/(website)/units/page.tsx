import { Box, Space, Stack } from "@mantine/core"
import { Suspense } from "react"
import SearchBar from "../components/search-bar"
import Results from "./components/results"
import { SEO } from "@/services/get-seo"
import Footer from "@/components/common/footer"

export async function generateMetadata(args: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const searchParams = await args.searchParams

  const result = await SEO("/units", searchParams)
  return result
}
const Page = () => {
  return (
    <>
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
      <Footer />
    </>
  )
}

export default Page
