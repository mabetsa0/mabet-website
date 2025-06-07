/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Session } from "@/@types/user"
import { useAuthModal } from "@/hooks/use-auth-modal"
import { useUserDataModal } from "@/hooks/use-user-data-modal"
import { useSession } from "@/lib/session-store"
import { Button, Divider, PinInput, Stack, Text, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import axios from "axios"
import { useTranslations } from "next-intl"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import ResendOtpButton from "./resend-otp-button"
const VerifyOtp = () => {
  const t = useTranslations("auth")
  const [_, { onClose }] = useAuthModal()
  const [userData, { onOpen: onOpenUserData }] = useUserDataModal()

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

  const { updateSession } = useSession()
  const onSubmit = form.onSubmit(async (data) => {
    try {
      const response = await axios.post<Session>("/api/login", data)
      const user = response.data
      if (!user.user.email) {
        onOpenUserData()
      }

      updateSession(user)
      setPhoneNumber(null)
      onClose()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        form.setErrors({
          root: t("invalid-otp"),
        })
        return
      }

      form.setErrors({
        root: t("server-error"),
      })
    }
  })

  const updatePhoneNumber = () => {
    setPhoneNumber(null)
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack className="h-full" justify="space-between" gap={"xl"}>
        <Stack className="max-md:!text-center" gap={"xs"}>
          <Title order={4} c={"primary"}>
            {t("verify-otp.title")}
          </Title>
          <Text fw={"500"} c={"#767676"}>
            {t("verify-otp.description", { value: phoneNumber.phonenumber })}
          </Text>
        </Stack>
        <PinInput
          size="lg"
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
          <ResendOtpButton key={phoneNumber.time} />
          <Button onClick={updatePhoneNumber} variant="outline" color="dark">
            {t("verify-otp.update-phonenumber")}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default VerifyOtp
