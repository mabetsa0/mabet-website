/* eslint-disable @next/next/no-img-element */
"use client"
import { useMemo } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import {
  Button,
  Group,
  NumberFormatter,
  PinInput,
  Stack,
  Text,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { parseAsBoolean, useQueryState } from "nuqs"
import { stcAr, stcEn } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import { CustomNumberInput } from "@/components/ui/number-input"
import Mabet from "@/services"
import { handleFormError } from "@/utils/handle-form-errors"
import { useQitafPhoneNumber } from "../hooks/use-qitaf-phone-number"

const RedeemForm = () => {
  const t = useTranslations("unit.stc-redeem-form")
  const [phoneNumber, setPhoneNumber] = useQitafPhoneNumber()
  const [_, setUseQitafPoints] = useQueryState(
    "use_qitaf_points",
    parseAsBoolean.withDefault(false)
  )
  const changePhoneNumber = () => {
    setPhoneNumber(null)
  }

  const locale = useLocale()
  const stc = locale === "ar" ? stcAr : stcEn
  const form = useForm({
    initialValues: {
      amount: "" as number | "",
      otp: "",
    },
    validate: {
      otp: (value) => {
        if (!value || value.length !== 4) {
          return t("invalid-otp")
        }
        return null
      },
    },
  })

  const amount = form.values.amount

  const sanitizedPoints = useMemo(() => {
    const n = typeof amount === "number" ? amount : 0
    if (!Number.isFinite(n) || n < 0) return 0
    return n
  }, [amount])

  const isDisabled = sanitizedPoints <= 0 || form.values.otp.length !== 4

  const { booking_code } = useParams()
  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await Mabet.post(`/${booking_code}/qitaf-points-redeem`, {
        booking_code,
        amount: sanitizedPoints,
        otp: values.otp,
        msisdn: phoneNumber,
      })

      setUseQitafPoints(true)

      notifications.show({
        title: t("success-title"),
        message: t("success-message"),
        color: "green",
        withBorder: true,
        autoClose: 4000,
      })
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md" p={"xl"}>
        <img className="h-6" src={stc.src} alt="STC" />

        <Stack gap={4}>
          <Text size="sm" c="#767676">
            {t("otp")}
          </Text>
          <PinInput
            size="lg"
            className="!justify-center"
            oneTimeCode
            aria-label="One time code"
            type="number"
            key={form.key("otp")}
            {...form.getInputProps("otp")}
          />
        </Stack>
        <Stack gap={4}>
          <Text size="sm" c="#767676">
            {t("points-to-redeem")}
          </Text>
          <CustomNumberInput
            step={1}
            value={form.values.amount}
            onChange={(value) =>
              form.setFieldValue(
                "amount",
                typeof value === "number"
                  ? value
                  : value === ""
                    ? ""
                    : Number(value)
              )
            }
            min={0}
            thousandSeparator
            decimalScale={0}
          />
        </Stack>

        <Group justify="space-between">
          <Text className="text-lg">{t("you-will-get")}</Text>
          <Text className="text-xl font-bold">
            <NumberFormatter
              value={sanitizedPoints}
              thousandSeparator
              decimalScale={2}
            />

            <RiyalIcon />
          </Text>
        </Group>

        <Button
          size="md"
          type="submit"
          disabled={isDisabled}
          loading={form.submitting}
        >
          {t("confirm")}
        </Button>
        <Button onClick={changePhoneNumber} size="md" variant="white">
          {t("change-phone-number")}
        </Button>
        {form.errors.root && (
          <Text className="text-sm" c={"red"} ta={"center"}>
            {form.errors.root}
          </Text>
        )}
      </Stack>
    </form>
  )
}

export default RedeemForm
