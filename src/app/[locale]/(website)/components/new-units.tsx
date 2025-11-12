import { getTopRatedUnits } from "../helpers/get-top-rated-units"
import NewUnitsCarousel from "./new-units-carousel"

const NewUnits = async () => {
  const data = await getTopRatedUnits()
  return <NewUnitsCarousel data={data} />
}

export default NewUnits
