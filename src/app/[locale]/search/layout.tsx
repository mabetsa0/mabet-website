import { Box, Button, Space, Stack } from "@mantine/core"
import { Suspense } from "react"
import SearchBar from "../components/search-bar"
import MobileSearch from "../components/mobile-search"
import { Search } from "lucide-react"
import { getTranslations } from "next-intl/server"

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const t = await getTranslations("general")
  return (
    <Stack gap={"xl"}>
      <Space />
      <Box visibleFrom="md">
        <Suspense>
          <SearchBar />
        </Suspense>
      </Box>
      <Box className="relative" hiddenFrom="md">
        <Suspense>
          <MobileSearch>
            <Button
              component="div"
              leftSection={
                <Search className="text-primary" strokeWidth={1.25} />
              }
              size="lg"
              variant="outline"
              className="text-[12px] max-w-[85vw] border-[1.5] [box-shadow:_0px_16px_40px_0px_#0000001A]  font-normal rounded-[50px] h-[76px] text-[#767676]"
            >
              {t("mobile-search")}
            </Button>
          </MobileSearch>
        </Suspense>
      </Box>
      {children}
    </Stack>
  )
}

export default Layout
