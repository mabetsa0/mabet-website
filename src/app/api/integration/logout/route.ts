import { INTEGRATION_COOKIE_NAME } from "@/config"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.delete(INTEGRATION_COOKIE_NAME)

  return NextResponse.json({
    message: "Logged out successfully",
  })
}
