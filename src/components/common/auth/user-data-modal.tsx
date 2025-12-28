/* eslint-disable @next/next/no-img-element */
"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
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
import { useForm } from "@mantine/form"
import axios from "axios"
import { Mail } from "lucide-react"
import { emailIcon } from "@/assets"
import { useNafath } from "@/hooks/use-nafath"
import { useUserDataModal } from "@/hooks/use-user-data-modal"
import { Link } from "@/lib/i18n/navigation"
import Mabet from "@/services"
import { useSession } from "@/stores/session-store"
import { handleFormError } from "@/utils/handle-form-errors"
import ModalDrawer from "../modal-drawer"

const UserDataModal = () => {
  const { session, updateSession } = useSession()
  const [_, { onOpen: onOpenNafath }] = useNafath()

  const t = useTranslations("user-data-modal")
  const [opened, { onClose }] = useUserDataModal()
  const close = () => {
    if (!session?.user.email) {
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
      onOpenNafath()
      close()
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <ModalDrawer title={t("title")} size={"992"} state={opened} onClose={close}>
      <Group align="start" wrap="nowrap" gap={"xl"}>
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] py-2 md:ltr:pl-1.5 md:rtl:pr-1.5"
        >
          <Stack>
            <Stack gap={"xs"}>
              <Text className="text-h4 text-primary font-bold">
                {t("sub-title")}
              </Text>
              <Text c={"#767676"}>{t("description")}</Text>
            </Stack>
            <div className="rounded-lg border border-[#F3F3F3]">
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
              label={t.rich("agree-label", {
                link1: (chunks) => (
                  <Link href="/terms-and-conditions">{chunks}</Link>
                ),
                link2: (chunks) => (
                  <Link href="/reservation-policy">{chunks}</Link>
                ),
              })}
            />
            <Space />

            <div className="space-y-0.5">
              <Button type="submit" loading={form.submitting} fullWidth>
                {t("button")}
              </Button>
              <Text className="text-sm" c={"red"} ta={"center"}>
                {form.errors.root}
              </Text>
            </div>
          </Stack>
        </form>
        <Box visibleFrom="md" className="py-2">
          <Image alt="nafath" src={emailIcon} />
        </Box>
      </Group>
    </ModalDrawer>
  )
}

export default UserDataModal
