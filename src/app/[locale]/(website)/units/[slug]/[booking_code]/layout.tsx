import React from "react"
import { getServerSession } from "@/lib/get-server-session"
import { redirect } from "@/lib/i18n/navigation"

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string; slug: string }>
}

const Layout = async ({ children, params }: Props) => {
  const { locale, slug } = await params
  const session = await getServerSession()
  if (!session)
    return redirect({
      href: { pathname: `/units/${slug}` },
      locale: locale as "en" | "ar",
    })
  return children
}

export default Layout
