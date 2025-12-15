import React from "react"
import { getTranslations } from "next-intl/server"
import { getSpecialUnits } from "../helpers/get-special-units"
import UnitsCarousel from "./units-carousel"

const SpecialUnits = async () => {
  const specialUnits = await getSpecialUnits()
  const t = await getTranslations("home.special-units")

  return (
    <UnitsCarousel
      title={t("title")}
      description={t("desciption")}
      data={specialUnits}
    />
  )
}

export default SpecialUnits
