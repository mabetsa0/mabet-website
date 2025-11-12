import React from "react"
import { getSpecialUnits } from "../helpers/get-special-units"
import SpecialUnitsCarousel from "./special-units-carousel"

const SpecialUnits = async () => {
  const specialUnits = await getSpecialUnits()
  return <SpecialUnitsCarousel data={specialUnits} />
}

export default SpecialUnits
