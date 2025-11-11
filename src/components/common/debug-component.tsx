"use client"

import { useEffect } from "react"

export default function DebugClient({
  label = "ClientComponent",
}: {
  label?: string
}) {
  useEffect(() => {
    console.log(`✅ React client component mounted: ${label}`)
  }, [])

  return null // invisible
}
