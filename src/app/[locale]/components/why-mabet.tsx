/* eslint-disable @next/next/no-img-element */
import {
  headset,
  imageIcon,
  man,
  moneySecurity,
  newReleases,
  paymentSuccess,
  searchList,
} from "@/assets"
import { Space, Stack, Text, Title } from "@mantine/core"
import { useTranslations } from "next-intl"
import Image from "next/image"
const WhyMabet = () => {
  const t = useTranslations("home.why-mabet")
  return (
    <section>
      <div className="container">
        <div className="text-center mb-1">
          <Text className="max-md:text-sm" c={"primary"} fw={500}>
            {t("title")}
          </Text>
          <Title className=" text-h3 md:text-h2">{t("desciption")}</Title>
        </div>
        <div className="grid  grid-cols-[1fr_2fr_1fr]">
          <Stack gap={"xl"}>
            <Stack maw={290} gap={"3px"} className=" rotate-12  -translate-x-2">
              <div className="size-[48px]">
                <img
                  className="w-full h-full object-contain"
                  src={paymentSuccess.src}
                  alt="safe payment"
                />
              </div>
              <Title c={"primary"} order={4}>
                {t("card.1.title")}
              </Title>
              <Text c={"#767676"}>{t("card.1.description")}</Text>
            </Stack>
            <Space />
            <Space />

            <Stack
              className=" -rotate-12  -translate-x-1"
              maw={290}
              gap={"3px"}
            >
              <div className="size-[48px]">
                <img
                  className="w-full h-full object-contain"
                  src={moneySecurity.src}
                  alt="money security"
                />
              </div>
              <Title order={4}>{t("card.2.title")}</Title>
              <Text c={"#767676"}>{t("card.2.description")}</Text>
            </Stack>
            <Space />
            <Space />

            <Stack className=" rotate-12  -translate-x-1" maw={290} gap={"3px"}>
              <div className="size-[48px]">
                <img
                  className="w-full h-full object-contain"
                  src={searchList.src}
                  alt="easy search"
                />
              </div>
              <Title c={"primary"} order={4}>
                {t("card.3.title")}
              </Title>
              <Text c={"#767676"}>{t("card.3.description")}</Text>
            </Stack>
          </Stack>
          <div>
            <Image src={man} alt="a man" />
          </div>
          <Stack gap={"xl"}>
            <Stack className=" -rotate-12  translate-x-2" maw={290} gap={"3px"}>
              <div className="size-[48px]">
                <img
                  className="w-full h-full object-contain"
                  src={newReleases.src}
                  alt="licensed"
                />
              </div>
              <Title order={4}>{t("card.4.title")}</Title>
              <Text c={"#767676"}>{t("card.4.description")}</Text>
            </Stack>
            <Space />
            <Space />
            <Stack className=" rotate-12  translate-x-1" maw={290} gap={"3px"}>
              <div className="size-[48px]">
                <img
                  className="w-full h-full object-contain"
                  src={headset.src}
                  alt="headset"
                />
              </div>
              <Title c={"primary"} order={4}>
                {t("card.5.title")}
              </Title>
              <Text c={"#767676"}>{t("card.5.description")}</Text>
            </Stack>
            <Space />
            <Space />

            <Stack className=" -rotate-12  " maw={290} gap={"3px"}>
              <div className="size-[48px]">
                <img
                  className="w-full h-full object-contain"
                  src={imageIcon.src}
                  alt="image icon"
                />
              </div>
              <Title order={4}>{t("card.6.title")}</Title>
              <Text c={"#767676"}>{t("card.6.description")}</Text>
            </Stack>
          </Stack>
        </div>
      </div>
    </section>
  )
}

export default WhyMabet
