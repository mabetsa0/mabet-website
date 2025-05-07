"use client"
import { User } from "@/@types/user"
import { LOCALSTORAGE_SESSION_KEY } from "@/config"
import Mabet from "@/services"
import { handleFormError } from "@/utils/handle-form-errors"
import { Button, Space, Stack, Text, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryStates } from "nuqs"
import React from "react"

const VerifyOtp = () => {
  const t = useTranslations("auth")
  const [phoneNumber, setPhoneNumber] = useQueryStates({
    phonenumber: parseAsString.withDefault(""),
    country_code: parseAsString.withDefault(""),
  })
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      otp: "",
    },

    transformValues(values) {
      return { otp: values.otp, ...phoneNumber }
    },
  })

  const onSubmit = form.onSubmit(async (data) => {
    try {
      const response = await Mabet.post<User>("/account/otp/check", data)
      const user = response.data
      window.localStorage.setItem(
        LOCALSTORAGE_SESSION_KEY,
        JSON.stringify(user)
      )
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack className="h-full" justify="space-between" gap={"xl"}>
        <Stack gap={"xs"}>
          <Title order={4} c={"primary"}>
            {t("welcome-to-mabet")}
          </Title>
          <Text fw={"500"} c={"#767676"}>
            {t("enter-your-phone-number")}
          </Text>
        </Stack>
        <Space />

        <Stack gap={"xs"}>
          <Button loading={form.submitting} type="submit">
            {t("continue")}
          </Button>
          <Text className="text-sm " c={"red"} ta={"center"}>
            {form.errors.root}
          </Text>
        </Stack>
      </Stack>
    </form>
  )
}

export default VerifyOtp
