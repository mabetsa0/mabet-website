"use client"
import { useUnitData } from "@/app/[locale]/(website)/units/[slug]/context/unit-context"
import { PRIVATE_LINK } from "@/config"
import dayjs from "dayjs"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const TrackPrivate = () => {
  const searchParams = useSearchParams()
  const { id } = useUnitData()

  useEffect(() => {
    if (searchParams.get("private")) {
      const value = {
        unit_id: id,
        date: dayjs().add(7, "days").toDate(),
      }
      window.localStorage.setItem(PRIVATE_LINK, JSON.stringify(value))
    }
  }, [searchParams])
  return null
}

export default TrackPrivate
