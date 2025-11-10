import { PRIVATE_LINK } from "@/config"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

type PrivateItem = {
  unit_id: number
  date: Date
}

export const useIsPrivate = () => {
  const [isPrivate, setIsPrivate] = useState(false)
  const { slug: id } = useParams() as { slug: string }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const privateUnits = window.localStorage.getItem(PRIVATE_LINK)
      if (privateUnits) {
        try {
          let privateItems: PrivateItem[] = JSON.parse(
            privateUnits
          ) as PrivateItem[]

          // Handle legacy single object format
          if (!Array.isArray(privateItems)) {
            privateItems = [privateItems as PrivateItem]
          }

          // Check if current unit is in the list and date is still valid
          const currentUnit = privateItems.find(
            (item) =>
              item.unit_id == Number(id) && new Date(item.date) > new Date()
          )

          if (currentUnit) {
            setIsPrivate(true)
          }
        } catch {
          // Invalid JSON, ignore
        }
      }
    }
  }, [id])

  return isPrivate
}
