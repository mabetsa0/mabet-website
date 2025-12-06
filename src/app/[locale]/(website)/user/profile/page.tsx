"use client"

import { useEffect } from "react"
import { useTranslations } from "next-intl"
import { Button, Group, Space, Stack, Text, TextInput } from "@mantine/core"
import { isEmail, useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { BadgeCheck, Mail, Phone, UserIcon } from "lucide-react"
import { useNafath } from "@/hooks/use-nafath"
import Mabeet from "@/services"
import { useSession } from "@/stores/session-store"
import { handleFormError } from "@/utils/handle-form-errors"
import useUser from "../hooks/use-user"

const Profile = () => {
  const t = useTranslations()
  const { session, updateSession } = useSession()
  const { user, status } = useUser()
  const [_, { onOpen }] = useNafath()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail(t("general.invalid-email")),
    },
  })

  useEffect(() => {
    if (status === "success") {
      form.initialize({ email: user.email })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user.email])
  const onSubmit = form.onSubmit(async (data) => {
    try {
      await Mabeet.post("/user/update", data)
      updateSession({
        ...session!,
        user: {
          ...session!.user,
          email: data.email,
        },
      })

      notifications.show({
        color: "green",
        title: t("user.update-email-success-title"),
        message: t("user.update-email-success-description"),
      })
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Space />
        <Stack>
          <Text className="text-h3 md:text-h2 font-bold">
            {t("user.profile.title")}
          </Text>
          <Text className="md:text-lg">{t("user.profile.description")}</Text>
        </Stack>
        <Stack hiddenFrom="md">
          <Space />
          <Group wrap="nowrap" gap={"xs"} className="rounded-2xl bg-white p-1">
            {/* <div className="w-[72px] flex items-center justify-center h-[72px] rounded-3xl bg-primary"> */}
            <img
              className="h-[62px] w-[62px]"
              alt={"avatar"}
              src={user.avatar}
            />
            {/* </div> */}
            <Stack gap={"xs"}>
              <Text size="lg" fw={"bold"}>
                {user.name}
              </Text>
              <Button
                onClick={user.nafath_validated ? undefined : onOpen}
                variant={user.nafath_validated ? "white" : "outline"}
                leftSection={user.nafath_validated ? <BadgeCheck /> : undefined}
              >
                {user.nafath_validated
                  ? t("general.verified")
                  : t("general.verify-account")}
              </Button>
            </Stack>
            <Space />
          </Group>
        </Stack>
        <Stack maw={550}>
          <div className="rounded-lg border border-[#F3F3F3]">
            <TextInput
              required
              withAsterisk={false}
              placeholder="--"
              readOnly
              variant="unstyled"
              classNames={{
                input: "px-1 rounded-t-[none]  py-[3px] bg-[#F6F4F8] ",
                wrapper: "!rounded-t-[none] ",
                label: " border-b w-full border-b-[#F3F3F3] px-1 py-[12px]",
              }}
              label={
                <Group gap={"xs"} component={"span"}>
                  <UserIcon strokeWidth={1.25} className="text-primary" />
                  {t("user.profile.form.name.label")}
                </Group>
              }
              defaultValue={user.name}
            />
          </div>
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
                error: "px-1   mb-0.5 ",
              }}
              label={
                <Group gap={"xs"} component={"span"}>
                  <Mail strokeWidth={1.25} className="text-primary" />
                  {t("user.profile.form.email.label")}
                </Group>
              }
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </div>
          <div className="rounded-lg border border-[#F3F3F3]">
            <TextInput
              required
              readOnly
              withAsterisk={false}
              variant="unstyled"
              classNames={{
                input: "px-1 rounded-t-[none]  py-[3px] bg-[#F6F4F8] ",
                wrapper: "!rounded-t-[none] ",
                label: " border-b w-full border-b-[#F3F3F3] px-1 py-[12px]",
              }}
              label={
                <Group gap={"xs"} component={"span"}>
                  <Phone strokeWidth={1.25} className="text-primary" />
                  {t("user.profile.form.phone.label")}
                </Group>
              }
              defaultValue={user.phonenumber}
            />
          </div>
          <Text className="md:text-lg" c={"#767676"}>
            {t("user.profile.form.description")}
          </Text>
          <Space />
          <Button type="submit" loading={form.submitting}>
            {t("user.profile.form.save-button")}
          </Button>
          {form.errors.root && (
            <Text ta={"center"} size="sm" c={"red"}>
              {form.errors.root}
            </Text>
          )}
        </Stack>
      </Stack>
    </form>
  )
}

export default Profile
