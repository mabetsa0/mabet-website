"use client"
/* eslint-disable @next/next/no-img-element */

import { UnitContextProvider } from "../context/unit-context"

import { useRouter } from "@/lib/i18n/navigation"
import { isAuthenticated } from "@/utils/is-authenticated"
import { ActionIcon, Box, Group, Loader, Space, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { use, useCallback, useEffect } from "react"
import ReservationDetails from "./components/reservation-details"
import UnitConditions from "./components/unit-conditions"
import { GetPaymentSummary } from "./get-payment-summary"
import PaymentForm from "./components/payment-form"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"
import { keepPreviousData } from "@tanstack/react-query"

type Props = {
  params: Promise<{
    slug: string
    booking_code: string
  }>
  searchParams: Promise<{ [key: string]: string }>
}

const Page = (props: Props) => {
  const params = use(props.params)
  const [{ method, isPrivate, coupon }] = useQueryStates({
    method: parseAsString.withDefault("card"),
    isPrivate: parseAsStringLiteral(["1"]),
    coupon: parseAsString.withDefault(""),
  })
  const { data, status } = useQuery({
    enabled: isAuthenticated(),
    queryKey: [params.booking_code, method],
    queryFn: () =>
      GetPaymentSummary(params.booking_code, {
        payment_method: method,
        private: isPrivate ?? undefined,
        coupon: coupon ?? undefined,
      }),
    placeholderData: keepPreviousData,
  })
  const t = useTranslations()

  // handle unauthorized
  const Router = useRouter()
  const backToUnit = useCallback(() => {
    Router.replace(`/search/${params.slug}`)
  }, [Router, params.slug])
  useEffect(() => {
    if (!isAuthenticated()) {
      backToUnit()
    }
  }, [backToUnit])
  if (status == "pending")
    return (
      <div className="flex items-center justify-center min-h-[10vh]">
        <Loader />
      </div>
    )
  if (status === "error") return <>ERROR</>

  const { unit } = data
  return (
    <UnitContextProvider value={unit}>
      <section className="relative  bg-white pt-2 ">
        <div className="container">
          <div className="flex gap-4 max-md:flex-col">
            <Stack className="w-full">
              <Group align="center">
                <ActionIcon onClick={backToUnit} radius={"xl"} size={"xl"}>
                  <ChevronRight />
                </ActionIcon>

                <h1 className="text-h2 font-bold ">
                  {t("unit.review-and-payment")}
                </h1>
              </Group>
              <Space />

              <UnitConditions />
              <PaymentForm {...data.booking_details} />
            </Stack>
            <Box visibleFrom="md" className="md:w-[500px] shrink-0">
              <ReservationDetails prices={data.booking_details} />
            </Box>
          </div>
        </div>
      </section>
    </UnitContextProvider>
  )
}

export default Page
