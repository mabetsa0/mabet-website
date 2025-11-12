import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import axios from "axios"
import { Session } from "@/@types/user"
import { INTEGRATION_COOKIE_NAME } from "@/config"
import integrationApi from "@/services/integration-api"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await integrationApi.post<Omit<Session, "user">>(
      "/user/check-otp",
      body
    )
    const session = response.data
    const cookieStore = await cookies()
    const expiresAt = new Date(Date.now() + 360 * 24 * 60 * 60 * 1000)

    cookieStore.set(
      INTEGRATION_COOKIE_NAME,
      JSON.stringify({
        access_token: session.access_token,
        token_type: session.token_type,
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
