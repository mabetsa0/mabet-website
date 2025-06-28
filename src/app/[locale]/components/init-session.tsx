"use client"

import { useEffect } from "react"
import { Session } from "@/@types/user"
import { useSession } from "@/lib/session-store"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export function InitSession({
  initialValue,
}: {
  initialValue: Session | null
}) {
  const updateSession = useSession((s) => s.updateSession)
  useEffect(() => {
    updateSession(initialValue)
  }, [])

  const { data } = useQuery({
    queryKey: ["session"],
    queryFn: async () =>
      (await axios.get<Session | null>("/api/updated-session")).data,
    initialData: initialValue,
    staleTime: Infinity,
  })

  useEffect(() => {
    if (data) {
      updateSession(data?.access_token ? data : null)
    }
  }, [data, updateSession])

  return null
}
