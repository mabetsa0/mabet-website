import dayjs from "dayjs"

// get days
export const getDaysBetweenDates = (
  startDate: string | null,
  endDate: string | null
) => {
  if (!startDate || !endDate) return []

  const days = []

  const __startDate = new Date(startDate)
  let currentDate = __startDate
  const __endDate = new Date(endDate)

  while (__startDate <= __endDate) {
    days.push(dayjs(new Date(currentDate)).format("YYYY-MM-DD"))

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return days
}
