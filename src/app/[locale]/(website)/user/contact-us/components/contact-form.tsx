"use client"

import Mabeet from "@/api"

import { handleFormError } from "@/utils/handle-form-errors"
import {
  Button,
  Group,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core"
import { isEmail, useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { File, Mail, Phone, UserIcon } from "lucide-react"
import { useTranslations } from "next-intl"
const ContactForm = () => {
  const t = useTranslations()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      message: "",
      subject: "",
    },
  })
  const onSubmit = form.onSubmit(async (data) => {
    try {
      await Mabeet.post("/contact-us", data)
      form.reset()
      notifications.show({
        color: "green",
        title: t("user.contact-form.success-title"),
        message: t("user.contact-form.success-description"),
      })
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Stack maw={550}>
          <Text className="text-h5  font-medium">
            {t("user.contact-form.title")}
          </Text>
          <div className="border border-[#F3F3F3] rounded-lg">
            <TextInput
              required
              withAsterisk={false}
              placeholder={t("user.contact-form.subject.placeholder")}
              variant="unstyled"
              classNames={{
                input: "px-1 mt-[4px]",
                label: " border-b w-full border-b-[#F3F3F3] px-1 py-[12px]",
                error: "px-1   mb-0.5 ",
              }}
              label={
                <Group gap={"xs"} component={"span"}>
                  <File strokeWidth={1.25} className="text-primary" />
                  {t("user.contact-form.subject.label")}
                </Group>
              }
            />
          </div>
          <div className="border border-[#F3F3F3] rounded-lg">
            <Textarea
              rows={3}
              required
              withAsterisk={false}
              placeholder={t("user.contact-form.message.label")}
              variant="unstyled"
              classNames={{
                input: "px-1 mt-[4px]",
                label: " border-b w-full border-b-[#F3F3F3] px-1 py-[12px]",
                error: "px-1   mb-0.5 ",
              }}
              label={
                <Group gap={"xs"} component={"span"}>
                  <Mail strokeWidth={1.25} className="text-primary" />
                  {t("user.contact-form.message.placeholder")}
                </Group>
              }
            />
          </div>

          <Text className="md:text-lg" c={"#767676"}>
            {t("user.contact-form.description")}
          </Text>
          <Space />
          <Button type="submit" loading={form.submitting}>
            {t("user.contact-form.submit")}
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

export default ContactForm
