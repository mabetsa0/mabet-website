"use client"
import { Button, Space, Stack, Text, TextInput, Title } from "@mantine/core"
import React from "react"
import "react-phone-number-input/style.css"
import PhoneInput, {
  getCountryCallingCode,
  isSupportedCountry,
  isPossiblePhoneNumber,
} from "react-phone-number-input"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import ar from "react-phone-number-input/locale/ar.json"
import en from "react-phone-number-input/locale/en.json"
import Mabet from "@/services"
import { handleFormError } from "@/utils/handle-form-errors"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import dayjs from "dayjs"

const PhoneNumberForm = () => {
  const t = useTranslations("auth")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setPhoneNumber] = useQueryStates({
    phonenumber: parseAsString.withDefault(""),
    country_code: parseAsString.withDefault(""),
    time: parseAsInteger,
  })
  const locale = useLocale()
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      phonenumber: "",
      country_code: "966",
    },
    validate: {
      phonenumber: (value) => {
        return isPossiblePhoneNumber(value) ? null : t("invalid-phone-number")
      },
    },
    transformValues(values) {
      return {
        country_code: "+" + values.country_code,
        phonenumber: values.phonenumber.replace("+" + values.country_code, ""),
      }
    },
  })
  const onSubmit = form.onSubmit(async (data) => {
    try {
      console.log("🚀 ~ onSubmit ~ data:", data)
      await Mabet.post("/account/login", data)
      setPhoneNumber({ ...data, time: dayjs().add(1, "m").valueOf() })
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
        <div dir="ltr">
          <PhoneInput
            styles={{
              input: {
                background: "transparent",
              },
            }}
            classNames={{
              input: "!text-left",
            }}
            className="items-end"
            name="mobile"
            labels={locale === "ar" ? ar : en}
            international
            countryCallingCodeEditable={false}
            defaultCountry="SA"
            inputComponent={TextInput}
            size="lg"
            onCountryChange={(value) => {
              if (!value || !isSupportedCountry(value)) return
              const code = getCountryCallingCode(value)
              form.setFieldValue("country_code", code)
            }}
            key={form.key("phonenumber")}
            {...form.getInputProps("phonenumber")}
          />
        </div>
        <Text fz={"sm"} c={"#767676"}>
          {t("to-reseve-otp")}
        </Text>
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

export default PhoneNumberForm
