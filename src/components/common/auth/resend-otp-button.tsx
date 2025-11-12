/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import dayjs from "dayjs"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import useCountDown from "react-countdown-hook"
import Mabet from "@/services"

const ResendOtpButton = () => {
  const t = useTranslations("auth")

  const [phoneNumber, set] = useQueryStates({
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
    onSuccess() {
      set({ time: dayjs().add(1, "m").valueOf() })
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
      {timeLeft > 0 ? `${Math.floor(timeLeft / 1000).toFixed(0)}s` : ""}
    </Button>
  )
}

export default ResendOtpButton
