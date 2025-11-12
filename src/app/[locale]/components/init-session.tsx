"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Session } from "@/@types/user"
import { useSession } from "@/lib/session-store"

export function InitSession({
  initialValue,
}: {
  initialValue: Session | null
}) {
  const updateSession = useSession((s) => s.updateSession)
  useEffect(() => {
    updateSession(initialValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: async () =>
      (await axios.get<Session | null>("/api/updated-session")).data,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data) {
      updateSession(data?.access_token ? data : null)
    }
  }, [data, updateSession])

  return null
}
