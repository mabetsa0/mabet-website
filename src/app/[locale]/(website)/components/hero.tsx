import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { Button, Space, Stack, Text, Title } from "@mantine/core"
import { Search } from "lucide-react"
import { heroBackground } from "@/assets"
import MobileSearch from "./mobile-primary-search/mobile-search"
import SearchBar from "./search-bar"

export default async function Hero() {
  const t = await getTranslations()

  return (
    <>
      <section className="relative flex h-[30svh] items-center md:h-[calc(100svh-74px)]">
        <Image
          src={heroBackground}
          alt="background"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          loading="eager"
        />
        <div className="relative container mx-auto text-white">
          <Stack gap={"xl"} mt={{ md: "90" }}>
            <Stack gap={"xs"}>
              <Title
                className="text-3xl max-md:text-center md:text-[52px]"
                order={1}
              >
                {t("home.hero.title")}
              </Title>
              <Text className="max-md:text-center md:text-3xl lg:max-w-3xl">
                {t("home.hero.description")}
              </Text>
            </Stack>
            <Space visibleFrom="md" />
            <div className="hidden max-w-5xl md:block">
              <Suspense>
                <SearchBar />
              </Suspense>
            </div>
          </Stack>
        </div>
      </section>
      <Suspense>
        <div className="relative flex justify-center px-1 py-1.5 md:hidden">
          <MobileSearch>
            <Button
              component="div"
              leftSection={
                <Search className="text-primary" strokeWidth={1.25} />
              }
              size="lg"
              variant="outline"
              className="h-[76px] max-w-[85vw] rounded-[50px] border-[1.5] text-[12px] font-normal text-[#767676] [box-shadow:_0px_16px_40px_0px_#0000001A]"
            >
              {t("general.mobile-search")}
            </Button>
          </MobileSearch>
        </div>
      </Suspense>
    </>
  )
}
