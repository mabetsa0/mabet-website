import dayjs from "dayjs"
import { parseAsIsoDate, useQueryStates } from "nuqs"

export const useQueryDates = () => {
  return useQueryStates(
    {
      from: parseAsIsoDate.withDefault(dayjs().toDate()),
      to: parseAsIsoDate.withDefault(dayjs().add(1, "days").toDate()),
    },
    {
      history: "replace",
    }
  )
}
