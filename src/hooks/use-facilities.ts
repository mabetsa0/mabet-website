import { useQuery } from "@tanstack/react-query"
import { getFacilities } from "@/services/lists"

export const useFacilities = () => {
  return useQuery({
    queryKey: ["facilities"],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await getFacilities()
      return response.data.facilities.map((ele) => ({
        label: ele.name,
        value: ele.id + "",
      }))
    },
  })
}
