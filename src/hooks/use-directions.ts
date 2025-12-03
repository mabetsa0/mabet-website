import { useQuery } from "@tanstack/react-query"
import { getDirections } from "@/services/lists"

export const useDirections = () => {
  return useQuery({
    queryKey: ["directions"],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await getDirections()
      return response.data.directions.map((ele) => ({
        label: ele.name,
        value: ele.id + "",
      }))
    },
  })
}
