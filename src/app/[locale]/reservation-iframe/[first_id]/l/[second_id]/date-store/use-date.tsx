"use client"

import dayjs from "dayjs"
import { create } from "zustand"

type DateStore = {
  dates: {
    from: null | Date
    to: null | Date
  }
  updateDates: (dates: { from: null | Date; to: null | Date }) => void
}

export const useDate = create<DateStore>((set) => ({
  dates: {
    from: dayjs().toDate(),
    to: dayjs().add(1, "days").toDate(),
  },

  updateDates: (dates) =>
    set({
      dates,
    }),
}))
