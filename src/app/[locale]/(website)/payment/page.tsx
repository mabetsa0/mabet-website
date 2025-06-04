import { failPayment, successPayment } from "@/assets"
import { Link } from "@/lib/i18n/navigation"
import { Button, Group, Stack, Text } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import React from "react"

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) => {
  const t = await getTranslations("payment-redirect-page")
  const params = await searchParams
  const payment_status = params.payment_status
  const id = params.unit_id
  return (
    <>
      {payment_status === "success" ? (
        <div className="flex items-center flex-col justify-center min-h-[80vh] py-2">
          <Image src={successPayment} alt="success payment" />
          <Stack align={"center"} justify={"center"} gap={"md"} maw={650}>
            <Text ta={"center"} className="text-h3 md:text-h2 font-bold">
              {t("title")}
            </Text>
            <Text ta={"center"} className="text-h5 md:text-h4 font-medium  ">
              {t("description")}
            </Text>
            <Text ta={"center"} c={"#767676"} className="">
              {t("sub-description")}
            </Text>
            <Group gap={"lg"}>
              <Button>{t("reservations")}</Button>
              <Button variant="outline">{t("home")}</Button>
            </Group>
          </Stack>
        </div>
      ) : (
        <div className="flex items-center flex-col justify-center min-h-[80vh] py-2">
          <Image src={failPayment} alt="success payment" />
          <Stack align={"center"} justify={"center"} gap={"md"} maw={650}>
            <Text ta={"center"} className="text-h3 md:text-h2 font-bold">
              {t("fail-title")}
            </Text>
            <Text ta={"center"} className="text-h5 md:text-h4 font-medium  ">
              {t("fail-description")}
            </Text>
            <Text ta={"center"} c={"#767676"} className="">
              {t("fail-sub-description")}
            </Text>
            <Group gap={"lg"}>
              <Button>
                <Link href={`/units/${id}`}>{t("retry")}</Link>
              </Button>
            </Group>
          </Stack>
        </div>
      )}
    </>
  )
}

export default Page
