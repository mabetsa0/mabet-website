import { heroBackground } from "@/assets"
import { getCities, getUnitTypes } from "@/services/lists"
import { Space, Stack, Text, Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import SearchBar from "./search-bar"

export default async function Hero() {
  const t = await getTranslations("home.hero")
  const [unitTypes, cities] = await Promise.all([getUnitTypes(), getCities()])
  return (
    <section className=" h-[70svh] lg:h-[calc(100svh_-_74px)] flex items-center ">
      <Image
        src={heroBackground}
        alt="background"
        className="w-full h-full object-cover  absolute inset-0"
      />
      <div className="container relative text-white mx-auto">
        <Stack gap={"xl"} mt={"90"}>
          <Stack gap={"xs"}>
            <Title order={1}>{t("title")}</Title>
            <Text className="lg:max-w-3xl" fz={28}>
              {t("description")}
            </Text>
          </Stack>
          <Space />
          <div className=" max-w-5xl">
            <SearchBar cities={cities} unitTypes={unitTypes} />
          </div>
        </Stack>
      </div>
    </section>
  )
}
