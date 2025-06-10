import dayjs from "dayjs"

// formate date
export const formateDate = (date: Date | null) => {
  if (!date) return ""
  const data = dayjs(date).format("YYYY-MM-DD")

  return data
}
