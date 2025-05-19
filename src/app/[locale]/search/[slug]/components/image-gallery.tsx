/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import { Button, Group, Stack, Title } from "@mantine/core"
/* eslint-disable @next/next/no-img-element */

import { useUnitData } from "../context/unit-context"
import ShareButton from "./share-button"
import FavoriteButton from "./favorite-button"
import { useTranslations } from "next-intl"
import { Image, Video } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"

const ImageGallery = () => {
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

  return (
    <>
      <main>
        <div className="container py-2">
          <Stack gap={"xl"}>
            <Group justify="space-between">
              <Title order={2}>{unit.name}</Title>
              <Group>
                <ShareButton />
                <FavoriteButton />
              </Group>
            </Group>
            {/* image gallery */}
            <div className="flex select-none gap-0.5 overflow-hidden rounded-2xl">
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
                  {true ? (
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
            </div>
          </Stack>
        </div>
      </main>
    </>
  )
}

export default ImageGallery
