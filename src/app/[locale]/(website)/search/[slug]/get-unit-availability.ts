import Mabet from "@/services"
import { UnitAvailabilityResponse } from "./@types"

export const GetUnitAvailability = async ({
  id,
  params,
}: {
  id: string | number
  params: Record<string, string> | URLSearchParams
}) => {
  const response = await Mabet.get<UnitAvailabilityResponse>(
    `/units/${id}/availability`,
    { params }
  )
  return response.data.data.prices
}
