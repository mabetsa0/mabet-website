import { heroBackground } from "@/assets"
import { Space, Stack, Text, Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import MobileSearch from "./mobile-search"
import SearchBar from "./search-bar"

export default async function Hero() {
  const t = await getTranslations("home.hero")
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
                {t("title")}
              </Title>
              <Text className="max-md:text-center  md:text-3xl lg:max-w-3xl">
                {t("description")}
              </Text>
            </Stack>
            <Space visibleFrom="md" />
            <div className=" hidden md:block max-w-5xl">
              <SearchBar />
            </div>
          </Stack>
        </div>
      </section>
      <MobileSearch />
    </>
  )
}
