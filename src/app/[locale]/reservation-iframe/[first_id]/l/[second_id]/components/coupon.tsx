/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button, Group, Stack, Text, TextInput } from "@mantine/core"

const Coupon = ({
  setCoupon,
  error,
}: {
  setCoupon: (coupon: string) => void
  error: string | null
}) => {
  const t = useTranslations()
  const [value, setValue] = useState("")

  return (
    <>
      <Stack gap={"xs"}>
        <Group align="end" wrap="nowrap">
          <TextInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (!e.target.value) {
                setCoupon("")
              }
            }}
            size="md"
            w={"100%"}
            label={t("unit.coupon-code")}
          />
          <Button
            onClick={() => {
              setCoupon(value)
            }}
            className="shrink-0"
            size="md"
          >
            {t("unit.apply-coupon-code")}
          </Button>
        </Group>
        {error && (
          <Text size="sm" c="red">
            {error}
          </Text>
        )}
      </Stack>
    </>
  )
}

export default Coupon
