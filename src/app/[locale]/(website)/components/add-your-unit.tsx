/* eslint-disable @next/next/no-img-element */
import { getTranslations } from "next-intl/server"
import { Button, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import {
  arrow1,
  arrow2,
  logoWithoutWindows,
  mobileArrows,
  whiteCurve,
} from "@/assets"

const AddYourUnit = async () => {
  const t = await getTranslations("home.add-your-unit")
  return (
    <section className="max-xs:overflow-hidden relative bg-[#FFFCF5]">
      <img alt="curve" src={whiteCurve.src} className="w-full" />
      <div className="container mx-auto pt-3 pb-5">
        <div className="flex flex-col gap-[4px] text-center">
          <Text mb={"xs"} className="max-md:text-sm" c={"primary"} fw={500}>
            {t("title")}
          </Text>
          <Title className="text-h3 md:text-h2">{t("desciption")}</Title>
          <Stack gap={"md"} mt={"md"}>
            <Text mx={"auto"} maw={425}>
              {t("sub-description")}
            </Text>

            <Button className="px-4" mx={"auto"}>
              {t("add-button")}
            </Button>
          </Stack>
        </div>
        <SimpleGrid
          mt={"xl"}
          maw={1250}
          mx={"auto"}
          spacing="xl"
          visibleFrom="md"
          cols={4}
        >
          <Stack className="relative">
            <div className="relative flex h-[65px] w-[90px] items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <Text className="text-h4 relative z-[1] font-bold">01</Text>
            </div>
            <div>
              <Title order={4}>{t("card.1.title")}</Title>
              <Text c={"#767676"}>{t("card.1.description")}</Text>
            </div>
            <img
              alt="arrow"
              src={arrow1.src}
              className="absolute start-[20%] -bottom-2 max-lg:w-[190px]"
            />
          </Stack>
          <Stack className="relative">
            <div>
              <Title order={4}>{t("card.2.title")}</Title>
              <Text c={"#767676"}>{t("card.2.description")}</Text>
            </div>
            <div className="relative flex h-[65px] w-[90px] items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <Text className="text-h4 relative z-[1] font-bold">02</Text>
            </div>
            <img
              alt="arrow"
              src={arrow2.src}
              className="absolute start-[35%] bottom-0.5 max-lg:w-[190px]"
            />
          </Stack>
          <Stack className="relative">
            <div className="relative flex h-[65px] w-[90px] items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <Text className="text-h4 relative z-[1] font-bold">03</Text>
            </div>
            <div>
              <Title order={4}>{t("card.3.title")}</Title>
              <Text c={"#767676"}>{t("card.3.description")}</Text>
            </div>
            <img
              alt="arrow"
              src={arrow1.src}
              className="absolute start-[20%] -bottom-2 max-lg:w-[190px]"
            />
          </Stack>
          <Stack className="relative">
            <div>
              <Title order={4}>{t("card.4.title")}</Title>
              <Text c={"#767676"}>{t("card.4.description")}</Text>
            </div>
            <div className="relative flex h-[65px] w-[90px] items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <Text className="text-h4 relative z-[1] font-bold">04</Text>
            </div>
          </Stack>
        </SimpleGrid>
        <SimpleGrid mt={"xl"} mx={"auto"} spacing="md" hiddenFrom="md" cols={1}>
          <Stack className="relative" gap="sm">
            <div className="relative flex h-[61px] w-[84px] items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <Text className="text-h4 relative z-[1] font-bold">01</Text>
            </div>
            <div>
              <Title order={4}>{t("card.1.title")}</Title>
              <Text c={"#767676"}>{t("card.1.description")}</Text>
            </div>
            <img
              src={mobileArrows.src}
              alt="mobile arrows"
              className="absolute start-[75px] top-[5px] max-w-[calc(100vw_-_90px)] ltr:scale-x-[-1]"
            />
          </Stack>
          <Stack className="relative" gap="sm">
            <div className="relative flex h-[61px] w-[84px] items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <Text className="text-h4 relative z-[1] font-bold">02</Text>
            </div>
            <div>
              <Title order={4}>{t("card.2.title")}</Title>
              <Text c={"#767676"}>{t("card.2.description")}</Text>
            </div>
          </Stack>
          <Stack className="relative" gap="sm">
            <div className="relative flex h-[61px] w-[84px] items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <Text className="text-h4 relative z-[1] font-bold">03</Text>
            </div>
            <div>
              <Title order={4}>{t("card.3.title")}</Title>
              <Text c={"#767676"}>{t("card.3.description")}</Text>
            </div>
          </Stack>
          <Stack className="relative" gap="sm">
            <div className="relative flex h-[61px] w-[84px] items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <Text className="text-h4 relative z-[1] font-bold">04</Text>
            </div>
            <div>
              <Title order={4}>{t("card.4.title")}</Title>
              <Text c={"#767676"}>{t("card.4.description")}</Text>
            </div>
          </Stack>
        </SimpleGrid>
      </div>
    </section>
  )
}

export default AddYourUnit
