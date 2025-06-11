import { getTopRatedUnits } from "../helpers/get-top-rated-units"
import NewUnitsCarousel from "./new-units-carousel"
import SpecialUnitsCarousel from "./special-units-carousel"

type Props = {}

const NewUnits = async (props: Props) => {
  const data = await getTopRatedUnits()
  return <NewUnitsCarousel data={data} />
}

export default NewUnits
