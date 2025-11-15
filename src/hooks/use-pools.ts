import { useQuery } from "@tanstack/react-query"
import { getPools } from "@/services/lists"

export const usePools = () => {
  return useQuery({
    queryKey: ["pools"],
    staleTime: Infinity,

    queryFn: async () => {
      const response = await getPools()
      return response.data.amenities.map((ele) => ({
        label: ele.name,
        value: ele.id + "",
      }))
    },
  })
}
