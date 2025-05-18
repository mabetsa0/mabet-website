import Mabet from "@/services"
import { UnitResponse } from "./@types"

export const GetUnit = async ({ slug }: { slug: string }) => {
  const response = await Mabet.get<UnitResponse>(`/units/${slug}`)
  return response.data.data.unit
}
