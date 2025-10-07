import { PRIVATE_LINK } from "@/config"

export const getIsPrivate = (id: string) => {
  if (typeof window !== "undefined") {
    const privateUnit = window.localStorage.getItem(PRIVATE_LINK)
    if (privateUnit) {
      const value = JSON.parse(privateUnit) as { unit_id: number; date: Date }

      if (value.unit_id == Number(id) && new Date(value.date) > new Date()) {
        return true
      }
    }
  }
  return false
}
