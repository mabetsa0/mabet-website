"use client"

import { Session } from "@/@types/user"
import { createContext, ReactNode, useContext } from "react"

interface SessionContextType {
  isAuthenticated: boolean
  session: Session | null
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
  const value = {
    isAuthenticated: !!session,
    session,
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
