/* eslint-disable @next/next/no-img-element */
"use client"
import { Unit } from "@/@types"
import { fallingStar, sharpShape } from "@/assets"
import useFavorite from "@/hooks/use-favorite"
import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import { Carousel } from "@mantine/carousel"
import {
  ActionIcon,
  Badge,
  Card,
  Divider,
  Group,
  Image,
  lighten,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import dayjs from "dayjs"
import {
  Bath,
  BedSingle,
  Expand,
  Heart,
  MapPin,
  QrCode,
  Users,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { parseAsString, useQueryStates } from "nuqs"
import { RiyalIcon } from "../icons"

const UnitCard = (props: Unit & { className?: string }) => {
  const t = useTranslations("unit-card")

  const { mutate, isPending, isFavorite } = useFavorite({
    is_favourite: props.is_favourite,
    id: props.id,
  })

  const [dates] = useQueryStates({
    from: parseAsString.withDefault(dayjs().format("YYYY-MM-DD")),
    to: parseAsString.withDefault(dayjs().add(1, "days").format("YYYY-MM-DD")),
  })
  return (
    <Card
      padding="xs"
      radius="md"
      withBorder
      className={cn(
        "border-[#F3F3F3] w-full max-w-[95vw] sm:max-w-[400px]",
        props.className
      )}
    >
      <div className=" aspect-[4/3] w-full overflow-hidden rounded relative">
        <ActionIcon
          className="absolute top-0 left-0 z-10"
          variant="light"
          color="white"
          size={"lg"}
          loading={isPending}
          onClick={() => mutate()}
        >
          <Heart
            fill={isFavorite ? "red" : "white"}
            color={isFavorite ? "red" : "white"}
          />
        </ActionIcon>
        <Badge
          leftSection={<img src={fallingStar.src} alt="stars" />}
          size="lg"
          radius={"0"}
          className="border border-white absolute top-0 right-0 z-10 rounded-bl-md "
        >
          {props.stars || "00"}{" "}
          {props.reviews_count ? `${props.reviews_count_text}` : ""}
        </Badge>
        <Carousel
          slideSize={"100%"}
          h={"100%"}
          slideGap={"lg"}
          loop
          align="start"
          withControls={false}
          withIndicators
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
          classNames={{
            indicator:
              "!w-[8px] !h-[8px] rounded-full data-[active]:!w-[16px] data-[active]:!h-[16px] duration-250",
            indicators: " flex items-center",
          }}
        >
          {props.images.map((image, index) => (
            <Carousel.Slide className="w-full aspect-[4/3] " key={index}>
              <div className="w-full aspect-[4/3]  ">
                <Image
                  loading="lazy"
                  className="w-full h-full object-cover"
                  src={image.image_path}
                  alt={image.alt}
                />
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <Link href={`/units/${props.slug}?from=${dates.from}&to=${dates.to}`}>
        <Stack className="grow" gap={4}>
          <Title className="truncate" order={5} mt={"8px"}>
            {props.name}
          </Title>
          <Group className="text-[#767676] " align="center" gap={"4"}>
            <QrCode size={18} strokeWidth={1.25} />
            <Text className="text-sm">{props.code}</Text>
          </Group>
          <Group className="text-[#767676] " align="center" gap={"4"}>
            <MapPin size={18} strokeWidth={1.25} />
            <Text className="text-sm">{props.location}</Text>
          </Group>
          <Space />
          <Group justify="space-between">
            {props.prices ? (
              <div>
                <Group gap={"4"}>
                  <Title order={5} c={"#188078"}>
                    {props.prices?.price_plain}
                    <RiyalIcon />
                  </Title>
                  <Text className="text-[#767676] text-sm">
                    /{props.prices?.duration_text}
                  </Text>
                </Group>
                {props.prices?.discount ? (
                  <Text className="text-[#767676] text-[12px]  line-through">
                    {" "}
                    {Number(props.prices.sub_price)} <RiyalIcon />
                    <span className="text-[10px]">
                      /{props.prices.duration_text}
                    </span>
                  </Text>
                ) : null}
              </div>
            ) : (
              <div>{/* <Text c={"red"}>{t("not-avalibel")}</Text> */}</div>
            )}
            <div>
              {props.prices?.discount ? (
                <Badge
                  h={40}
                  className="p-[4px] min-w-[120px] relative !rounded-e-[0]   rounded-s-md !border-0 "
                  classNames={{
                    label: "text-start text-xs",
                  }}
                  size="xl"
                  color={"#E8123D26"}
                  style={{
                    color: "#E8123D",
                  }}
                  leftSection={
                    <div className=" font-bold text-xs bg-white p-[4px] rounded-[5px] w-[32px] aspect-square flex items-center justify-center">
                      {props.prices.discount_percent_text}%
                    </div>
                  }
                >
                  {props.prices.discount_amount} <RiyalIcon />
                  <img
                    alt="sharp"
                    src={sharpShape.src}
                    className=" ltr:scale-x-[-1]  absolute end-0 top-0 bottom-0"
                  />
                </Badge>
              ) : props.badge?.border_color ? (
                <Badge
                  h={40}
                  className="p-[4px] min-w-[120px] relative !rounded-e-[0]   rounded-s-md !border-0 "
                  classNames={{
                    label: "text-start",
                  }}
                  size="xl"
                  color={lighten(props.badge.border_color, 0.25)}
                  style={{
                    color: "white",
                  }}
                  leftSection={
                    <div className=" bg-white p-[4px] rounded-[5px] w-[32px] aspect-square flex items-center justify-center">
                      <img
                        className="w-full"
                        src={props.badge.icon}
                        alt="icon"
                      />
                    </div>
                  }
                >
                  {props.badge.text}{" "}
                  <img
                    alt="sharp"
                    src={sharpShape.src}
                    className=" ltr:scale-x-[-1] absolute end-0 top-0 bottom-0"
                  />
                </Badge>
              ) : null}
            </div>
          </Group>
          <Space />
          <Divider mt={"auto"} />
          <Space />
          <Stack gap={"xs"}>
            <Text className="text-sm font-medium">{t("features")}</Text>
            <Group
              justify="space-evenly"
              wrap="nowrap"
              gap={"sm"}
              className="text-xs text-[#767676]"
            >
              <Group gap={"4"} wrap="nowrap">
                <Users width={16} strokeWidth={1.25} className="text-primary" />
                <span className=" whitespace-nowrap">
                  {props.unit_for_sentence}
                </span>
              </Group>
              <Divider orientation="vertical" />
              <Group gap={"4"} wrap="nowrap">
                <Expand
                  width={16}
                  strokeWidth={1.25}
                  className="text-primary"
                />
                <span className=" whitespace-nowrap">{props.area}</span>
              </Group>
              <Divider orientation="vertical" />
              <Group gap={"4"} wrap="nowrap">
                <BedSingle
                  width={16}
                  strokeWidth={1.25}
                  className="text-primary"
                />
                <span className=" whitespace-nowrap">
                  {props.unit_content.find((e) => e.key === "bedrooms")
                    ?.count || 0}{" "}
                  {t("bedrooms")}
                </span>
              </Group>
              <Divider orientation="vertical" />
              <Group gap={"4"} wrap="nowrap">
                <Bath width={16} strokeWidth={1.25} className="text-primary" />
                <span className=" whitespace-nowrap">
                  {props.unit_content.find((e) => e.key === "toilets")?.count ||
                    0}{" "}
                  {t("toilets")}
                </span>
              </Group>
            </Group>
          </Stack>
          {props.label ? (
            <>
              <Divider />
              <Text
                fz={"xs"}
                pt={"4"}
                ta={"center"}
                fw={"700"}
                c={props.label.bg_color}
              >
                {props.label.text}
              </Text>
            </>
          ) : null}
        </Stack>
      </Link>
    </Card>
  )
}

export default UnitCard
