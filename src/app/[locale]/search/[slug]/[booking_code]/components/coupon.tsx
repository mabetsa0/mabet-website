/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Mabet from "@/services"
import { Button, Group, TextInput } from "@mantine/core"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { useState } from "react"
import { useUnitData } from "../../context/unit-context"
export interface CheckCouponResponse {
  data: {
    valid: boolean
  }
  message: null
  success: boolean
}

const Coupon = () => {
  const t = useTranslations()
  const [_, setCoupon] = useQueryState("coupon")
  const [value, setValue] = useState("")
  const unit = useUnitData()
  const { mutate, isPending } = useMutation({
    async mutationFn({ coupon }: { coupon: string }) {
      const response = await Mabet.post<CheckCouponResponse>(
        `/units/${unit.id}/check-coupon`,
        {
          coupon,
        }
      )

      return response.data.data.valid
    },
    onSuccess(data, { coupon }) {
      if (data) {
        setCoupon(coupon)
      }
    },
  })

  return (
    <>
      <Group align="end" wrap="nowrap">
        <TextInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
    </>
  )
}

export default Coupon
