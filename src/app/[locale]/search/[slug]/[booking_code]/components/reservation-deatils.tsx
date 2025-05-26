/* eslint-disable @next/next/no-img-element */
"use client"
import { RiyalIcon } from "@/components/icons"
import {
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core"
import { MapPin, QrCode, Star, X } from "lucide-react"
import { useTranslations } from "next-intl"
import DateSelect from "../../components/date-select"
import { BookingDetails } from "../payment-summary"
import { useUnitData } from "../../context/unit-context"

const ReservationDetails = ({ prices }: { prices: BookingDetails }) => {
  const t = useTranslations()
  const unit = useUnitData()
  return (
    <Card
      className="border-[#F3F3F3] [box-shadow:_0px_12px_20px_0px_#0000000A]"
      padding="md"
      radius="md"
      withBorder
    >
      <Card.Section
        className="border-[#F3F3F3]"
        px={24}
        pt={24}
        pb={12}
        withBorder
      >
        <Group align="start">
          <div className="h-[120px] w-[120px] rounded-md overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={unit.images[0].image_path}
              alt={unit.images[0].alt}
            />
          </div>
          <Stack>
            <h3 className="text-h5 font-bold line-clamp-1">{unit.name}</h3>
            <Stack gap={4}>
              <Text c={"#767676"}>
                <QrCode
                  className="inline-block me-0.5"
                  size={22}
                  strokeWidth={1.25}
                />
                {unit.code}
              </Text>
              {unit.stars ? (
                <Text c={"#767676"}>
                  <Star
                    className="inline-block me-0.5"
                    size={22}
                    strokeWidth={1.25}
                  />
                  {unit.stars}
                </Text>
              ) : null}
              <Text c={"#767676"}>
                <MapPin
                  className="inline-block me-0.5"
                  size={22}
                  strokeWidth={1.25}
                />
                {unit.location}
              </Text>
            </Stack>
          </Stack>
        </Group>
      </Card.Section>

      <Card.Section
        className="border-[#F3F3F3]"
        px={24}
        pt={24}
        pb={12}
        withBorder
      ></Card.Section>

      <Card.Section
        className="border-[#F3F3F3]"
        px={24}
        pt={24}
        pb={12}
        withBorder
      >
        <DateSelect
          initialValues={{
            from: new Date(prices.from),
            to: new Date(prices.to),
          }}
          readOnly
        />
      </Card.Section>

      {prices ? (
        <Card.Section
          className="border-[#F3F3F3]"
          px={24}
          pt={24}
          pb={12}
          withBorder
        >
          <Stack>
            <SimpleGrid cols={2}>
              <Group gap={"3"}>
                {prices.duration}{" "}
                <X className="text-primary" strokeWidth={4} size={20} />{" "}
                <Text fw={500}>
                  {prices.night_price} <RiyalIcon />
                </Text>
              </Group>
              <Text ta="end" c="#767676">
                <span className="text-primary">{prices.total}</span>
                <RiyalIcon />
              </Text>
            </SimpleGrid>

            {prices.discount ? (
              <SimpleGrid cols={2}>
                <Group gap={3}>
                  <Text fw={500}>{t("general.discount")}</Text>
                  <div className="w-[39px] rounded text-xs text-[#E8123D] font-bold h-[39px] flex items-center justify-center bg-[#E8123D26] shrink-0">
                    {prices.discount_percent}
                  </div>
                </Group>

                <Text ta="end" c="red">
                  - {prices.discount_amount}
                  <RiyalIcon />
                </Text>
              </SimpleGrid>
            ) : null}
            <SimpleGrid cols={2}>
              <Text>{t("general.customer-fees")}</Text>

              <Text ta="end" c="#767676">
                {(
                  parseFloat(prices.customer_fees) +
                  Number(prices.customer_fees)
                ).toFixed(2)}
                <RiyalIcon />
              </Text>
            </SimpleGrid>
            <Divider />
            <SimpleGrid cols={2}>
              <Text fw={700}>{t("general.total-price")}</Text>

              <Text ta="end" fw={700}>
                {prices.full_payment}
                <RiyalIcon />
              </Text>
            </SimpleGrid>
            <Space />
            <Space />
            <Button>
              {t("unit.create-booking", { value: prices.full_payment })}
              <RiyalIcon />
            </Button>
            <Text c={"#767676"} ta={"center"}>
              {t("unit.down-payment")} {prices.down_payment} <RiyalIcon />{" "}
            </Text>
          </Stack>
        </Card.Section>
      ) : null}
    </Card>
  )
}

export default ReservationDetails
