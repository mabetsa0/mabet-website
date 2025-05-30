import ArPrivacyPolicy from "@/components/privacy-policy/ArPrivacyPolicy"
import EnPrivacyPolicy from "@/components/privacy-policy/EnPrivacyPolicy"

export default async function Page({
  params,
}: {
  params: Promise<{
    locale: string
  }>
}) {
  const locale = (await params).locale
  return <>{locale === "ar" ? <ArPrivacyPolicy /> : <EnPrivacyPolicy />}</>
}
