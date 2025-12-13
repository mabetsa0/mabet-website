/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react"
import dynamicImport from "next/dynamic"
import { notFound } from "next/navigation"
import { Box, Stack } from "@mantine/core"
import axios from "axios"
import ChatModal from "@/app/[locale]/(website)/user/chat/_components/chat-modal"
import { getCachedTokenFromCookie } from "@/app/[locale]/(website)/user/chat/_lib/get-cached-access-token"
import Footer from "@/components/common/footer"
import DataLayer from "@/components/data-layer"
import MapWrapper from "@/components/map-wrapper"
import TrackBayut from "@/components/track-bayut"
import { SEO } from "@/services/get-seo"
import ImageGallery from "./components/image-gallery"
import MobileCreateBookingButton from "./components/mobile-create-booking-button"
import MobileUnitDescription from "./components/mobile-unit-description"
import Reviews from "./components/reviews"
import UnitSegmentedControl from "./components/segment-contorl"
import TabConditionRender from "./components/tab-condition-render"
import TrackPrivate from "./components/track-private-links"
import UnitConditions from "./components/unit-conditions"
import UnitDescription from "./components/unit-description"
import { UnitContextProvider } from "./context/unit-context"
import { GetUnit } from "./get-unit"

const ReservationDetails = dynamicImport(
  () => import("./components/reservation-details")
)
const VideoSlider = dynamicImport(async () => {
  return import("./components/video")
})
const ImageSlider = dynamicImport(async () => {
  return import("./components/image-slider")
})
// const MyGoogleMap = dynamicImport(async () => import("./components/google-map"))

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

const page = async (props: Props) => {
  const params = await props.params
  try {
    const unit = await GetUnit({ slug: params.slug })
    const accessToken = await getCachedTokenFromCookie()

    return (
      <UnitContextProvider value={unit}>
        <ImageGallery />
        <Suspense>
          <ImageSlider />
        </Suspense>
        <Suspense>
          <VideoSlider />
        </Suspense>
        <section className="relative min-h-[50vh] bg-white max-md:-mt-1 max-md:rounded-t-4xl">
          <UnitSegmentedControl />
          <div className="container">
            <div className="flex gap-4 max-md:flex-col md:mb-2">
              <UnitDescription />
              <Box visibleFrom="md" className="shrink-0 md:w-[500px]">
                <ReservationDetails />
              </Box>
            </div>
            <Stack gap={"lg"} mb={"xl"}>
              <TabConditionRender tab="Default">
                <MobileUnitDescription />
              </TabConditionRender>
              <TabConditionRender tab="Reviews">
                <Reviews />
              </TabConditionRender>
              <TabConditionRender tab="Map">
                <MapWrapper
                  lat={+atob(atob(unit.mla))}
                  lng={+atob(atob(unit.mlg))}
                />
              </TabConditionRender>
              <TabConditionRender tab="Terms">
                <UnitConditions {...unit} />
              </TabConditionRender>
            </Stack>
          </div>
        </section>
        <TrackPrivate />
        <Suspense>
          <TrackBayut />
        </Suspense>
        <Suspense>
          <DataLayer />
        </Suspense>
        <Suspense>
          <MobileCreateBookingButton />
        </Suspense>
        <Footer />
        {accessToken ? (
          <ChatModal
            accessToken={accessToken}
            topicId={unit.id.toString()}
            partnerId={unit.partner.id.toString()}
          />
        ) : null}
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
