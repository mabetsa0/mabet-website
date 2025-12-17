"use client"
/* eslint-disable @next/next/no-img-element */
import { use, useEffect } from "react"
import { useTranslations } from "next-intl"
import { ActionIcon, Box, Group, Loader, Space, Stack } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { ChevronRight } from "lucide-react"
import { ErrorResponse } from "@/@types/error"
import Footer from "@/components/common/footer"
import ErrorUI from "@/components/ui/error"
import useMdScreen from "@/hooks/use-md-screen"
import { useRouter } from "@/lib/i18n/navigation"
import { useSession } from "@/lib/session-store"
import ImageGallery from "../components/image-gallery"
import { UnitContextProvider } from "../context/unit-context"
import { ApproveBooking } from "./approve-booking"
import MobilePaymentButton from "./components/mobile-payment-button"
import PaymentForm from "./components/payment-form"
import ReservationDetails from "./components/reservation-details"
import UnitConditions from "./components/unit-conditions"
import { usePaymentSummary } from "./hooks/use-payment-summary"

type Props = {
  params: Promise<{
    slug: string
    booking_code: string
  }>
  searchParams: Promise<{ [key: string]: string }>
}

const Page = (props: Props) => {
  const params = use(props.params)
  const { isAuthenticated } = useSession()

  const { data, status } = usePaymentSummary(params.booking_code)
  const t = useTranslations()

  // handle unauthorized
  const Router = useRouter()

  const goBack = () => {
    Router.back()
  }
  useEffect(() => {
    console.log("🚀 ~ useEffect ~ isAuthenticated:", isAuthenticated)
    if (!isAuthenticated) {
      Router.replace(`/units/${params.slug}`)
    }
  }, [isAuthenticated, params.slug])
  const mathes = useMdScreen()
  if (status == "pending")
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader />
      </div>
    )
  if (status === "error")
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorUI />
      </div>
    )

  const { unit } = data
  return (
    <UnitContextProvider value={unit}>
      <Box hiddenFrom="md">
        <ImageGallery />
      </Box>
      <section className="relative mb-4 bg-white max-md:-mt-1 max-md:rounded-3xl md:pt-2">
        <div className="container">
          <div className="flex gap-2 max-md:flex-col">
            <Stack className="w-full">
              <Group wrap="nowrap" visibleFrom="md" align="center">
                <ActionIcon onClick={goBack} radius={"xl"} size={"xl"}>
                  <ChevronRight className="ltr:rotate-180" />
                </ActionIcon>

                <h1 className="text-h3 md:text-h2 font-bold">
                  {t("unit.review-and-payment")}
                </h1>
              </Group>
              <Space />
              <Box hiddenFrom="md">
                <ReservationDetails prices={data.booking_details} />
              </Box>

              <UnitConditions />
              {mathes ? null : (
                <Box visibleFrom="md">
                  <PaymentForm {...data.booking_details} />
                </Box>
              )}
            </Stack>
            <Box visibleFrom="md" className="shrink-0 md:w-[500px]">
              <ReservationDetails prices={data.booking_details} />
            </Box>
          </div>

          <MobilePaymentButton booking_details={data.booking_details} />
        </div>
      </section>
      <Footer />
    </UnitContextProvider>
  )
}

export default Page
