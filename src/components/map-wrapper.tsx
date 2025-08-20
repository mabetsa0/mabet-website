"use client"

import dynamic from "next/dynamic"
import { Loader } from "@mantine/core"
import { Suspense } from "react"

// Dynamic import of Google Map (no SSR)
const MyGoogleMap = dynamic(() => import("../app/[locale]/(website)/units/[slug]/components/google-map"), {
  ssr: false,
})

export default function MapWrapper({
  lat,
  lng,
}: {
  lat: number
  lng: number
}) {
  return (
    <Suspense fallback={<Loader />}>
      <MyGoogleMap lat={lat} lng={lng} />
    </Suspense>
  )
}