import { heroBackground } from "@/assets"
import { Stack, Text, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Page() {
  const t = useTranslations("home.hero")
  return (
    <section className=" h-[70svh] lg:h-[calc(100svh_-_74px)] flex items-center ">
      <Image
        src={heroBackground}
        alt="background"
        className="w-full h-full object-cover  absolute inset-0"
      />
      <div className="container relative text-white mx-auto">
        <Stack gap={"xs"}>
          <Title order={1} fz={58}>
            {t("title")}
          </Title>
          <Text className="lg:max-w-3xl" fz={28}>
            {t("description")}
          </Text>
        </Stack>
      </div>
    </section>
  )
}
