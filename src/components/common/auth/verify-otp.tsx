"use client"
import { User } from "@/@types/user"
import { LOCALSTORAGE_SESSION_KEY } from "@/config"
import Mabet from "@/services"
import { handleFormError } from "@/utils/handle-form-errors"
import { Button, Divider, PinInput, Stack, Text, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"

const VerifyOtp = () => {
  const t = useTranslations("auth")
  const [phoneNumber, setPhoneNumber] = useQueryStates({
    phonenumber: parseAsString.withDefault(""),
    country_code: parseAsString.withDefault(""),
    time: parseAsInteger,
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
      setPhoneNumber(null)
    } catch (error) {
      handleFormError(error, form)
    }
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

  const updatePhoneNumber = () => {
    setPhoneNumber(null)
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack className="h-full" justify="space-between" gap={"xl"}>
        <Stack gap={"xs"}>
          <Title order={4} c={"primary"}>
            {t("verify-otp.title")}
          </Title>
          <Text fw={"500"} c={"#767676"}>
            {t("verify-otp.description", { value: phoneNumber.phonenumber })}
          </Text>
        </Stack>
        <PinInput
          className="!justify-center"
          autoFocus
          oneTimeCode
          aria-label="One time code"
          type="number"
          key={form.key("otp")}
          {...form.getInputProps("otp")}
        />

        <Stack gap={"xs"}>
          <Button loading={form.submitting} type="submit">
            {t("verify-otp.continue")}
          </Button>
          <Text className="text-sm " c={"red"} ta={"center"}>
            {form.errors.root}
          </Text>
        </Stack>
        <Divider label={t("verify-otp.didnot-get-code")} />
        <Stack gap={"xs"}>
          <Button
            onClick={() => mutate()}
            loading={isPending}
            variant="outline"
            color="dark"
          >
            {t("verify-otp.resend")}
          </Button>
          <Button onClick={updatePhoneNumber} variant="outline" color="dark">
            {t("verify-otp.update-phonenumber")}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default VerifyOtp
