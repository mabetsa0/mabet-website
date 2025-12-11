"use client"

import React from "react"
import { useLocale, useTranslations } from "next-intl"
import dayjs from "dayjs"
import "dayjs/locale/ar"
import "dayjs/locale/en"
import calendar from "dayjs/plugin/calendar"
import relativeTime from "dayjs/plugin/relativeTime"

// Configure dayjs plugins
dayjs.extend(relativeTime)
dayjs.extend(calendar)

type Props = {
  date: Date
}

const DateIndicator = ({ date }: Props) => {
  const locale = useLocale()
  const t = useTranslations("chat")

  // Set dayjs locale based on current locale
  dayjs.locale(locale)

  const formatDate = (dateString: Date) => {
    const dateObj = dayjs(dateString)
    const now = dayjs()

    // Check if it's today
    if (dateObj.isSame(now, "day")) {
      return t("date.today")
    }

    // Check if it's yesterday
    const yesterday = now.subtract(1, "day")
    if (dateObj.isSame(yesterday, "day")) {
      return t("date.yesterday")
    }

    // Check if it's within the same week (but not today/yesterday)
    if (dateObj.isSame(now, "week")) {
      return dateObj.format("dddd") // Day name in current locale
    }

    // For older dates, show formatted date
    return locale === "ar"
      ? dateObj.format("DD MMMM YYYY")
      : dateObj.format("MMMM DD, YYYY")
  }

  return (
    <div className="sticky top-0 flex justify-center">
      <div className="text-foreground/80 w-[144px] rounded-md border border-[#EEEEEE] bg-white py-0.5 text-center text-xs font-semibold">
        {formatDate(date)}
      </div>
    </div>
  )
}

export default DateIndicator
