"use client"

import { create } from "zustand"
import { Session } from "@/@types/user"

type SessionStore = {
  session: Session | null
  isAuthenticated: boolean
  updateSession: (session: Session | null) => void
  isPending: boolean
}

export const useSession = create<SessionStore>((set) => ({
  session: null,
  isAuthenticated: false,
  isPending: true,

  updateSession: (session) =>
    set({
      session,
      isAuthenticated: !!session?.access_token,
      isPending: false,
    }),
}))
