import { redirect } from "@/lib/i18n/navigation"

export default async function User({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return redirect({
    href: { pathname: "/private/profile" },
    locale: locale as "en" | "ar",
  })
}
