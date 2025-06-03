"use client"

import { Session } from "@/@types/user"
import { createContext, ReactNode, useContext, useState } from "react"

interface SessionContextType {
  isAuthenticated: boolean
  session: Session | null
  updateSession: (session: Session | null) => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}

interface SessionProviderProps {
  children: ReactNode
  session: Session | null
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  const [__session, setSession] = useState<Session | null>(session)
  const value = {
    isAuthenticated: !!__session?.access_token,
    session: __session,
    updateSession: setSession,
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
