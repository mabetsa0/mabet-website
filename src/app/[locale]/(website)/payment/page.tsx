import { successPayment } from "@/assets"
import { Button, Group, Stack, Text } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import React from "react"

const Page = async () => {
  const t = await getTranslations("payment-redirect-page")
  return (
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
  )
}

export default Page
