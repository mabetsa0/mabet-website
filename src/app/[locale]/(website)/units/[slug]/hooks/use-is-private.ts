import { PRIVATE_LINK } from "@/config"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useIsPrivate = () => {
  const [isPrivate, setIsPrivate] = useState(false)
  const { slug: id } = useParams() as { slug: string }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const privateUnit = window.localStorage.getItem(PRIVATE_LINK)
      if (privateUnit) {
        const value = JSON.parse(privateUnit) as { unit_id: number; date: Date }

        if (value.unit_id == Number(id) && new Date(value.date) > new Date()) {
          setIsPrivate(true)
        }
      }
    }
  }, [])

  return isPrivate
}
