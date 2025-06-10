"use client"

import { create } from "zustand"

type NafathStore = {
  opened: boolean
  onClose: () => void
  onOpen: () => void
  national_id: string
  number: string
  time: number
  update: (
    args: Partial<{ national_id: string; number: string; time: number }> | null
  ) => void
}

export const useNafath = create<NafathStore>((set) => ({
  opened: false,
  onClose: () => set({ opened: false }),
  onOpen: () => set({ opened: true }),
  national_id: "",
  number: "",
  time: 0,
  update: (args) => {
    set(
      args
        ? { ...args }
        : {
            national_id: "",
            number: "",
            time: 0,
          }
    )
  },
}))
