/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation"

import axios from "axios"

import { Box } from "@mantine/core"
import { GetUnit } from "@/app/[locale]/(website)/units/[slug]/get-unit"
import { UnitContextProvider } from "@/app/[locale]/(website)/units/[slug]/context/unit-context"
import Reservation from "./components/reservation"

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
        <Box className="max-w-[500px] mx-auto">
          <Reservation />
        </Box>
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
