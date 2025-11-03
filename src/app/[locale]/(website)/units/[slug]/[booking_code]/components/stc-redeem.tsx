import { stc } from "@/assets"
import ModalDrawer from "@/components/common/modal-drawer"
import { Group, SimpleGrid, Stack, Text, UnstyledButton } from "@mantine/core"
import { useState } from "react"
import { useTranslations } from "next-intl"
import PhoneNumberForm from "./phone-number-form"

export const STCRedeem = () => {
  const [state, setState] = useState(false)

  const t = useTranslations("unit.stc-redeem-modal")
  return (
    <>
      <UnstyledButton
        onClick={() => setState(true)}
        className="border border-[#500e74] rounded-md w-full shadow-lg shadow-[#500e74] p-sm"
      >
        <Group align="center" gap="lg">
          <img className="h-[20px]" src={stc.src} alt="STC" />
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
        onClose={() => setState(false)}
      >
        <Stack gap={"xl"} p={"xl"}>
          <Stack gap={"xl"}>
            <img className="h-2" src={stc.src} alt="STC" />
            <Text size="md" fw={500} c="#767676" ta={"center"}>
              {t("description")}
            </Text>
          </Stack>
          <Stack>
            <PhoneNumberForm title={t("enter-phone-number")} />
          </Stack>
        </Stack>
      </ModalDrawer>
    </>
  )
}
