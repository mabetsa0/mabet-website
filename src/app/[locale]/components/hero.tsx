import { heroBackground } from "@/assets"
import { Space, Stack, Text, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import Image from "next/image"
import SearchBar from "./search-bar"

export default function Hero() {
  const t = useTranslations("home.hero")
  return (
    <section className=" h-[70svh] lg:h-[calc(100svh_-_74px)] flex items-center ">
      <Image
        src={heroBackground}
        alt="background"
        className="w-full h-full object-cover  absolute inset-0"
      />
      <div className="container relative text-white mx-auto">
        <Stack gap={"xl"}>
          <Stack gap={"xs"}>
            <Title order={1}>{t("title")}</Title>
            <Text className="lg:max-w-3xl" fz={28}>
              {t("description")}
            </Text>
          </Stack>
          <Space />
          <div className=" max-w-5xl">
            <SearchBar />
          </div>
        </Stack>
      </div>
    </section>
  )
}
