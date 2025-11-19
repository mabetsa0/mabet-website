"use server"
import React from "react"
import { cookies } from "next/headers"
import { Session } from "@/@types/user"

export const getServerSession = React.cache(async () => {
  // get session from cookie
  const cookieStore = await cookies()
  const session = cookieStore.get("session")?.value
  if (!session) return null
  return JSON.parse(session) as Session
})
