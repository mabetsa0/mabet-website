"use server"
import { Session } from "@/@types/user"
import { cookies } from "next/headers"
import React from "react"

export const getServerSession = React.cache(async () => {
  const session = (await cookies()).get("session")?.value
  if (!session) return null

  return JSON.parse(session) as Session
})
