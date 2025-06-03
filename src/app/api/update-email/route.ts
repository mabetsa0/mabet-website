import { Session } from "@/@types/user"

import axios from "axios"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const rawSession = cookieStore.get("session")?.value
    const body = await request.json()

    if (!rawSession) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 })
    }
    const session = JSON.parse(rawSession) as Session

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    cookieStore.set(
      "session",
      JSON.stringify({
        ...session,
        user: {
          ...session.user,
          email: body.email,
        },
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      }
    )
    return NextResponse.json(session)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.status === 403 ? "invalid-OTP" : "server-error",
          errors: [
            error.response?.status === 403 ? "invalid-OTP" : "server-error",
          ],
        },
        { status: error.response?.status }
      )
    }
    return NextResponse.json({ error: error }, { status: 400 })
  }
}
