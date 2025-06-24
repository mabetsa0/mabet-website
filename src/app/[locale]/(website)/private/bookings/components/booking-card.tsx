"use client"
import { RiyalIcon } from "@/components/icons"
import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import {
  Badge,
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
import {
  Circle,
  Clock,
  Gift,
  HandCoins,
  LogIn,
  LogOut,
  MapPin,
  QrCode,
  Wallet,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { Booking } from "../@types"
import { useDisclosure } from "@mantine/hooks"
import ModalDrawer from "@/components/common/modal-drawer"
import AddReview from "./add-review"
import { logo } from "@/assets"

type Props = Booking

const BookingCard = (booking: Props) => {
  const unit = booking.unit
  const t = useTranslations("booking-card")

  const [showReviewModal, reviewModalHandlers] = useDisclosure()
  const [arrivalInstructionsModal, arrivalInstructionsModalHandlers] =
    useDisclosure()

  const contactNumber = booking.arrival_instructions
    ? booking.arrival_instructions.filter((e) => {
        return e.content_type === "phone"
      })
    : false
  return (
    <>
      <Card
        padding="xs"
        radius="md"
        withBorder
        className={cn("border-[#F3F3F3] w-full")}
      >
        <div className="  aspect-[4/3] h-[230px] w-full overflow-hidden rounded relative">
          <Badge
            autoContrast
            color={booking.status.bg_color}
            size="lg"
            radius={"0"}
            className="border border-white absolute top-0 right-0  rounded-bl-md "
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
            className="border border-white absolute top-0 left-0  rounded-br-md "
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
              className={"absolute bottom-0 right-0"}
            >
              {t("add-review")}
            </Button>
          ) : null}
          {/* {booking.arrival_instructions?.length &&
          booking.arrival_instructions.length > 0 ? ( */}
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
          {/* ) : null} */}

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
        size="lg"
        state={arrivalInstructionsModal}
        onClose={arrivalInstructionsModalHandlers.close}
        title={t("arrival_instructions")}
      >
        <Stack className=" py-0.5">
          <Text className="text-xl font-medium " c={"#767676"}>
            {t("arrival_instructions-description")}
          </Text>

          {contactNumber
            ? contactNumber.map((e, i) => {
                return (
                  <div
                    className="flex items-center gap-[12px] rounded-md bg-gray-150/50 px-0.5 py-[12px] text-gray-500"
                    key={e.content + e.label + i}
                  >
                    <Image src={logo} alt="mabet" className="w-3.5" />
                    <div>
                      <p>{e.label}</p>
                      <p>{e.content}</p>
                    </div>
                  </div>
                )
              })
            : null}

          {booking.arrival_instructions?.map((e, i) => {
            if (e.content_type === "phone" || e.content_type === "image")
              return null
            return (
              <div
                className="flex items-center gap-[12px] rounded-md bg-gray-150/50 px-0.5 py-[12px] text-gray-500"
                key={e.content + e.label + i}
              >
                <Image src={logo} alt="mabet" className="w-3.5" />
                <div>
                  <p>{e.label}</p>
                  <p>{e.content}</p>
                </div>
              </div>
            )
          })}
          {booking.arrival_instructions?.map((e, i) => {
            if (e.content_type !== "image") return null
            return (
              <div className="" key={i}>
                <p className="flex items-start gap-[12px] py-1">
                  <Circle className="mt-[4px] w-[20px] shrink-0 text-primary" />{" "}
                  <span>{e.label}</span>
                </p>
                <img src={e.content} className="w-full" alt="image" />
              </div>
            )
          })}
        </Stack>
      </ModalDrawer>
    </>
  )
}

export default BookingCard
