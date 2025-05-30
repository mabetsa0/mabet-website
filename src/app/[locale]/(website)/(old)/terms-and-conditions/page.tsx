import ArTermsAndConditions from "@/components/terms-and-conditions/ArTermsAndConditions"
import EnTermsAndConditions from "@/components/terms-and-conditions/EnTermsAndConditions"

export default async function Page({
  params,
}: {
  params: Promise<{
    locale: string
  }>
}) {
  const locale = (await params).locale
  return (
    <>{locale === "ar" ? <ArTermsAndConditions /> : <EnTermsAndConditions />}</>
  )
}
