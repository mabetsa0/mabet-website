/* eslint-disable @next/next/no-img-element */
"use client"
import { Carousel } from "@mantine/carousel"
import { ActionIcon, Group, Loader, Modal } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { X } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import Mabet from "@/services"
import { useUnitData } from "../context/unit-context"
import ShareButton from "./share-button"
import VideoPlayer from "./video-player"

export interface UnitMediaResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  media: Media[]
}

export interface Media {
  id: number
  type: string
  url: string
}

const VideoSlider = () => {
  const unitData = useUnitData()
  const [opened, setOpened] = useQueryState(
    "video",
    parseAsBoolean.withDefault(false)
  )
  const close = () => {
    setOpened(false)
  }

  const { data, status } = useQuery({
    queryKey: ["video", unitData.id],
    enabled: unitData.has_videos,
    queryFn: async () => {
      const response = await Mabet.get<UnitMediaResponse>(
        `/units/${unitData.id}/media?type=videos`
      )
      return response.data.data.media
    },
  })

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
              error
            </div>
          ) : null}
          {status === "success" ? (
            <Carousel
              emblaOptions={{ loop: true }}
              height="100%"
              withIndicators
            >
              {data.map((video) => {
                return (
                  <Carousel.Slide key={video.url}>
                    <div className="relative flex h-[calc(100vh-80px)] items-center justify-center p-2 lg:p-5">
                      <VideoPlayer src={video.url} />
                    </div>
                  </Carousel.Slide>
                )
              })}
            </Carousel>
          ) : null}
        </div>
      </Modal>
    </>
  )
}

export default VideoSlider
