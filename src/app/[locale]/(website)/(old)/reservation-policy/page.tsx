import ArReservationPolicy from "@/components/reservation-policy/ArReservationPolicy"
import EnReservationPolicy from "@/components/reservation-policy/EnReservationPolicy"

export default async function Page({
  params,
}: {
  params: Promise<{
    locale: string
  }>
}) {
  const locale = (await params).locale
  return (
    <>{locale === "ar" ? <ArReservationPolicy /> : <EnReservationPolicy />}</>
  )
}
