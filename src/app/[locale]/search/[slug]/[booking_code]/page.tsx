"use client"
/* eslint-disable @next/next/no-img-element */

import { UnitContextProvider } from "../context/unit-context"

import { torism } from "@/assets"
import { Box, Group, Loader, Space, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { QrCode } from "lucide-react"
import { useTranslations } from "next-intl"
import { use } from "react"
import { GetPaymentSummary } from "./get-payment-summary"
import ReservationDetails from "./components/reservation-deatils"

type Props = {
  params: Promise<{
    slug: string
    booking_code: string
  }>
  searchParams: Promise<{ [key: string]: string }>
}

const Page = (props: Props) => {
  const params = use(props.params)
  const { data, status } = useQuery({
    queryKey: [params.booking_code],
    queryFn: () => GetPaymentSummary(params.booking_code),
  })
  const t = useTranslations()
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
      <section className="relative  bg-white  ">
        <div className="container">
          <div className="flex gap-4 max-md:flex-col">
            <Stack className="w-full">
              <Space hiddenFrom="md" />
              <h1 className="text-h4 font-bold md:hidden">{unit.name}</h1>

              <Stack>
                <h3 className="text-h4 md:text-h3 font-medium">
                  {t("unit.details")}
                </h3>
                <Stack gap={"xs"} className="text-[#767676]">
                  <p>{unit.details}</p>

                  <p className="flex gap-0.5">
                    <QrCode strokeWidth={1.25} /> {unit.code}
                  </p>
                  <Group className="border w-fit rounded-md py-0.5 px-1.5 border-primary">
                    <img className="w-3" src={torism.src} alt="licence" />
                    <p>{unit.licence.license_text}</p>
                  </Group>
                </Stack>
              </Stack>
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
