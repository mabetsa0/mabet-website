// formate date
export const formateDate = (date: Date | null) => {
  if (!date) return ""
  const data = new Date(date)

  const arrayOfDateValues = data
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")

  return [arrayOfDateValues[2], arrayOfDateValues[0], arrayOfDateValues[1]].join("-")
}
