import { UnitsResponse } from "@/@types"
import Mabet from "@/services"
import React from "react"

export const getSpecialUnits = React.cache(async () => {
  const response = await Mabet.get<UnitsResponse>("/home/special-apartments")
  return response.data.data.units
})
