/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation"

import axios from "axios"

import { Box } from "@mantine/core"
import { GetUnit } from "@/app/[locale]/(website)/units/[slug]/get-unit"
import { UnitContextProvider } from "@/app/[locale]/(website)/units/[slug]/context/unit-context"
import Reservation from "./components/reservation"
import Mabet from "@/services"
import NafathModal from "./components/nafath"

type Props = {
  params: Promise<{
    first_id: string
    second_id: string
  }>
  searchParams: Promise<{ [key: string]: string }>
}

const page = async (props: Props) => {
  const params = await props.params
  try {
    const { data } = await Mabet.get<{
      data: { unit_id: number }
      message: null
      success: true
    }>(`/iframe-reservations/${params.first_id}/l/${params.second_id}`)
    console.log("🚀 ~ page ~ data:", data)
    const unit = await GetUnit({
      slug: data.data.unit_id + "",
    })

    return (
      <UnitContextProvider value={unit}>
        <Box className="max-w-[500px] mx-auto">
          <Reservation />
          <NafathModal />
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
