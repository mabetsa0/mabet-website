/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import { ActionIcon, Box, Button, Group, Stack, Title } from "@mantine/core"
/* eslint-disable @next/next/no-img-element */

import { useUnitData } from "../context/unit-context"
import ShareButton from "./share-button"
import FavoriteButton from "./favorite-button"
import { useTranslations } from "next-intl"
import { ChevronRight, Image, Video } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import { Carousel } from "@mantine/carousel"
import { useRouter } from "@/lib/i18n/navigation"
import { useEffect } from "react"

const ImageGallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    console.log("🚀 ~ useEffect ~ window.scrollTo:", "scroll to top")
  }, [])
  const unit = useUnitData()
  const t = useTranslations()
  const [_, setOpened] = useQueryState(
    "image-slider",
    parseAsBoolean.withDefault(false)
  )
  const [openVideo, setOpenVideo] = useQueryState(
    "video",
    parseAsBoolean.withDefault(false)
  )

  const Router = useRouter()
  const goBack = () => {
    Router.back()
  }

  return (
    <>
      <main>
        <div className="container max-md:p-0 py-2">
          <Stack gap={"xl"}>
            <Group
              wrap="nowrap"
              justify="space-between"
              className="absolute max-md:px-1 max-md:pt-1.5 md:relative z-[10] inset-x-0"
            >
              <Title visibleFrom="md" order={2}>
                {unit.name}
              </Title>
              <ActionIcon
                onClick={goBack}
                hiddenFrom="md"
                size={"xl"}
                radius={"xl"}
                color="white"
                c={"dark"}
              >
                <ChevronRight
                  size={28}
                  strokeWidth={1.25}
                  className="ltr:rotate-180 hover:bg-white/70"
                />
              </ActionIcon>
              <Group>
                <ShareButton />
                <FavoriteButton />
              </Group>
            </Group>
            {/* image gallery */}
            <Box
              visibleFrom="md"
              className="flex select-none gap-0.5 overflow-hidden rounded-2xl "
            >
              <div className="group relative aspect-square w-[44%] cursor-pointer">
                <img
                  loading="lazy"
                  src={unit.images[0].image_path}
                  className="h-full w-full object-cover"
                  alt={unit.images[0].alt}
                />
                <span className="absolute inset-0 z-[1] bg-[#0000000f] duration-300 group-hover:bg-[#00000040]"></span>
                <Group
                  wrap="nowrap"
                  className=" absolute bottom-1 right-1 z-10"
                >
                  <Button
                    onClick={() => {
                      setOpened(true)
                    }}
                    color="white"
                    c={"dark"}
                    className=" hover:bg-white/90 duration-300 "
                    leftSection={<Image strokeWidth={1.25} />}
                  >
                    {t("general.show-all-images")}
                  </Button>
                  {unit.has_videos ? (
                    <Button
                      onClick={() => {
                        setOpenVideo(true)
                      }}
                      color="white"
                      c={"dark"}
                      className=" hover:bg-white/90 duration-300 "
                      leftSection={<Video strokeWidth={1.25} />}
                    >
                      {t("general.show-video")}
                    </Button>
                  ) : null}
                </Group>
              </div>
              <div className="grid w-[56%] grid-cols-2 grid-rows-2 gap-0.5">
                {unit.images.slice(1, 5).map((image, i) => {
                  return (
                    <div
                      key={i}
                      className="group relative aspect-[2.7/2.1] cursor-pointer overflow-hidden"
                    >
                      <img
                        src={image.image_path}
                        className="h-full w-full object-cover"
                        alt={"image"}
                        loading="lazy"
                      />
                      <span className="absolute inset-0 z-[1] bg-[#0000000f] duration-300 group-hover:bg-[#00000040]"></span>
                    </div>
                  )
                })}
              </div>
            </Box>
          </Stack>
        </div>
        <Box hiddenFrom="md" className="relative">
          <Carousel
            withControls={false}
            loop
            height="100%"
            withIndicators={true}
            classNames={{
              indicators: "justify-center mb-1",
              indicator: "!w-0.5 !h-0.5",
            }}
          >
            {unit.images.map((image, i) => {
              return (
                <Carousel.Slide key={i}>
                  <div className="relative w-full h-[400px]">
                    <img
                      src={image.image_path}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full  object-cover"
                    />
                  </div>
                </Carousel.Slide>
              )
            })}
          </Carousel>
          <Group wrap="nowrap" className=" absolute bottom-3 right-1 z-10">
            <Button
              onClick={() => {
                setOpened(true)
              }}
              color="white"
              c={"dark"}
              className=" hover:bg-white/90 duration-300 "
              leftSection={<Image strokeWidth={1.25} />}
            >
              {t("general.show-all-images")}
            </Button>
            {unit.has_videos ? (
              <Button
                onClick={() => {
                  setOpenVideo(true)
                }}
                color="white"
                c={"dark"}
                className=" hover:bg-white/90 duration-300 "
                leftSection={<Video strokeWidth={1.25} />}
              >
                {t("general.show-video")}
              </Button>
            ) : null}
          </Group>
        </Box>
      </main>
    </>
  )
}

export default ImageGallery
