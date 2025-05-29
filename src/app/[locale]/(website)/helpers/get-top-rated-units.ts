import { UnitsResponse } from "@/@types"
import Mabet from "@/services"
import React from "react"

export const getTopRatedUnits = React.cache(async () => {
  const response = await Mabet.get<UnitsResponse>("/home/best-rated-units")
  return response.data.data.units
})
