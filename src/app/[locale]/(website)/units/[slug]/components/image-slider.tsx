/* eslint-disable @next/next/no-img-element */
"use client"
import { Carousel } from "@mantine/carousel"
import { ActionIcon, Group, Modal } from "@mantine/core"
import { X } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import { useUnitData } from "../context/unit-context"
import ShareButton from "./share-button"

const ImageSlider = () => {
  const unitData = useUnitData()
  const [opened, setOpened] = useQueryState(
    "image-slider",
    parseAsBoolean.withDefault(false)
  )
  const close = () => {
    setOpened(false)
  }

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
            // loop
            height="100%"
            withIndicators
            emblaOptions={{ loop: true }}
          >
            {unitData.images.map((image) => {
              return (
                <Carousel.Slide key={image.image_path}>
                  <div className="relative flex h-[calc(100vh-80px)] items-center justify-center p-2 lg:p-5">
                    <img
                      src={image.image_path}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full max-w-[70vw] object-contain"
                    />
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
