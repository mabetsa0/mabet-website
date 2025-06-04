/* eslint-disable @next/next/no-img-element */
"use client"
import { emailIcon } from "@/assets"
import { useUserDataModal } from "@/hooks/use-user-data-modal"
import {
  Box,
  Button,
  Checkbox,
  Group,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form"
import { Mail } from "lucide-react"
import { useTranslations } from "next-intl"
import ModalDrawer from "../modal-drawer"
import { LOCALSTORAGE_SESSION_KEY } from "@/config"
import axios from "axios"
import Mabet from "@/services"
import { handleFormError } from "@/utils/handle-form-errors"
import { useSession } from "@/app/session-provider"
const UserDataModal = () => {
  const { session, updateSession } = useSession()

  const t = useTranslations("user-data-modal")
  const [opened, { onClose }] = useUserDataModal()
  const close = () => {
    if (!session?.user.email) {
      window.localStorage.removeItem(LOCALSTORAGE_SESSION_KEY)
      axios.post("/api/logout")
      updateSession(null)
    }
    onClose()
  }

  const form = useForm({
    initialValues: {
      email: "",
      agree: false,
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await Mabet.post("/account/update", {
        email: values.email,
      })
      updateSession({
        ...session!,
        user: {
          ...session!.user,
          email: values.email,
        },
      })
      await axios.post("/api/update-email", {
        email: values.email,
      })

      close()
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <ModalDrawer title={t("title")} size={"992"} state={opened} onClose={close}>
      <Group align="start" wrap="nowrap" gap={"xl"}>
        <form onSubmit={handleSubmit} className="md:ps-1.5 py-2 max-w-[400px]">
          <Stack>
            <Stack gap={"xs"}>
              <Text className="text-h4 font-bold text-primary">
                {t("sub-title")}
              </Text>
              <Text c={"#767676"}>{t("description")}</Text>
            </Stack>
            <div className="border border-[#F3F3F3] rounded-lg">
              <TextInput
                required
                withAsterisk={false}
                type="email"
                placeholder="info@example.com"
                variant="unstyled"
                classNames={{
                  input: "px-1 mt-[4px]",
                  label: " border-b w-full border-b-[#F3F3F3] px-1 py-[12px]",
                }}
                label={
                  <Group gap={"xs"} component={"span"}>
                    <Mail strokeWidth={1.25} className="text-primary" />
                    {t("id-label")}
                  </Group>
                }
                key={form.key("email")}
                {...form.getInputProps("email")}
              />
            </div>
            <Space />
            <Checkbox
              radius={"xs"}
              required
              key={form.key("agree")}
              {...form.getInputProps("agree")}
              label={t("agree-label")}
            />
            <Space />

            <div className="space-y-0.5">
              <Button type="submit" loading={form.submitting} fullWidth>
                {t("button")}
              </Button>
              <Text className="text-sm " c={"red"} ta={"center"}>
                {form.errors.root}
              </Text>
            </div>
          </Stack>
        </form>
        <Box visibleFrom="md" className="py-2">
          <img alt="nafath" src={emailIcon.src} />
        </Box>
      </Group>
    </ModalDrawer>
  )
}

export default UserDataModal
