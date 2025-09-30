import { PRIVATE_LINK } from "@/config"
import { useEffect, useState } from "react"
import { useUnitData } from "../context/unit-context"

export const useIsPrivate = () => {
  const [isPrivate, setIsPrivate] = useState(false)
  const { id } = useUnitData()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const privateUnit = window.localStorage.getItem(PRIVATE_LINK)
      if (privateUnit) {
        const value = JSON.parse(privateUnit) as { unit_id: string; date: Date }

        if (value.unit_id == String(id) && new Date(value.date) < new Date()) {
          setIsPrivate(true)
        }
      }
    }
  }, [])

  return isPrivate
}
