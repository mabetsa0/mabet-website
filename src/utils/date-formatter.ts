export const formateDate = (date: Date | string,locale?:string) => {
  return new Date(date).toLocaleDateString(locale ||"ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
