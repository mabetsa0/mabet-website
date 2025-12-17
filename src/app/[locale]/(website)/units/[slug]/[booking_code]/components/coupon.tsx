/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button, Group, Stack, Text, TextInput } from "@mantine/core"
import { useQueryState } from "nuqs"
import { ErrorResponse } from "@/@types/error"
import { useCheckCoupon } from "@/hooks/use-check-coupon"
import { useUnitData } from "../../context/unit-context"

const Coupon = ({ from, to }: { from: string; to: string }) => {
  const t = useTranslations()
  const [_, setCoupon] = useQueryState("coupon")
  const [error, setError] = useState("")
  const [value, setValue] = useState("")
  const unit = useUnitData()
  const {
    mutate,
    isPending,
    error: checkCouponError,
  } = useCheckCoupon({
    unit_id: unit.id.toString(),
    from: from,
    to: to,
    onSuccess(data, { coupon }) {
      setError(data ? "" : t("unit.invalid-coupon"))
      setCoupon(data ? coupon : "")
    },
  })

  return (
    <>
      <Stack gap={"xs"}>
        <Group align="end" wrap="nowrap">
          <TextInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (!e.target.value) {
                setError("")
                setCoupon("")
              }
            }}
            size="md"
            w={"100%"}
            classNames={{
              label: "text-xl font-bold mb-sm",
            }}
            label={t("unit.coupon-code")}
          />
          <Button
            loading={isPending}
            onClick={() => {
              mutate({ coupon: value })
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
        {checkCouponError && (
          <Text size="sm" c="red">
            {(checkCouponError.response?.data as ErrorResponse).errors?.[0] ||
              (checkCouponError.response?.data as ErrorResponse).message ||
              checkCouponError.message}
          </Text>
        )}
      </Stack>
    </>
  )
}

export default Coupon
