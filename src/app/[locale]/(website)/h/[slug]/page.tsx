import React from "react"
import { HostResponse } from "@/@types/hot-response"
import Mabeet from "@/api"
import Footer from "@/components/common/footer"
import Hero from "./components/hero"
import Reviews from "./components/reviews"
import Units from "./components/units"

type Props = {
  params: Promise<{
    slug: string
  }>
}

const Page = async (props: Props) => {
  const { slug } = await props.params

  const response = await Mabeet.get<HostResponse>(`/units/${slug}/host-page`)
  const host = response.data.data.host

  return (
    <>
      <Hero host={host} />
      <Units units={host.units} />
      <Reviews unitId={slug} />
      <Footer />
    </>
  )
}

export default Page
