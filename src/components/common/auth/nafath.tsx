/* eslint-disable @next/next/no-img-element */
"use client"
import { useNafath } from "@/hooks/use-nafath"
import { useTranslations } from "next-intl"
import ModalDrawer from "../modal-drawer"
import {
  Box,
  Button,
  Group,
  List,
  NumberInput,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { nafathIcon } from "@/assets"
import { Check, IdCard } from "lucide-react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import Mabet from "@/services"
import axios from "axios"

export interface NafathResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  nafathResponse: {
    transId: string
    random: string
    token_expiration: number
    deep_link: string
  }
}

const AuthModal = () => {
  const [opened, { onClose }] = useNafath()
  const [value, setValue] = useState<number | string>()
  const {
    mutate: verify,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ value }: { value: number | string }) => {
      const response = await Mabet.post<NafathResponse>(
        `/account/nafath/send-request?national_id=${value}`,
        {
          national_id: value,
        }
      )
      return response.data
    },
    onSuccess: () => {},
  })

  const t = useTranslations("nafath")
  return (
    <ModalDrawer
      title={t("title")}
      size={"992"}
      state={opened}
      onClose={onClose}
    >
      <Group align="start" wrap="nowrap" gap={"xl"}>
        <div className="md:ps-1.5 py-2 max-w-[400px]">
          <Stack>
            <Stack gap={"xs"}>
              <Text className="text-h4 font-bold text-primary">
                {t("sub-title")}
              </Text>
              <Text c={"#767676"}>{t("description")}</Text>
            </Stack>
            <div className="border border-[#F3F3F3] rounded-lg">
              <NumberInput
                value={value}
                onChange={(value) => setValue(value)}
                hideControls
                placeholder="1234567890"
                variant="unstyled"
                error={
                  axios.isAxiosError(error)
                    ? (error.response?.data as any).message
                    : null
                }
                classNames={{
                  input: "px-1 mt-[4px]",
                  label: " border-b w-full border-b-[#F3F3F3] px-1 py-[12px]",
                }}
                label={
                  <Group gap={"xs"} component={"span"}>
                    <IdCard strokeWidth={1.25} className="text-primary" />
                    {t("id-label")}
                  </Group>
                }
              />
            </div>
            <Space />
            <div className="space-y-0.5">
              <Button fullWidth>{t("button")}</Button>
              <Text size="sm" c={"#767676"}>
                {t("button-text")}
              </Text>
            </div>
            <div>
              <Text mb={"sm"} c={"#767676"}>
                {t("list-title")}
              </Text>
              <List
                icon={<Check strokeWidth={1.25} className="text-primary" />}
              >
                <List.Item>
                  <Text>{t("list-item-1")}</Text>
                </List.Item>
                <List.Item>
                  <Text>{t("list-item-2")}</Text>
                </List.Item>
                <List.Item>
                  <Text>{t("list-item-3")}</Text>
                </List.Item>
              </List>
            </div>
          </Stack>
        </div>
        <Box visibleFrom="md" className="py-2">
          <img alt="nafath" src={nafathIcon.src} />
        </Box>
      </Group>
    </ModalDrawer>
  )
}

export default AuthModal
