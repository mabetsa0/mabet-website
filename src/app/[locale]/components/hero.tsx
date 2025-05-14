import { heroBackground } from "@/assets"
import { Button, Space, Stack, Text, Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import MobileSearch from "./mobile-search"
import SearchBar from "./search-bar"
import { Suspense } from "react"
import { Search } from "lucide-react"

export default async function Hero() {
  const t = await getTranslations()

  return (
    <>
      <section className=" h-[30svh] md:h-[calc(100svh_-_74px)] flex items-center relative ">
        <Image
          src={heroBackground}
          alt="background"
          className="w-full h-full object-cover  absolute inset-0"
        />
        <div className="container relative text-white mx-auto">
          <Stack gap={"xl"} mt={{ md: "90" }}>
            <Stack gap={"xs"}>
              <Title
                className="text-3xl max-md:text-center md:text-[52px]"
                order={1}
              >
                {t("home.hero.title")}
              </Title>
              <Text className="max-md:text-center  md:text-3xl lg:max-w-3xl">
                {t("home.hero.description")}
              </Text>
            </Stack>
            <Space visibleFrom="md" />
            <div className=" hidden md:block max-w-5xl">
              <Suspense>
                <SearchBar />
              </Suspense>
            </div>
          </Stack>
        </div>
      </section>
      <Suspense>
        <MobileSearch>
          <Button
            component="div"
            leftSection={<Search className="text-primary" strokeWidth={1.25} />}
            size="lg"
            variant="outline"
            className="text-[12px] max-w-[85vw] border-[1.5] [box-shadow:_0px_16px_40px_0px_#0000001A]  font-normal rounded-[50px] h-[76px] text-[#767676]"
          >
            {t("general.mobile-search")}
          </Button>
        </MobileSearch>
      </Suspense>
    </>
  )
}
