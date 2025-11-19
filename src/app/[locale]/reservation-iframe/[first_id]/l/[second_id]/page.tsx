/* eslint-disable @next/next/no-img-element */
import { Box } from "@mantine/core"
import axios from "axios"
import { UnitContextProvider } from "@/app/[locale]/(website)/units/[slug]/context/unit-context"
import { GetUnit } from "@/app/[locale]/(website)/units/[slug]/get-unit"
import Mabet from "@/services"
import NafathModal from "./components/nafath"
import Reservation from "./components/reservation"

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
    const unit = await GetUnit({
      slug: data.data.unit_id + "",
    })

    return (
      <UnitContextProvider value={unit}>
        <Box className="mx-auto max-w-[500px]">
          <Reservation />
          <NafathModal />
        </Box>
      </UnitContextProvider>
    )
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return <div>INVALID REQUEST</div>
    }
    return <div>ERROR</div>
  }
}

export default page
