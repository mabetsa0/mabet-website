"use client"

import React, { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Box, Button, Stack, Text, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useQueryClient } from "@tanstack/react-query"
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs"
import { CustomNumberInput } from "@/components/ui/number-input"
import Mabet from "@/services"
import { handleFormError } from "@/utils/handle-form-errors"

type Props = {
  bookingCode: string
  handleClose: () => void
}

const AddReview = ({ bookingCode, handleClose }: Props) => {
  const t = useTranslations("booking-card")
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      cleanliness: 10,
      conformity: 10,
      service: 10,
      place_condition: 10,
      comment: "",
    },
  })

  const queryClient = useQueryClient()
  const [{ type, page }] = useQueryStates({
    type: parseAsString.withDefault("upcoming"),
    page: parseAsInteger.withDefault(1),
  })

  const onSubmit = form.onSubmit(async (values) => {
    try {
      await Mabet.post(`/account/bookings/${bookingCode}/add-review`, values)
      queryClient.invalidateQueries({ queryKey: ["reservations", type, page] })
      handleClose()
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <Box className="p-1">
      <form onSubmit={onSubmit}>
        <Stack>
          <CustomNumberInput
            label={t("cleanliness")}
            key={form.key("cleanliness")}
            {...form.getInputProps("cleanliness")}
            max={10}
          />
          <CustomNumberInput
            label={t("conformity")}
            key={form.key("conformity")}
            {...form.getInputProps("conformity")}
            max={10}
          />
          <CustomNumberInput
            label={t("service")}
            key={form.key("service")}
            {...form.getInputProps("service")}
            max={10}
          />
          <CustomNumberInput
            label={t("place_condition")}
            key={form.key("place_condition")}
            {...form.getInputProps("place_condition")}
            max={10}
          />

          <Textarea
            placeholder={t("your-comment")}
            label={t("your-comment-placeholder")}
            key={form.key("comment")}
            {...form.getInputProps("comment")}
          />

          <div className="flex justify-center pt-1">
            <Button type="submit" loading={form.submitting}>
              {t("add-review")}
            </Button>
            {form.errors.root && (
              <Text ta={"center"} size="sm" c={"red"}>
                {form.errors.root}
              </Text>
            )}
          </div>
        </Stack>
      </form>
    </Box>
  )
}

export default AddReview
