"use server"
import React from "react"
import { cookies } from "next/headers"
import { Session } from "@/@types/user"
import { SESSION_COOKIE } from "@/config"

export const getServerSession = React.cache(async () => {
  // get session from cookie
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)?.value
  if (!session) return null
  return JSON.parse(session) as Session
})
