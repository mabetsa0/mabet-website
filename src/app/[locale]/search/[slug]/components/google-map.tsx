"use client"

import React, { useMemo } from "react"

import { Circle, GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { Loader } from "@mantine/core"

const containerStyle = {
  height: "450px",
}

function MyGoogleMapComponent({ lat, lng }: { lat: number; lng: number }) {
  const center = useMemo(() => ({ lat, lng }), [lat, lng])
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBicgse6EO9mo2c-_rE4rW7_xe2FcgewhQ",
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      options={{
        disableDefaultUI: true,
      }}
      zoom={13}
      clickableIcons={false}
      mapContainerClassName=" w-full  mx-auto "
    >
      <Circle center={center} radius={2000} />
    </GoogleMap>
  ) : (
    <div className="flex min-h-[350px] items-center justify-center">
      <Loader />
    </div>
  )
}

export default React.memo(MyGoogleMapComponent)
