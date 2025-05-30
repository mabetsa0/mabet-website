import { Session } from "@/@types/user"

import Mabet from "@/services"
import axios from "axios"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await Mabet.post<Session>("/account/otp/check", body)
    const session = response.data
    if (session) {
      const cookieStore = await cookies()
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      cookieStore.set("session", JSON.stringify(session), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires: expiresAt,
      })
      return NextResponse.json(session)
    }
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.response?.data }, { status: 400 })
    }
    return NextResponse.json({ error: error }, { status: 400 })
  }
}
