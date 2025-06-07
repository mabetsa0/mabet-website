"use client"

import { create } from "zustand"
import { Session } from "@/@types/user"

type SessionStore = {
  session: Session | null
  isAuthenticated: boolean
  updateSession: (session: Session | null) => void
}

export const useSession = create<SessionStore>((set) => ({
  session: null,
  isAuthenticated: false,
  updateSession: (session) =>
    set({
      session,
      isAuthenticated: !!session?.access_token,
    }),
}))
