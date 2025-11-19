import { Suspense } from "react"
import { headers } from "next/headers"
import { Box, Space, Stack } from "@mantine/core"
import Footer from "@/components/common/footer"
import { SEO } from "@/services/get-seo"
import SearchBar from "../components/search-bar"
import Results from "./components/results"

export async function generateMetadata(args: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const searchParams = await args.searchParams

  const result = await SEO("/units", searchParams)
  const headersList = await headers()
  const hasTitle = headersList.get("x-meta-title")
  const title = hasTitle ? decodeURIComponent(hasTitle) : result.title

  return {
    ...result,
    title: title,
  }
}
const Page = () => {
  return (
    <>
      <Stack gap={"xl"}>
        <Space visibleFrom="md" />
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
