import React from "react"
import { useTranslations } from "next-intl"
import { Card, Group, lighten, Space, Stack, Text } from "@mantine/core"
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  Calendar,
  File,
} from "lucide-react"
import { RiyalIcon } from "@/components/icons"
import { WalletRecord } from "../@types"

type Props = WalletRecord

const WalletCard = (props: Props) => {
  const t = useTranslations()
  return (
    <Card
      style={{
        background: lighten(props.credit_color, 0.8),
      }}
      p={"lg"}
      className="rounded-lg"
    >
      <Group align="start" wrap="nowrap">
        <div
          className="flex aspect-auto size-2.5 shrink-0 items-center justify-center rounded-md md:size-4.5 md:rounded-lg"
          style={{ background: props.credit_color }}
        >
          {Number(props.credit) < 0 ? (
            <BanknoteArrowDown className="size-1.5 text-white md:size-2" />
          ) : (
            <BanknoteArrowUp className="size-1.5 text-white md:size-2" />
          )}
        </div>
        <Group
          className="grow max-md:flex-col max-md:items-start md:justify-between"
          wrap="nowrap"
        >
          <Stack gap={"xs"}>
            <Text className="text-h4 md:text-h3 font-bold">{props.label}</Text>
            <Space />
            {props.description ? (
              <Text className="text-sm font-medium md:text-lg">
                <File
                  className="me-0.5 inline-block size-[20px] md:size-1.5"
                  strokeWidth={1.6}
                />
                {props.description}
              </Text>
            ) : null}
            <Text className="text-xs md:text-base">
              <Calendar
                className="me-0.5 inline-block size-[20px] md:size-1.5"
                strokeWidth={1.6}
              />{" "}
              {props.creation_date.text}
            </Text>
          </Stack>

          <Stack className="max-md:flex-row" gap={"xs"}>
            <Text c={props.credit_color} className="text-lg font-medium">
              {t("wallet.card.total")}
            </Text>
            <Text
              c={props.credit_color}
              className="text-h5 md:text-h4 font-bold"
            >
              {props.credit} <RiyalIcon />
            </Text>
          </Stack>
        </Group>
      </Group>
    </Card>
  )
}

export default WalletCard
