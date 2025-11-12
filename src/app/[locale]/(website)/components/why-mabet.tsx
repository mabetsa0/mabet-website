/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl"
import Image from "next/image"
import { SimpleGrid, Space, Stack, Text, Title } from "@mantine/core"
import {
  headset,
  imageIcon,
  man,
  moneySecurity,
  newReleases,
  paymentSuccess,
  searchList,
} from "@/assets"

const WhyMabet = () => {
  const t = useTranslations("home.why-mabet")
  return (
    <section>
      <div className="container py-3">
        <div className="mb-1 text-center">
          <Text mb={"xs"} className="max-md:text-sm" c={"primary"} fw={500}>
            {t("title")}
          </Text>
          <Title className="text-h3 md:text-h2">{t("desciption")}</Title>
        </div>
        <div className="grid-cols-[1fr_2fr_1fr] md:grid">
          <Stack visibleFrom="md" gap={"xl"}>
            <Stack
              maw={290}
              gap={"3px"}
              className="md:-translate-x-2 md:rotate-12"
            >
              <div className="size-[32px] md:size-[48px]">
                <img
                  className="h-full w-full object-contain"
                  src={paymentSuccess.src}
                  alt="safe payment"
                />
              </div>
              <Title c={"primary"} className="text-h5 md:text-h4">
                {t("card.1.title")}
              </Title>
              <Text c={"#767676"} className="max-md:text-sm">
                {t("card.1.description")}
              </Text>
            </Stack>
            <Space />
            <Space visibleFrom="md" />

            <Stack
              className="md:-translate-x-1 md:-rotate-12"
              maw={290}
              gap={"3px"}
            >
              <div className="size-[32px] md:size-[48px]">
                <img
                  className="h-full w-full object-contain"
                  src={moneySecurity.src}
                  alt="money security"
                />
              </div>
              <Title className="text-h5 md:text-h4">{t("card.2.title")}</Title>
              <Text c={"#767676"} className="max-md:text-sm">
                {t("card.2.description")}
              </Text>
            </Stack>
            <Space />
            <Space visibleFrom="md" />

            <Stack
              className="md:-translate-x-1 md:rotate-12"
              maw={290}
              gap={"3px"}
            >
              <div className="size-[32px] md:size-[48px]">
                <img
                  className="h-full w-full object-contain"
                  src={searchList.src}
                  alt="easy search"
                />
              </div>
              <Title c={"primary"} className="text-h5 md:text-h4">
                {t("card.3.title")}
              </Title>
              <Text c={"#767676"} className="max-md:text-sm">
                {t("card.3.description")}
              </Text>
            </Stack>
          </Stack>
          <div>
            <Image src={man} alt="a man" />
          </div>
          <SimpleGrid cols={{ base: 2, md: 1 }}>
            <Stack hiddenFrom="md" gap={"xl"}>
              <Stack
                maw={290}
                gap={"3px"}
                className="md:-translate-x-2 md:rotate-12"
              >
                <div className="size-[32px] md:size-[48px]">
                  <img
                    className="h-full w-full object-contain"
                    src={paymentSuccess.src}
                    alt="safe payment"
                  />
                </div>
                <Title c={"primary"} className="text-h5 md:text-h4">
                  {t("card.1.title")}
                </Title>
                <Text c={"#767676"} className="max-md:text-sm">
                  {t("card.1.description")}
                </Text>
              </Stack>
              <Space />
              <Space visibleFrom="md" />

              <Stack
                className="md:-translate-x-1 md:-rotate-12"
                maw={290}
                gap={"3px"}
              >
                <div className="size-[32px] md:size-[48px]">
                  <img
                    className="h-full w-full object-contain"
                    src={moneySecurity.src}
                    alt="money security"
                  />
                </div>
                <Title className="text-h5 md:text-h4">
                  {t("card.2.title")}
                </Title>
                <Text c={"#767676"} className="max-md:text-sm">
                  {t("card.2.description")}
                </Text>
              </Stack>
              <Space />
              <Space visibleFrom="md" />

              <Stack
                className="md:-translate-x-1 md:rotate-12"
                maw={290}
                gap={"3px"}
              >
                <div className="size-[32px] md:size-[48px]">
                  <img
                    className="h-full w-full object-contain"
                    src={searchList.src}
                    alt="easy search"
                  />
                </div>
                <Title c={"primary"} className="text-h5 md:text-h4">
                  {t("card.3.title")}
                </Title>
                <Text c={"#767676"} className="max-md:text-sm">
                  {t("card.3.description")}
                </Text>
              </Stack>
            </Stack>

            <Stack gap={"xl"}>
              <Stack
                className="md:translate-x-2 md:-rotate-12"
                maw={290}
                gap={"3px"}
              >
                <div className="size-[32px] md:size-[48px]">
                  <img
                    className="h-full w-full object-contain"
                    src={newReleases.src}
                    alt="licensed"
                  />
                </div>
                <Title className="text-h5 md:text-h4">
                  {t("card.4.title")}
                </Title>
                <Text c={"#767676"} className="max-md:text-sm">
                  {t("card.4.description")}
                </Text>
              </Stack>
              <Space />
              <Space visibleFrom="md" />
              <Stack
                className="md:translate-x-1 md:rotate-12"
                maw={290}
                gap={"3px"}
              >
                <div className="size-[32px] md:size-[48px]">
                  <img
                    className="h-full w-full object-contain"
                    src={headset.src}
                    alt="headset"
                  />
                </div>
                <Title c={"primary"} className="text-h5 md:text-h4">
                  {t("card.5.title")}
                </Title>
                <Text c={"#767676"} className="max-md:text-sm">
                  {t("card.5.description")}
                </Text>
              </Stack>
              <Space />
              <Space visibleFrom="md" />

              <Stack className="md:-rotate-12" maw={290} gap={"3px"}>
                <div className="size-[32px] md:size-[48px]">
                  <img
                    className="h-full w-full object-contain"
                    src={imageIcon.src}
                    alt="image icon"
                  />
                </div>
                <Title className="text-h5 md:text-h4">
                  {t("card.6.title")}
                </Title>
                <Text c={"#767676"} className="max-md:text-sm">
                  {t("card.6.description")}
                </Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </div>
      </div>
    </section>
  )
}

export default WhyMabet
