"use client"
import React from "react"
import { Button, Stack, Text, TextInput, Space, Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import ModalDrawer from "@/components/common/modal-drawer"
import { useTranslations } from "next-intl"
import { useForm } from "@mantine/form"
import { Wallet, Plus } from "lucide-react"
import { RiyalIcon } from "@/components/icons"
import Mabet from "@/services"
import { handleFormError } from "@/utils/handle-form-errors"
import { notifications } from "@mantine/notifications"

type Props = {}

const AddToWallet = (props: Props) => {
  const [opened, { open, close }] = useDisclosure(false)
  const t = useTranslations()

  const form = useForm({
    initialValues: {
      amount: "",
    },
    validate: {
      amount: (value) => {
        if (!value) return t("wallet.add.amount-required")
        const numValue = parseFloat(value)
        if (isNaN(numValue) || numValue <= 0)
          return t("wallet.add.amount-invalid")
        if (numValue < 10) return t("wallet.add.minimum-amount")
        return null
      },
    },
  })

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      await Mabet.post("/account/wallet/add", {
        amount: parseFloat(values.amount),
      })

      notifications.show({
        title: t("wallet.add.success-title"),
        message: t("wallet.add.success-message"),
        color: "green",
      })

      form.reset()
      close()

      // Optionally refresh the wallet data
      // You might want to invalidate the wallet query here
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <>
      <Button
        onClick={open}
        leftSection={<Plus size={16} />}
        variant="filled"
        color="primary"
        size="md"
      >
        {t("wallet.add.button")}
      </Button>

      <ModalDrawer
        title={t("wallet.add.title")}
        state={opened}
        onClose={close}
        size="md"
      >
        <form onSubmit={handleSubmit}>
          <Stack p="md" gap="lg">
            <Stack gap="xs">
              <Text className="text-h4 font-bold text-primary">
                {t("wallet.add.subtitle")}
              </Text>
              <Text c="#767676" size="sm">
                {t("wallet.add.description")}
              </Text>
            </Stack>

            <Space />
            <div className="border border-[#F3F3F3] rounded-lg">
              <TextInput
                required
                withAsterisk={false}
                type="number"
                placeholder="0.00"
                variant="unstyled"
                classNames={{
                  input: "px-1 mt-[4px]",
                  label: " border-b w-full border-b-[#F3F3F3] px-1 py-[12px]",
                  error: "px-1   mb-0.5 ",
                }}
                label={
                  <Group gap="xs" component="span">
                    <Wallet strokeWidth={1.25} className="text-primary" />
                    {t("wallet.add.amount-label")}
                  </Group>
                }
                rightSection={<RiyalIcon />}
                key={form.key("amount")}
                {...form.getInputProps("amount")}
              />
            </div>
            <Space />

            <Group gap="xs" wrap="nowrap">
              <Button
                type="submit"
                loading={form.submitting}
                fullWidth
                leftSection={<Plus size={16} />}
              >
                {t("wallet.add.submit-button")}
              </Button>
            </Group>

            {form.errors.root && (
              <Text className="text-sm" c="red" ta="center">
                {form.errors.root}
              </Text>
            )}
          </Stack>
        </form>
      </ModalDrawer>
    </>
  )
}

export default AddToWallet
