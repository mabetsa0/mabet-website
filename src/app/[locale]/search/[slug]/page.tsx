/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation"

import axios from "axios"
import ImageGallery from "./components/image-gallery"
import { UnitContextProvider } from "./context/unit-context"
import { GetUnit } from "./get-unit"

import { torism } from "@/assets"
import { Box, Divider, Group, Loader, Space, Stack } from "@mantine/core"
import { QrCode } from "lucide-react"
import { getTranslations } from "next-intl/server"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import AboutUnit from "./components/about-unit"
import Features from "./components/features"
import Reviews from "./components/reviews"
import UnitConditions from "./components/unit-conditions"
const ReservationDetails = dynamic(
  () => import("./components/reservation-details")
)
const VideoSlider = dynamic(async () => {
  return import("./components/video")
})
const ImageSlider = dynamic(async () => {
  return import("./components/image-slider")
})
const MyGoogleMap = dynamic(async () => import("./components/google-map"))

type Props = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{ [key: string]: string }>
}

const page = async (props: Props) => {
  const params = await props.params
  try {
    const unit = await GetUnit({ slug: params.slug })
    const t = await getTranslations()
    return (
      <UnitContextProvider value={unit}>
        <ImageGallery />
        <Suspense>
          <ImageSlider />
        </Suspense>
        <Suspense>
          <VideoSlider />
        </Suspense>
        <section className="relative  bg-white  ">
          <div className="container">
            <div className="flex gap-4 max-md:flex-col">
              <Stack className="w-full">
                <Space hiddenFrom="md" />
                <h1 className="text-h4 font-bold md:hidden">{unit.name}</h1>

                <Stack>
                  <h3 className="text-h4 md:text-h3 font-medium">
                    {t("unit.details")}
                  </h3>
                  <Stack gap={"xs"} className="text-[#767676]">
                    <p>{unit.details}</p>

                    <p className="flex gap-0.5">
                      <QrCode strokeWidth={1.25} /> {unit.code}
                    </p>
                    <Group className="border w-fit rounded-md py-0.5 px-1.5 border-primary">
                      <img className="w-3" src={torism.src} alt="licence" />
                      <p>{unit.licence.license_text}</p>
                    </Group>
                  </Stack>
                </Stack>
                <Divider />
                <Space />
                <Space />
                <Features />
                <Divider />
                <AboutUnit {...unit} />
                <Space />
              </Stack>
              <Box visibleFrom="md" className="md:w-[500px] shrink-0">
                <ReservationDetails />
              </Box>
            </div>
            <Stack gap={"lg"}>
              <Divider />
              <Reviews />
              <Space />
              <Suspense fallback={<Loader />}>
                <MyGoogleMap
                  lat={+atob(atob(unit.mla))}
                  lng={+atob(atob(unit.mlg))}
                />
              </Suspense>
              <Space />

              <Space />

              <UnitConditions {...unit} />
            </Stack>
          </div>
        </section>
      </UnitContextProvider>
    )
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound()
    }
    return <div>ERROR</div>
  }
}

export default page
