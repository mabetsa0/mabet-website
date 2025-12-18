"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
  Clock,
  Gift,
  HandCoins,
  LogIn,
  LogOut,
  MapPin,
  QrCode,
  Wallet,
} from "lucide-react"
import { arrivalInstructionsImage } from "@/assets"
import ModalDrawer from "@/components/common/modal-drawer"
import { RiyalIcon } from "@/components/icons"
import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import { Booking } from "../@types"
import AddReview from "./add-review"
import ArrivalInstructions from "./arival-instruction"
import CompletePayment from "./complete-payment"

type Props = Booking

const BookingCard = (booking: Props) => {
  const unit = booking.unit
  const t = useTranslations("booking-card")

  const [showReviewModal, reviewModalHandlers] = useDisclosure()
  const [completePayment, completePaymentHandlers] = useDisclosure()
  const [arrivalInstructionsModal, arrivalInstructionsModalHandlers] =
    useDisclosure()

  return (
    <>
      <Card
        padding="xs"
        radius="md"
        withBorder
        className={cn("w-full border-[#F3F3F3]")}
      >
        <div className="relative aspect-[4/3] h-[230px] w-full overflow-hidden rounded">
          <Badge
            autoContrast
            color={booking.status.bg_color}
            size="lg"
            radius={"0"}
            className="absolute top-0 right-0 rounded-bl-md border border-white"
          >
            {booking.status.label}
          </Badge>
          <Badge
            color={"primary"}
            size="lg"
            radius={"0"}
            rightSection={
              <Gift size={18} strokeWidth={1.8} className="inline" />
            }
            className="absolute top-0 left-0 rounded-br-md border border-white"
          >
            {t("points")}
            {booking.points}
          </Badge>
          {booking.can_add_review ? (
            <Button
              onClick={reviewModalHandlers.open}
              color="yellow.4"
              size="xs"
              radius={"sm"}
              type="button"
              className={"absolute right-0 bottom-0"}
            >
              {t("add-review")}
            </Button>
          ) : null}
          {booking.arrival_instructions?.length &&
          booking.arrival_instructions.length > 0 ? (
            <div>
              <Button
                onClick={arrivalInstructionsModalHandlers.open}
                color="green.4"
                size="xs"
                radius={"sm"}
                type="button"
                className={"absolute bottom-0 left-0"}
              >
                {t("arrival_instructions")}
              </Button>
            </div>
          ) : null}

          <div className="aspect-[4/3] w-full">
            <img
              loading="lazy"
              className="h-full w-full object-cover"
              src={booking.unit.images[0].image_path}
              alt={booking.unit.images[0].alt}
            />
          </div>
        </div>

        <Stack className="grow" gap={"md"}>
          <Group py={"xs"} justify="space-between" align="center" wrap="nowrap">
            <Title className="truncate" order={5} mt={"8px"}>
              {unit.name}
            </Title>
            {booking.can_view_maps ? (
              <Button
                className="shrink-0"
                size="sm"
                variant="light"
                color="dark"
                component="a"
                target="_blank"
                leftSection={<MapPin size={20} strokeWidth={1.2} />}
                href={booking.maps_link}
              >
                {t("show-map")}
              </Button>
            ) : null}
          </Group>

          <Group className="text-[#767676]" align="center" gap={"4"}>
            <QrCode size={18} strokeWidth={1.25} />
            <Text className="text-sm">{unit.code}</Text>
          </Group>

          <SimpleGrid cols={2}>
            <Group className="text-[#767676]" align="center" gap={"4"}>
              <Wallet size={18} strokeWidth={1.25} />
              <Text className="text-sm">
                {t("total")}
                {booking.full_payment} <RiyalIcon />
              </Text>
            </Group>
            <Group className="text-[#767676]" align="center" gap={"4"}>
              <HandCoins size={18} strokeWidth={1.25} />
              <Text className="text-sm">
                {t("paied")}
                {booking.paid}
                <RiyalIcon />
              </Text>
            </Group>
          </SimpleGrid>

          <SimpleGrid cols={2}>
            <Group className="text-[#767676]" align="center" gap={"4"}>
              <LogIn size={18} strokeWidth={1.25} />
              <Text className="text-sm">
                {t("checkin")}
                {booking.checkin}
              </Text>
            </Group>
            <Group className="text-[#767676]" align="center" gap={"4"}>
              <LogOut size={18} strokeWidth={1.25} />
              <Text className="text-sm">
                {t("checkout")}
                {booking.checkout}
              </Text>
            </Group>
          </SimpleGrid>

          <SimpleGrid cols={2}>
            <Group className="text-[#767676]" align="center" gap={"4"}>
              <Clock size={18} strokeWidth={1.25} />
              <Text className="text-sm">
                {t("checkin-time")}
                {booking.checkin_time}
              </Text>
            </Group>
            <Group className="text-[#767676]" align="center" gap={"4"}>
              <Clock size={18} strokeWidth={1.25} />
              <Text className="text-sm">
                {t("checkout-time")}
                {booking.checkout_time}
              </Text>
            </Group>
          </SimpleGrid>
          <Divider />
          {booking.remaining ? (
            <Button fullWidth onClick={completePaymentHandlers.open}>
              {t("complete-payment", { value: booking.remaining })}
              <RiyalIcon />
            </Button>
          ) : (
            <Button fullWidth component={Link} href={`/units/${unit.id}`}>
              {t("go-to-unit")}
            </Button>
          )}
          <Button
            variant="outline"
            fullWidth
            component={Link}
            href={`/user/bookings/${booking.code}`}
          >
            {t("details")}
          </Button>
        </Stack>
      </Card>

      <ModalDrawer
        size={"lg"}
        state={showReviewModal}
        onClose={reviewModalHandlers.close}
        title={t("add-review")}
      >
        <AddReview
          handleClose={reviewModalHandlers.close}
          bookingCode={booking.code}
        />
      </ModalDrawer>

      <ModalDrawer
        size={"992"}
        state={arrivalInstructionsModal}
        onClose={arrivalInstructionsModalHandlers.close}
        title={t("arrival_instructions")}
      >
        <Stack className="p-1">
          <Text className="font-medium" c={"#767676"}>
            {t("arrival_instructions-description")}
          </Text>

          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <Stack>
              <ArrivalInstructions
                instructions={booking.arrival_instructions}
              />
            </Stack>
            <Box visibleFrom="sm">
              <Image
                alt="arrival instructions"
                src={arrivalInstructionsImage}
              />
            </Box>
          </SimpleGrid>
        </Stack>
      </ModalDrawer>
      <ModalDrawer
        size={"lg"}
        state={completePayment}
        onClose={completePaymentHandlers.close}
        title={t("compelet-payment")}
      >
        <CompletePayment {...booking} />
      </ModalDrawer>
    </>
  )
}

export default BookingCard
