import { notFound } from "next/navigation"

import { RiyalIcon } from "@/components/icons"
import BackButton from "@/components/ui/back-button"
import { Link } from "@/lib/i18n/navigation"
import {
  Box,
  Button,
  Divider,
  Group,
  SimpleGrid,
  Space,
  Spoiler,
  Stack,
  Text,
} from "@mantine/core"
import axios from "axios"
import dayjs from "dayjs"
import { MapPin, Tag } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { GetBooking } from "./helpers/get-booking"

type Props = {
  params: Promise<{
    booking_id: string
    locale: string
  }>
}

const page = async (props: Props) => {
  try {
    const params = await props.params
    dayjs.locale(params.locale)
    const booking = await GetBooking(params.booking_id)
    const unit = booking.unit
    const t = await getTranslations("booking-page")
    return (
      <Stack>
        <Space />
        <Stack>
          <Text className="text-h3 md:text-h2 font-bold">
            <BackButton
              variant="filled"
              color="primary"
              size={"lg"}
              className="me-1"
            />
            {t("title", { value: params.booking_id })}
          </Text>
          <Text className="md:text-lg">{t("description")}</Text>
        </Stack>
        <Stack gap={"lg"}>
          <Space />

          <Group align="stretch">
            <Box className="h-[140px] w-[160px] rounded-md overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={unit.images[0].image_path}
                alt={unit.images[0].alt}
              />
            </Box>
            <Stack>
              <h3 className="text-h4 md:text-h5 font-bold line-clamp-1">
                {unit.name}{" "}
                <span className="text-base font-light text-gray-500">
                  ({unit.code})
                </span>
              </h3>
              <div className="mt-auto">
                <Link
                  className=" w-full block mt-auto"
                  href={`/unit/${unit.id}`}
                >
                  <Button fullWidth variant="light" size="sm">
                    {t("view-unit")}
                  </Button>
                </Link>
              </div>
            </Stack>
          </Group>

          <Space />

          <SimpleGrid cols={2}>
            <div className=" rounded bg-green-300/15 p-[12px]">
              <p className="text-sm font-medium text-default-600">
                {t("checkin")}
              </p>
              <p className="font-medium ">{booking.checkin_text}</p>
              <p>{booking.checkin_time}</p>
            </div>
            <div className=" rounded bg-red-300/15 p-[12px]">
              <p className="text-sm font-medium text-default-600">
                {t("checkout")}
              </p>
              <p className="font-medium ">{booking.checkout_text}</p>
              <p>{booking.checkout_time}</p>
            </div>
          </SimpleGrid>
          <Divider />
          <div className="space-y-0.5">
            <p className="text-2xl">{t("unit-location")}</p>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="size-1" />
              <p>{booking.unit.location}</p>
            </div>
            <Button
              fullWidth
              className="max-w-sm"
              component={"a"}
              href={booking.maps_link}
              target="_blank"
            >
              {t("view-map")}
            </Button>
          </div>

          <Divider />

          <div className="space-y-0.5">
            <p className="text-2xl">{t("arriavl-instructions")}</p>
            {/* <Spoiler
              maxHeight={130}
              showLabel={t("show-more")}
              hideLabel={t("show-less")}
              classNames={{
                content:
                  "relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 backdrop-blur-sm  before:bg-gradient before:bg-gradient-to-t before:from-white before:to-white/0 ",
                control:
                  "bg-primary px-2.5  font-medium py-0.5 rounded-sm text-sm text-white h-2.5 block",
              }}
            > */}
            <ul className="list-inside list-disc ps-1">
              {booking.arrival_instructions.map((term, index) => (
                <li key={index}>
                  {term.label}{" "}
                  {term.content_type === "phone" && (
                    <a href={`tel:+966${term.content}`}>{term.content}</a>
                  )}
                </li>
              ))}
            </ul>
            {/* </Spoiler> */}
          </div>
          <div className="space-y-0.5 bg-gray-50 p-0.5 rounded">
            <p className="text-2xl">{t("owner-information")}</p>
            <p className="ms-1">
              {t("owner-name")}: {booking.partner.name}
            </p>
            <p className="ms-1">
              {t("owner-number")} :{" "}
              <a
                className="text-primary"
                href={`tel:+966${booking.partner.phone}`}
              >
                {booking.partner.phone}
              </a>
            </p>
          </div>
          <Divider />

          <div className="space-y-[12px]">
            <p className="text-2xl">{t("booking-details")}</p>

            <div className="flex items-center justify-between gap-1">
              <p>{t("night-price")}</p>
              <span className="font-bold">
                {booking.night_price} <RiyalIcon />
              </span>
            </div>

            <div className="flex items-center justify-between gap-1 text-sm text-foreground-500">
              <p>{t("nights-count")}</p>
              <span>{booking.duration}</span>
            </div>
            <div className="flex items-center justify-between gap-1 text-sm text-foreground-500">
              <p>{t("customer-fees")}</p>
              <span>{booking.customer_fees_text}</span>
            </div>
            <Divider />
            <div className="flex items-center justify-between py-1 text-lg font-bold">
              <p>{t("total")}</p>
              <span>{booking.full_payment_text}</span>
            </div>
            <div>
              <Button
                component={"a"}
                download
                href={booking.pdf_link}
                leftSection={<Tag strokeWidth={1.2} />}
                variant="light"
              >
                {t("invoice")}
              </Button>
            </div>
          </div>
          <Divider />
          <div className="space-y-0.5">
            <p className="text-2xl">{t("conditions")}</p>
            <ul className="list-inside list-disc ps-1">
              {booking.unit.terms.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-0.5">
            <p className="text-2xl">{t("cancel-policy")}</p>
            <ul className="list-inside list-disc ps-1">
              <li>{booking.cancellation_text}</li>
            </ul>
          </div>

          <Divider />
          <div className="space-y-0.5">
            <p className="text-2xl">{t("support")}</p>
            <p className="ms-1">{booking.support.label}</p>
            <ul className="list-inside list-disc ps-1">
              {booking.support.links.map((link, index) => (
                <li key={index} className="flex items-center underline">
                  <a
                    target="_blank"
                    href={link.link}
                    className="flex items-center gap-2"
                  >
                    <img className="size-1" src={link.icon_svg} alt="" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Stack>
      </Stack>
    )
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("🚀 ~ page ~ error:", error.response.data)
      notFound()
    }
    return <div>ERROR</div>
  }
}

export default page
