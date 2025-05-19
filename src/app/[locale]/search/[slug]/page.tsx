import { notFound } from "next/navigation"

import axios from "axios"
import { UnitContextProvider } from "./context/unit-context"
import { GetUnit } from "./get-unit"
import ImageGallery from "./components/image-gallery"

import dynamic from "next/dynamic"
import { Suspense } from "react"
const VideoSlider = dynamic(async () => {
  return import("./components/video")
})
const ImageSlider = dynamic(async () => {
  return import("./components/image-slider")
})

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
    return (
      <UnitContextProvider value={unit}>
        <ImageGallery />
        <Suspense>
          <ImageSlider />
        </Suspense>
        <Suspense>
          <VideoSlider />
        </Suspense>
        <section className="relative z-10 bg-white  ">
          <div className="container">
            <div className="flex gap-4 max-lg:flex-col">
              <div className="lg:w-2/3">right</div>
              <div className="lg:w-1/3">left</div>
            </div>
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
