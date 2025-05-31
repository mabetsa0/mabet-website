"use client"

import { createContext, useContext, useState } from "react"

import { User } from "@/types/user-response"

const UserContext = createContext<null | User>(null)

export const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) => {
  const [state, setState] = useState<null | User>(user)

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a userProvider")
  }
  return context
}
