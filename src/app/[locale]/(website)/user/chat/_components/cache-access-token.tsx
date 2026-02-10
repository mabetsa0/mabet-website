"use client"

import { useEffect } from "react"
import axios from "axios"

export const CacheAccessToken = ({
  cached,
  token,
}: {
  cached: boolean
  token: string
}) => {
  useEffect(() => {
    if (!cached) {
      axios.post("/api/cache-access-token", { accessToken: token })
    }
  }, [cached, token])

  return null
}
