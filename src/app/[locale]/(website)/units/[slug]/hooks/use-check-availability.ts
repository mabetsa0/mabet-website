import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { FullUnitData } from "../@types"
import { GetUnitAvailability } from "../get-unit-availability"
import { useQueryDates } from "./use-query-dates"

const useCheckAvailability = (unit: FullUnitData) => {
  const [{ from, to }] = useQueryDates()
  return useQuery({
    queryKey: [
      "availability",
      unit.slug,
      from.toDateString(),
      to.toDateString(),
    ],
    queryFn: async () => {
      return await GetUnitAvailability({
        id: unit.id,
        params: {
          from: dayjs(from).format("YYYY-MM-DD"),
          to: dayjs(to).format("YYYY-MM-DD"),
        },
      })
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}

export default useCheckAvailability
