import { apiV2_1 } from "@/services"
import { UnitAvailabilityResponse } from "./@types"

export const GetUnitAvailability = async ({
  id,
  params,
}: {
  id: string | number
  params: Record<string, string> | URLSearchParams
}) => {
  const response = await apiV2_1.get<UnitAvailabilityResponse>(
    `/units/${id}/availability`,
    { params }
  )
  return response.data.data.prices
}
