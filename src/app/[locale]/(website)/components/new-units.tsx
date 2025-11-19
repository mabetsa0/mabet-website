import { getTranslations } from "next-intl/server"
import { getTopRatedUnits } from "../helpers/get-top-rated-units"
import UnitsCarousel from "./units-carousel"

const NewUnits = async () => {
  const data = await getTopRatedUnits()
  const t = await getTranslations("home.new-units")
  return (
    <UnitsCarousel
      data={data}
      title={t("title")}
      description={t("desciption")}
    />
  )
}

export default NewUnits
