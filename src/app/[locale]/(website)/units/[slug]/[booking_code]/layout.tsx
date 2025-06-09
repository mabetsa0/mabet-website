import { getServerSession } from "@/lib/get-server-session"
import { redirect } from "@/lib/i18n/navigation"
import { getLocale } from "next-intl/server"
import React from "react"

const layout = async ({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string; booking_code: string }>
  searchParams: Promise<{ private: boolean }>
}) => {
  const { private: isPrivate } = await searchParams
  const { slug } = await params
  const session = await getServerSession()
  const locale = await getLocale()

  if (!session) {
    redirect({
      href: `/units/${slug}${isPrivate ? "?private=true" : ""}`,
      locale,
    })
  }
  return <>{children}</>
}

export default layout
