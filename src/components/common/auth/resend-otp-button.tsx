/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import Mabet from "@/services"
import { getDurationFromNow } from "@/utils/duration"
import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import dayjs from "dayjs"
import { useTranslations } from "next-intl"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import { useEffect } from "react"
import useCountDown from "react-countdown-hook"
type Props = {}

const ResendOtpButton = (props: Props) => {
  const t = useTranslations("auth")

  const [phoneNumber] = useQueryStates({
    phonenumber: parseAsString.withDefault(""),
    country_code: parseAsString.withDefault(""),
    time: parseAsInteger,
  })
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await Mabet.post("/account/otp/resend", {
        phonenumber: phoneNumber.phonenumber,
        country_code: phoneNumber.country_code,
      })
    },
    onError() {
      notifications.show({
        color: "red",
        title: t("verify-otp.resend-error-title"),
        message: t("verify-otp.resend-error-message"),
      })
    },
  })

  const [timeLeft, actions] = useCountDown(
    dayjs(phoneNumber.time).diff(dayjs()) > 0
      ? Math.floor(dayjs(phoneNumber.time).diff(dayjs()))
      : 0,
    1000
  )
  useEffect(() => {
    actions.start()
  }, [actions])
  return (
    <Button
      onClick={() => mutate()}
      loading={isPending}
      variant="outline"
      color="dark"
      disabled={timeLeft > 0}
    >
      {t("verify-otp.resend")}{" "}
      {timeLeft > 0 ? `${(timeLeft / 1000).toFixed(1)}s` : ""}
    </Button>
  )
}

export default ResendOtpButton
