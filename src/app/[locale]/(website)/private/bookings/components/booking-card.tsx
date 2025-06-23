"use client"
import { RiyalIcon } from "@/components/icons"
import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import {
  Button,
  Card,
  Divider,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { Clock, HandCoins, LogIn, LogOut, QrCode, Wallet } from "lucide-react"
import { useTranslations } from "next-intl"
import { Booking } from "../@types"

type Props = Booking

const BookingCard = (booking: Props) => {
  const unit = booking.unit
  const t = useTranslations("booking-card")
  return (
    <Card
      padding="xs"
      radius="md"
      withBorder
      className={cn("border-[#F3F3F3] w-full")}
    >
      <div className=" aspect-[4/3] h-[230px] w-full overflow-hidden rounded relative">
        <div className="w-full aspect-[4/3]  ">
          <Image
            loading="lazy"
            className="w-full h-full object-cover"
            src={booking.unit.images[0].image_path}
            alt={booking.unit.images[0].alt}
          />
        </div>
      </div>

      <Stack className="grow" gap={"md"}>
        <Title className="truncate" order={5} mt={"8px"}>
          {unit.name}
        </Title>

        <Group className="text-[#767676] " align="center" gap={"4"}>
          <QrCode size={18} strokeWidth={1.25} />
          <Text className="text-sm">{unit.code}</Text>
        </Group>

        <SimpleGrid cols={2}>
          <Group className="text-[#767676] " align="center" gap={"4"}>
            <Wallet size={18} strokeWidth={1.25} />
            <Text className="text-sm">
              {t("total")}
              {booking.full_payment} <RiyalIcon />
            </Text>
          </Group>
          <Group className="text-[#767676] " align="center" gap={"4"}>
            <HandCoins size={18} strokeWidth={1.25} />
            <Text className="text-sm">
              {t("paied")}
              {booking.paid}
              <RiyalIcon />
            </Text>
          </Group>
        </SimpleGrid>

        <SimpleGrid cols={2}>
          <Group className="text-[#767676] " align="center" gap={"4"}>
            <LogIn size={18} strokeWidth={1.25} />
            <Text className="text-sm">
              {t("checkin")}
              {booking.checkin}
            </Text>
          </Group>
          <Group className="text-[#767676] " align="center" gap={"4"}>
            <LogOut size={18} strokeWidth={1.25} />
            <Text className="text-sm">
              {t("checkout")}
              {booking.checkout}
            </Text>
          </Group>
        </SimpleGrid>

        <SimpleGrid cols={2}>
          <Group className="text-[#767676] " align="center" gap={"4"}>
            <Clock size={18} strokeWidth={1.25} />
            <Text className="text-sm">
              {t("checkin-time")}
              {booking.checkin_time}
            </Text>
          </Group>
          <Group className="text-[#767676] " align="center" gap={"4"}>
            <Clock size={18} strokeWidth={1.25} />
            <Text className="text-sm">
              {t("checkout-time")}
              {booking.checkout_time}
            </Text>
          </Group>
        </SimpleGrid>
        <Divider />
        {booking.remaining ? (
          <Button fullWidth>
            {t("complete-payment", { value: booking.remaining })}
            <RiyalIcon />
          </Button>
        ) : (
          <Button fullWidth component={Link} href={`/units/${unit.id}`}>
            {t("go-to-unit")}
          </Button>
        )}
        <Button variant="outline" fullWidth component={Link} href={`/user/`}>
          {t("details")}
        </Button>
      </Stack>
    </Card>
  )
}

export default BookingCard
