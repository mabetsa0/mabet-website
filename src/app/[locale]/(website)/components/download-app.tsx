/* eslint-disable @next/next/no-img-element */
import { appStore, dotImages, googlePlay, phoneImage } from "@/assets"
import { APP_LINK } from "@/config"
import {
  BackgroundImage,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Space,
} from "@mantine/core"

import { useTranslations } from "next-intl"
import Image from "next/image"
import React from "react"

const DownLoadApp = () => {
  const t = useTranslations("home.download-app-banner")
  return (
    <section>
      <div className="max-w-[1250px]  mx-auto mt-2 md:mt-9 xl:mt-10 md:rounded-[44px] bg-[linear-gradient(100.06deg,_#188078_42.47%,_#051A18_88.92%)]">
        <BackgroundImage src={dotImages.src}>
          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            className="px-1 md:px-2 lg:px-3 py-1"
          >
            <Stack maw={425} className="max-md:mx-auto">
              <Text c={"white"}>{t("sup-title")}</Text>
              <Title order={2} c={"white"}>
                {t("title")}
              </Title>
              <Text className=" text-h5 " c={"white"}>
                {t("desciption")}
              </Text>
              <Space />
              <Group wrap="nowrap">
                <a href={APP_LINK} target="_blank" rel="noopener">
                  <img
                    src={googlePlay.src}
                    alt="download app via google play"
                    loading="lazy"
                  />
                </a>
                <a href={APP_LINK} target="_blank" rel="noopener">
                  <img
                    src={appStore.src}
                    alt="download app via app store"
                    loading="lazy"
                  />
                </a>
              </Group>
            </Stack>
            <div>
              <Image
                src={phoneImage}
                alt="download app"
                className="md:-mt-[38%] max-w-[500px] mx-auto md:ms-auto w-full"
              />
            </div>
          </SimpleGrid>
        </BackgroundImage>
      </div>
    </section>
  )
}

export default DownLoadApp
