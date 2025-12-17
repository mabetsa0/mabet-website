/* eslint-disable @next/next/no-img-element */
"use client"
import { useTranslations } from "next-intl"
import { Carousel } from "@mantine/carousel"
import { ActionIcon, Group, Loader, Modal } from "@mantine/core"
import { X } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import useUnitMedia from "@/hooks/use-unit-media"
import { useUnitData } from "../context/unit-context"
import ShareButton from "./share-button"
import VideoPlayer from "./video-player"

const VideoSlider = () => {
  const t = useTranslations("video")
  const unitData = useUnitData()
  const [opened, setOpened] = useQueryState(
    "video",
    parseAsBoolean.withDefault(false)
  )
  const close = () => {
    setOpened(false)
  }

  const { data, status, error } = useUnitMedia({
    unitId: unitData.id,
    type: "videos",
  })

  // Filter out videos with empty URLs
  const validVideos =
    data?.filter((video) => video.url && video.url.trim() !== "") ?? []

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
          inner: "rtl:-ms-1 ",
          overlay: "backdrop-blur",
          content: "bg-transparent",
        }}
      >
        <div className="relative">
          <Group justify="space-between">
            <ActionIcon onClick={close} color="dark" size={"lg"}>
              <X strokeWidth={1.25} />
            </ActionIcon>
            <ShareButton variant="filled" />
          </Group>
          {status === "pending" ? (
            <div className="relative flex h-[calc(100vh-80px)] items-center justify-center p-2 lg:p-5">
              <Loader />
            </div>
          ) : null}
          {status === "error" ? (
            <div className="relative flex h-[calc(100vh-80px)] items-center justify-center p-2 lg:p-5">
              <div className="text-center">
                <p className="text-lg font-semibold text-red-500">
                  {t("load-error-title")}
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  {error instanceof Error
                    ? error.message
                    : t("load-error-message")}
                </p>
              </div>
            </div>
          ) : null}
          {status === "success" && validVideos.length > 0 ? (
            <Carousel
              emblaOptions={{ loop: true }}
              height="100%"
              withIndicators
            >
              {validVideos.map((video) => {
                return (
                  <Carousel.Slide key={video.id || video.url}>
                    <div className="relative flex h-[calc(100vh-80px)] items-center justify-center p-2 lg:p-5">
                      <VideoPlayer src={video.url} />
                    </div>
                  </Carousel.Slide>
                )
              })}
            </Carousel>
          ) : status === "success" && validVideos.length === 0 ? (
            <div className="relative flex h-[calc(100vh-80px)] items-center justify-center p-2 lg:p-5">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-400">
                  {t("no-videos-title")}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {t("no-videos-message")}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  )
}

export default VideoSlider
