"use client"

import { useQuery } from "@tanstack/react-query"
import Mabet from "@/services"
import { UnitResponse } from "../../../units/[slug]/@types"

export const useUnitById = (unitId: string | number | null) => {
  return useQuery({
    queryKey: ["unit", unitId],
    queryFn: async () => {
      const response = await Mabet.get<UnitResponse>(`/units/${unitId}`)
      return response.data.data.unit
    },
    enabled: !!unitId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
