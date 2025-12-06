import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { SESSION_COOKIE } from "@/config"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)

  return NextResponse.json({
    message: "Logged out successfully",
  })
}
