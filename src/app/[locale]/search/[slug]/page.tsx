import { notFound } from "next/navigation"

import axios from "axios"
import { UnitContextProvider } from "./context/unit-context"
import { GetUnit } from "./get-unit"
import ImageGallery from "./components/image-gallery"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { getTranslations } from "next-intl/server"
import { Divider, Stack, Space } from "@mantine/core"
import { QrCode } from "lucide-react"
import Features from "./components/features"
import AboutUnit from "./components/about-unit"
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
        <section className="relative z-10 bg-white  ">
          <div className="container">
            <div className="flex gap-4 max-md:flex-col">
              <Stack className="md:w-2/3">
                <Space hiddenFrom="md" />
                <h1 className="text-h4 font-bold md:hidden">{unit.name}</h1>

                <Stack>
                  <h3 className="text-h4 md:text-h3 font-medium">
                    {t("unit.details")}
                  </h3>
                  <Stack gap={"xs"} className="text-[#767676]">
                    <p>{unit.details}</p>
                    <p>{unit.licence.license_text}</p>
                    <p className="flex gap-0.5">
                      <QrCode strokeWidth={1.25} /> {unit.code}
                    </p>
                  </Stack>
                </Stack>
                <Divider />

                <Space />
                <Space />

                <Features />
                <Divider />

                <AboutUnit {...unit} />
              </Stack>
              <div className="md:w-1/3"></div>
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
