/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react"
import { Carousel } from "@mantine/carousel"
import { ActionIcon, Group, Modal } from "@mantine/core"
import { EmblaCarouselType } from "embla-carousel"
import { X } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import { useUnitData } from "../context/unit-context"
import ShareButton from "./share-button"

const ImageSlider = () => {
  const unitData = useUnitData()
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0])) // Load first image immediately
  const [opened, setOpened] = useQueryState(
    "image-slider",
    parseAsBoolean.withDefault(false)
  )
  const close = () => {
    setOpened(false)
  }

  // Track which slides are visible and load their images
  useEffect(() => {
    if (!embla || !opened) return

    const updateLoadedImages = () => {
      const selectedIndex = embla.selectedScrollSnap()
      const slidesInView = embla.slidesInView()

      setLoadedImages((prev) => {
        const newSet = new Set(prev)
        // Load current slide
        newSet.add(selectedIndex)
        // Load adjacent slides for smooth transitions
        if (selectedIndex > 0) newSet.add(selectedIndex - 1)
        if (selectedIndex < unitData.images.length - 1)
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
  }, [embla, unitData.images.length, opened])

  // Reset loaded images when modal opens
  useEffect(() => {
    if (opened) {
      setLoadedImages(new Set([0]))
    }
  }, [opened])

  return (
    <>
      <Modal
        fullScreen
        opened={opened}
        withCloseButton={false}
        onClose={close}
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
        className="bg-transparent"
        classNames={{
          inner: "rtl:md:-ms-1 ",
          overlay: "backdrop-blur",
          content: "bg-transparent",
        }}
      >
        <div className="relative">
          <Group justify="space-between">
            <ActionIcon onClick={close} color="dark" size={"xl"}>
              <X strokeWidth={1.25} />
            </ActionIcon>
            <ShareButton variant="filled" />
          </Group>
          <Carousel
            getEmblaApi={setEmbla}
            // loop
            height="100%"
            withIndicators
            emblaOptions={{ loop: true }}
          >
            {unitData.images.map((image, index) => {
              return (
                <Carousel.Slide key={image.image_path}>
                  <div className="relative flex h-[calc(100vh-80px)] items-center justify-center p-2 lg:p-5">
                    {loadedImages.has(index) ? (
                      <img
                        src={image.image_path}
                        alt={image.alt}
                        className="h-full w-full max-w-[70vw] object-contain"
                        decoding="async"
                        fetchPriority={index === 0 ? "high" : "auto"}
                        draggable="false"
                        sizes="(max-width: 1024px) 100vw, 70vw"
                      />
                    ) : (
                      <div className="h-full w-full max-w-[70vw] animate-pulse bg-gray-200" />
                    )}
                  </div>
                </Carousel.Slide>
              )
            })}
          </Carousel>
        </div>
      </Modal>
    </>
  )
}

export default ImageSlider
