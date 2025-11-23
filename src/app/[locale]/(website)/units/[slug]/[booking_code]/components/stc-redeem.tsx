/* eslint-disable @next/next/no-img-element */
import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Group, Stack, Text, UnstyledButton } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { stcAr, stcEn } from "@/assets"
import ModalDrawer from "@/components/common/modal-drawer"
import PhoneNumberForm from "./phone-number-form"
import RedeemForm from "./redeem-form"

export const STCRedeem = () => {
  const locale = useLocale()
  const stc = locale === "ar" ? stcAr : stcEn
  const [state, setState] = useState(false)

  const t = useTranslations("unit.stc-redeem-modal")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [redeemForm, setRedeemForm] = useState(false)
  const onSubmit = async (data: {
    country_code: string
    phonenumber: string
  }) => {
    console.log("🚀 ~ onSubmit ~ data:", data)
    setPhoneNumber(data.phonenumber)
    setRedeemForm(true)
  }

  return (
    <>
      <UnstyledButton
        onClick={() => setState(true)}
        className="w-full rounded-md border border-[#500e74] p-0.5 shadow-lg shadow-[#500e74]"
      >
        <Group align="center" gap="lg">
          <img className="h-4" src={stc.src} alt="STC" />

          <Stack gap={"3px"}>
            <Text fw={500} size="sm">
              {t("button")}
            </Text>
            <Text size="xs" c="#767676">
              {t("description")}
            </Text>
          </Stack>
        </Group>
      </UnstyledButton>
      <ModalDrawer
        title={t("button")}
        size={"md"}
        state={state}
        onClose={() => {
          setState(false)
          setRedeemForm(false)
        }}
      >
        {redeemForm ? (
          <RedeemForm
            msisdn={phoneNumber}
            onConfirm={(data) => {
              setRedeemForm(false)
              setState(false)
              notifications.show({
                title: t("success-title"),
                message: t("success-message"),
                color: "green",
                withBorder: true,
                autoClose: 4000,
              })
            }}
          />
        ) : (
          <Stack gap={"xl"} p={"xl"}>
            <Stack gap={"sm"}>
              <img className="h-7" src={stc.src} alt="STC" />
              <Text size="md" fw={500} c="#767676" ta={"center"}>
                {t("description")}
              </Text>
            </Stack>
            <Stack>
              <PhoneNumberForm
                onSubmit={onSubmit}
                title={t("enter-phone-number")}
              />
            </Stack>
          </Stack>
        )}
      </ModalDrawer>
    </>
  )
}
