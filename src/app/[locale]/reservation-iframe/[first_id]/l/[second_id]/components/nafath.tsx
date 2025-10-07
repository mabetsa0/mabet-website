/* eslint-disable @next/next/no-img-element */
"use client"
import Mabet from "@/services"
import {
  Button,
  Group,
  List,
  Modal,
  NumberInput,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import dayjs from "dayjs"
import { Check, IdCard } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import useCountDown from "react-countdown-hook"
import { useNafath } from "../stores/use-nafath"

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

const NafathModal = () => {
  const params = useParams()
  const t = useTranslations("nafath")

  // modal state
  const { opened, onClose, national_id, number, time, update } = useNafath()

  // input state
  const [value, setValue] = useState<number | string>()
  // send request
  const {
    mutate: sendRequest,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({ value }: { value: number | string }) => {
      const response = await Mabet.post<NafathResponse>(
        `/iframe-reservations/${params.first_id}/l/${params.second_id}/nafath/send-request?national_id=${value}`,
        {
          national_id: value,
        }
      )
      return response.data
    },
    onSuccess: (data, { value }) => {
      update({
        number: data.data.nafathResponse.random,
        time: dayjs().add(1, "m").valueOf(),
        national_id: value as string,
      })
    },
  })

  // countdown
  const [timeLeft, actions] = useCountDown(
    dayjs(time).diff(dayjs()) > 0 ? Math.floor(dayjs(time).diff(dayjs())) : 0,
    1000
  )
  // start countdown
  useEffect(() => {
    actions.start()
  }, [actions])

  // check request
  const { data: nafathData } = useQuery({
    queryKey: ["nafath", number],
    enabled: !!number,
    queryFn: () => {
      return Mabet.post<{
        token: boolean
      }>(
        `iframe-reservations/${params.first_id}/l/${params.second_id}/nafath/check-request`,
        {
          national_id: national_id,
        }
      )
    },
    refetchInterval: 3500,
  })
  // close modal if request is successful
  useEffect(() => {
    if (nafathData?.data.token) {
      onClose()
    }
  }, [nafathData, onClose])

  // edit national id
  const editNationalId = () => {
    update(null)
  }

  return (
    <Modal title={t("title")} opened={opened} onClose={onClose}>
      <div className=" md:rtl:pr-1.5 md:ltr:pl-1.5 py-2 max-w-[400px]">
        {number ? (
          <Stack>
            <Stack gap={"xs"}>
              <Text className="text-h4 font-bold text-primary">
                {t("random.title")}
              </Text>
              <Text c={"#767676"}>{t("random.description")}</Text>
            </Stack>
            <Space />
            <Stack align="center" justify="center">
              <Text className="text-h2 text-primary font-bold  mt-1 border border-primary rounded-md p-1 ">
                {number}
              </Text>
            </Stack>
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />

            <SimpleGrid cols={2}>
              <Button
                loading={isPending}
                onClick={() => {
                  sendRequest({ value: value as number })
                }}
                disabled={timeLeft > 0}
              >
                {t("random.button")}
                {timeLeft > 0
                  ? `${Math.floor(timeLeft / 1000).toFixed(0)}s`
                  : ""}
              </Button>
              <Button onClick={editNationalId} color="dark" variant="outline">
                {t("random.button-2")}
              </Button>
            </SimpleGrid>
          </Stack>
        ) : (
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
                inputMode="numeric"
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
              <Button
                loading={isPending}
                onClick={() => {
                  if (value) {
                    sendRequest({ value: value as number })
                  }
                }}
                fullWidth
              >
                {t("button")}
              </Button>
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
        )}
      </div>
    </Modal>
  )
}

export default NafathModal
