import React from "react"
import { getSpecialUnits } from "../helpers/get-special-units"
import SpecialUnitsCarousel from "./special-units-carousel"

type Props = {}

const SpecialUnits = async (props: Props) => {
  const specialUnits = await getSpecialUnits()
  return <SpecialUnitsCarousel data={specialUnits} />
}

export default SpecialUnits
