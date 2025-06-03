import Mabet from "@/services"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import { BusyDaysResponse, ClosedDate } from "../@types"
import { useState } from "react"

// get 2 month range
export const getDatesRange = (from: Date) => {
  const lastDay = new Date(from.getFullYear(), from.getMonth() + 2, 0)

  const firstDay = new Date(from.getFullYear(), from.getMonth(), 0)

  return [
    dayjs(firstDay).format("YYYY-MM-DD"),
    dayjs(lastDay).format("YYYY-MM-DD"),
  ]
}

function filterDates(dates: string[]) {
  // Convert date strings to Date objects
  const dateObjects = dates.map((date) => ({
    original: date,
    dateObj: new Date(date),
  }))

  // Filter the dates by checking if they have a previous consecutive date
  return dateObjects
    .filter((item, index, arr) => {
      if (index === 0) return true // The first item has no previous date
      const prevDate = new Date(arr[index - 1].dateObj)
      prevDate.setDate(prevDate.getDate() + 1) // Move to the next day
      return item.dateObj.getTime() === prevDate.getTime()
    })
    .map((item) => item.original)
}

const useBusyDays = ({
  id,
  startDate,
}: {
  id: number
  startDate: Date | null
}) => {
  const [__startDate, setStartDate] = useState(startDate ?? new Date())
  const [firstDay, lastDay] = getDatesRange(__startDate)

  const query = useQuery({
    queryKey: ["busy-days", id, __startDate?.toISOString()],
    enabled: !!__startDate,
    queryFn: async () => {
      const response = await Mabet.get<BusyDaysResponse>(
        `/units/${id}/check-dates?from=${firstDay}&to=${lastDay}`
      )
      return response.data.data.closed_dates
    },
    staleTime: Infinity,
  })

  const closedDates = query.data
    ? query.data
        .filter((e: ClosedDate) => e.type === "closed")
        .map((e) => e.date)
    : []
  // const busyDays = filterDates(closedDates)
  const busyDays = closedDates
  const featuredDates = query.data
    ? query.data.filter((e: ClosedDate) => e.type === "available")
    : []

  const handleStartDateChange = (date: Date) => {
    setStartDate(() => date)
  }
  return { busyDays, featuredDates, handleStartDateChange }
}

export default useBusyDays
