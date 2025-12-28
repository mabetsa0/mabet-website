/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { Carousel } from "@mantine/carousel"
import { ActionIcon, Box, Button, Group, Stack, Title } from "@mantine/core"
import { EmblaCarouselType } from "embla-carousel"
import { ChevronRight, Image, Video } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import { useRouter } from "@/lib/i18n/navigation"
/* eslint-disable @next/next/no-img-element */

import { useUnitData } from "../context/unit-context"
import FavoriteButton from "./favorite-button"
import ShareButton from "./share-button"

const ImageGallery = () => {
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  //   console.log("🚀 ~ useEffect ~ window.scrollTo:", "scroll to top")
  // }, [])
  const unit = useUnitData()
  const t = useTranslations()
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])) // Load first image immediately
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

  // Track which slides are visible and load their images
  useEffect(() => {
    if (!embla) return

    const updateLoadedImages = () => {
      const selectedIndex = embla.selectedScrollSnap()
      const slidesInView = embla.slidesInView()

      setLoadedImages((prev) => {
        const newSet = new Set(prev)
        // Load current slide
        newSet.add(selectedIndex)
        // Load adjacent slides for smooth transitions
        if (selectedIndex > 0) newSet.add(selectedIndex - 1)
        if (selectedIndex < unit.images.length - 1)
          newSet.add(selectedIndex + 1)
        // Load all slides currently in view
        slidesInView.forEach((index) => newSet.add(index))
        return newSet
      })
    }

    // Load images for initial slide
    updateLoadedImages()

    // Listen to slide changes
    embla.on("select", updateLoadedImages)
    embla.on("reInit", updateLoadedImages)

    return () => {
      embla.off("select", updateLoadedImages)
      embla.off("reInit", updateLoadedImages)
    }
  }, [embla, unit.images.length])

  return (
    <>
      <main>
        <div className="container py-2 max-md:p-0">
          <Stack gap={"xl"}>
            <Group
              wrap="nowrap"
              justify="space-between"
              className="absolute inset-x-0 z-[10] max-md:px-1 max-md:pt-1.5 md:relative"
            >
              <Title visibleFrom="md" order={2}>
                {unit.name}
              </Title>
              <ActionIcon
                onClick={goBack}
                hiddenFrom="md"
                size={"xl"}
                radius={"xl"}
                variant="white"
                className="hover:bg-white/70"
                c={"dark"}
              >
                <ChevronRight
                  size={28}
                  strokeWidth={1.25}
                  className="ltr:rotate-180"
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
              className="flex gap-0.5 overflow-hidden rounded-2xl select-none"
            >
              <div className="group relative aspect-square w-[44%] cursor-pointer">
                <img
                  decoding="async"
                  loading="lazy"
                  src={unit.images[0].image_path}
                  className="h-full w-full object-cover"
                  alt={unit.images[0].alt}
                />
                <span className="absolute inset-0 z-[1] bg-[#0000000f] duration-300 group-hover:bg-[#00000040]"></span>
                <Group wrap="nowrap" className="absolute right-1 bottom-1 z-10">
                  <Button
                    onClick={() => {
                      setOpened(true)
                    }}
                    color="white"
                    c={"dark"}
                    className="duration-300 hover:bg-white/90"
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
                      className="duration-300 hover:bg-white/90"
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
                        decoding="async"
                        loading="lazy"
                        src={image.image_path}
                        className="h-full w-full object-cover"
                        alt={"image"}
                      />
                      <span className="absolute inset-0 z-1 bg-[#0000000f] duration-300 group-hover:bg-[#00000040]"></span>
                    </div>
                  )
                })}
              </div>
            </Box>
          </Stack>
        </div>
        <Box hiddenFrom="md" className="relative">
          <Carousel
            getEmblaApi={setEmbla}
            withControls={false}
            // loop
            height="100%"
            withIndicators={true}
            emblaOptions={{ loop: true }}
            classNames={{
              indicators: "justify-center mb-1",
              indicator: "!w-0.5 !h-0.5",
            }}
          >
            {unit.images.map((image, i) => {
              return (
                <Carousel.Slide key={i}>
                  <div className="relative h-[400px] w-full">
                    {loadedImages.has(i) ? (
                      <img
                        decoding="async"
                        loading="lazy"
                        src={image.image_path}
                        alt={image.alt}
                        className="h-full w-full object-cover"
                        fetchPriority={i === 0 ? "high" : "auto"}
                      />
                    ) : (
                      <div className="h-full w-full animate-pulse bg-gray-200" />
                    )}
                  </div>
                </Carousel.Slide>
              )
            })}
          </Carousel>
          <Group wrap="nowrap" className="absolute right-1 bottom-3 z-10">
            <Button
              onClick={() => {
                setOpened(true)
              }}
              color="white"
              c={"dark"}
              className="duration-300 hover:bg-white/90"
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
                className="duration-300 hover:bg-white/90"
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
