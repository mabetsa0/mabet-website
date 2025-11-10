"use client"
import { useUnitData } from "@/app/[locale]/(website)/units/[slug]/context/unit-context"
import { PRIVATE_LINK } from "@/config"
import dayjs from "dayjs"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

type PrivateItem = {
  unit_id: number
  date: Date
}

const TrackPrivate = () => {
  const searchParams = useSearchParams()
  const { id } = useUnitData()

  useEffect(() => {
    if (searchParams.get("private")) {
      // Get existing list of private items
      const existingData = window.localStorage.getItem(PRIVATE_LINK)
      let privateItems: PrivateItem[] = []

      if (existingData) {
        try {
          privateItems = JSON.parse(existingData) as PrivateItem[]
          // Ensure it's an array (handle legacy single object format)
          if (!Array.isArray(privateItems)) {
            privateItems = [privateItems as PrivateItem]
          }
        } catch {
          privateItems = []
        }
      }

      // Remove existing entry for this unit if it exists
      privateItems = privateItems.filter((item) => item.unit_id !== id)

      // Add new entry for this unit
      const newItem: PrivateItem = {
        unit_id: id,
        date: dayjs().add(7, "days").toDate(),
      }
      privateItems.push(newItem)

      // Save updated list
      window.localStorage.setItem(PRIVATE_LINK, JSON.stringify(privateItems))
    }
  }, [searchParams, id])
  return null
}

export default TrackPrivate
