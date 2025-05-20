"use client"

import React, { useMemo } from "react"

import { Circle, GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import { Loader, Stack, Text } from "@mantine/core"
import { useTranslations } from "next-intl"

const containerStyle = {
  height: "450px",
}

function MyGoogleMapComponent({ lat, lng }: { lat: number; lng: number }) {
  const center = useMemo(() => ({ lat, lng }), [lat, lng])
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBicgse6EO9mo2c-_rE4rW7_xe2FcgewhQ",
  })
  const t = useTranslations()

  return (
    <div className="container">
      <Stack>
        <div>
          <h3 className="text-h4 md:text-h3 font-medium">
            {t("unit.location-title")}
          </h3>
          <Text maw={550} c={"#767676"}>
            {t("unit.location-description")}
          </Text>
        </div>
        {isLoaded ? (
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
        )}
      </Stack>
    </div>
  )
}

export default React.memo(MyGoogleMapComponent)
