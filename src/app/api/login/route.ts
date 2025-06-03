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
          nationality_id: session.user.nationality_id,
          citizenship_number: session.user.citizenship_number,
          resident_number: session.user.resident_number,
          passport_number: session.user.passport_number,
          date_of_birth: session.user.date_of_birth,
          nafath_validated: session.user.nafath_validated,
          avatar: session.user.avatar,
          wallet_balance: session.user.wallet_balance,
          wallet_balance_text: session.user.wallet_balance_text,
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
