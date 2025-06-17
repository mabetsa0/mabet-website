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
    const cookieStore = await cookies()
    const expiresAt = new Date(Date.now() + 360 * 24 * 60 * 60 * 1000)

    cookieStore.set(
      "session",
      JSON.stringify({
        ...session,
        user: {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          phonenumber: session.user.phonenumber,
          nafath_validated: session.user.nafath_validated,
          wallet_balance: session.user.wallet_balance,
          avatar: session.user.avatar,
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
