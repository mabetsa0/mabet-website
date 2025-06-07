"use client"

import { useEffect } from "react"
import { Session } from "@/@types/user"
import { useSession } from "@/lib/session-store"

export function InitSession({ session }: { session: Session | null }) {
  const updateSession = useSession((s) => s.updateSession)

  useEffect(() => {
    updateSession(session)
  }, [session])

  return null
}
