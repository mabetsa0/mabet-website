/* eslint-disable @next/next/no-img-element */
import { arrow1, arrow2, logoWithoutWindows } from "@/assets"
import { Button, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"

const AddYourUnit = async () => {
  const t = await getTranslations("home.add-your-unit")
  return (
    <section className="bg-[#FFFCF5]">
      <div className="container py-4.5 mx-auto">
        <div className="text-center flex flex-col gap-[4px]">
          <Text className="max-md:text-sm" c={"primary"} fw={500}>
            {t("title")}
          </Text>
          <Title className=" text-h3 md:text-h2">{t("desciption")}</Title>
          <Stack gap={"md"} mt={"md"}>
            <Text mx={"auto"} maw={425}>
              {t("sub-description")}
            </Text>

            <Button className="px-4" mx={"auto"}>
              {t("add-button")}
            </Button>
          </Stack>
        </div>
        <SimpleGrid mt={"xl"} maw={1250} mx={"auto"} spacing="xl" cols={4}>
          <Stack className="relative">
            <div className="w-[90px] h-[65px] relative flex items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="w-full h-full object-contain absolute inset-0"
              />
              <Text className="relative text-h4 font-bold z-[1] ">01</Text>
            </div>
            <div>
              <Title order={4}>{t("card.1.title")}</Title>
              <Text c={"#767676"}>{t("card.1.description")}</Text>
            </div>
            <img
              alt="arrow"
              src={arrow1.src}
              className="absolute -bottom-2 start-[20%]"
            />
          </Stack>
          <Stack className="relative">
            <div>
              <Title order={4}>{t("card.2.title")}</Title>
              <Text c={"#767676"}>{t("card.2.description")}</Text>
            </div>
            <div className="w-[90px] h-[65px] relative flex items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="w-full h-full object-contain absolute inset-0"
              />
              <Text className="relative text-h4 font-bold z-[1] ">02</Text>
            </div>
            <img
              alt="arrow"
              src={arrow2.src}
              className="absolute bottom-0.5 start-[35%]"
            />
          </Stack>
          <Stack className="relative">
            <div className="w-[90px] h-[65px] relative flex items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="w-full h-full object-contain absolute inset-0"
              />
              <Text className="relative text-h4 font-bold z-[1] ">03</Text>
            </div>
            <div>
              <Title order={4}>{t("card.3.title")}</Title>
              <Text c={"#767676"}>{t("card.3.description")}</Text>
            </div>
            <img
              alt="arrow"
              src={arrow1.src}
              className="absolute -bottom-2 start-[20%]"
            />
          </Stack>
          <Stack className="relative">
            <div>
              <Title order={4}>{t("card.4.title")}</Title>
              <Text c={"#767676"}>{t("card.4.description")}</Text>
            </div>
            <div className="w-[90px] h-[65px] relative flex items-center justify-center">
              <img
                src={logoWithoutWindows.src}
                alt="logo"
                className="w-full h-full object-contain absolute inset-0"
              />
              <Text className="relative text-h4 font-bold z-[1] ">04</Text>
            </div>
          </Stack>
        </SimpleGrid>
      </div>
    </section>
  )
}

export default AddYourUnit
