"use client"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Session } from "@/@types/user"
import { useSession } from "@/stores/session-store"

type Props = {
  initialValue: Session | null
}

const InitializeClientSession = ({ initialValue }: Props) => {
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

export default InitializeClientSession
