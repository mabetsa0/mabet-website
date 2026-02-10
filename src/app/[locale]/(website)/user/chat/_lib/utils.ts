import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

export const formateMessageDate = (date: Date) => {
  return dayjs(date).format("hh:mm A")
}
