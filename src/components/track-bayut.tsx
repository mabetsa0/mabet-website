"use client"
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import dayjs from "dayjs"
import { BAYUT_KEY } from "@/config"

const TrackBayut = () => {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("source") === "bayut") {
      const value = {
        source: searchParams.get("source"),
        utm_phone_number: searchParams.get("utm_phone_number"),
        date: dayjs().add(1, "days").toDate(),
      }
      window.localStorage.setItem(BAYUT_KEY, JSON.stringify(value))
    }
  }, [searchParams])
  return null
}

export default TrackBayut
