import { useQuery } from "@tanstack/react-query"
import { getRegions } from "@/services/lists"

export const useRegions = (cityId: string) => {
  return useQuery({
    queryKey: ["regions", cityId],
    staleTime: Infinity,
    enabled: !!cityId,
    queryFn: async () => {
      const response = await getRegions(cityId!)
      return response.data.districts.map((ele) => ({
        label: ele.name,
        value: ele.id + "",
      }))
    },
  })
}
