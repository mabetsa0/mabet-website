import { Stack } from "@mantine/core"
import SearchBar from "../components/search-bar"

type Props = {}

const Page = async (props: Props) => {
  return (
    <Stack>
      <SearchBar />
    </Stack>
  )
}

export default Page
