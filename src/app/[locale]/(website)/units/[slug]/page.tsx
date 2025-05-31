/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation"

import axios from "axios"
import ImageGallery from "./components/image-gallery"
import { UnitContextProvider } from "./context/unit-context"
import { GetUnit } from "./get-unit"

import { Box, Loader, Stack } from "@mantine/core"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import Reviews from "./components/reviews"
import UnitSegmentedControl from "./components/segment-contorl"
import TabConditionRender from "./components/tab-condition-render"
import UnitConditions from "./components/unit-conditions"
import UnitDescription from "./components/unit-description"
import MobileUnitDescription from "./components/mobile-unit-description"
import MobileCreateBookingButton from "./components/mobile-create-booking-button"
import TrackBayut from "@/components/track-bayut"
import DataLayer from "@/components/data-layer"
import { SEO } from "@/services/get-seo"
import Footer from "@/components/common/footer"
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

export async function generateMetadata(args: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const params = await args.params
  const searchParams = await args.searchParams

  try {
    return await SEO("/units/" + params.slug, searchParams)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        robots: "noindex",
      }
    }
  }
}

export const revalidate = 3600
const page = async (props: Props) => {
  const params = await props.params
  try {
    const unit = await GetUnit({ slug: params.slug })

    return (
      <UnitContextProvider value={unit}>
        <ImageGallery />
        <Suspense>
          <ImageSlider />
        </Suspense>
        <Suspense>
          <VideoSlider />
        </Suspense>
        <section className="relative max-md:rounded-t-4xl max-md:-mt-1  bg-white min-h-[100vh]  ">
          <UnitSegmentedControl />
          <div className="container">
            <div className="flex gap-4 max-md:flex-col md:mb-2">
              <UnitDescription />
              <Box visibleFrom="md" className="md:w-[500px] shrink-0">
                <ReservationDetails />
              </Box>
            </div>
            <Stack gap={"lg"}>
              <TabConditionRender tab="Default">
                <MobileUnitDescription />
              </TabConditionRender>
              <TabConditionRender tab="Reviews">
                <Reviews />
              </TabConditionRender>
              <TabConditionRender tab="Map">
                <Suspense fallback={<Loader />}>
                  <MyGoogleMap
                    lat={+atob(atob(unit.mla))}
                    lng={+atob(atob(unit.mlg))}
                  />
                </Suspense>
              </TabConditionRender>
              <TabConditionRender tab="Terms">
                <UnitConditions {...unit} />
              </TabConditionRender>
            </Stack>
          </div>
        </section>
        <Suspense>
          <TrackBayut />
        </Suspense>
        <Suspense>
          <DataLayer />
        </Suspense>
        <MobileCreateBookingButton />
        <Footer />
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
