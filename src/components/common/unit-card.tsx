/* eslint-disable @next/next/no-img-element */
"use client"
import { Unit } from "@/@types"
import { Carousel } from "@mantine/carousel"
import {
  ActionIcon,
  Badge,
  Card,
  Divider,
  Group,
  Image,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core"
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
import { RiyalIcon } from "../icons"
import useFavorite from "@/hooks/use-favorite"
import { fallingStar } from "@/assets"

const UnitCard = (props: Unit) => {
  const t = useTranslations("unit-card")

  const { mutate, isPending, isFavorite } = useFavorite({
    is_favourite: props.is_favourite,
    id: props.id,
  })

  return (
    <Card
      padding="xs"
      radius="md"
      withBorder
      className="border-[#F3F3F3] w-full sm:max-w-[400px]"
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
          className="border border-white absolute top-0 right-0 z-10 rounded-bl-md"
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
          classNames={{
            indicator:
              "!w-0.5 !h-0.5 rounded-full data-[active]:!w-1 data-[active]:!h-1 duration-250",
            indicators: " flex items-center",
          }}
        >
          {props.images.map((image, index) => (
            <Carousel.Slide key={index}>
              <Image
                loading="lazy"
                className="w-full h-full object-cover"
                src={image.image_path}
                alt={image.alt}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
      <Stack gap={4}>
        <Title order={5} mt={"8px"}>
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
          <div>
            <Group gap={"4"}>
              <Title order={5} c={"#188078"}>
                {props.prices.price_plain}
                <RiyalIcon />
              </Title>
              <Text className="text-[#767676] text-sm">
                /{props.prices.duration_text}
              </Text>
            </Group>
            {props.prices.discount ? (
              <Text className="text-[#767676] text-[12px]  line-through">
                {" "}
                {Number(props.prices.sub_price)} <RiyalIcon />
                <span className="text-[10px]">
                  /{props.prices.duration_text}
                </span>
              </Text>
            ) : null}
          </div>
          <div>
            <Badge
              h={40}
              className="p-[4px] min-w-7 "
              classNames={{
                label: "text-start",
              }}
              size="xl"
              radius={"8"}
              color={props.badge.bg_color}
              style={{
                color: props.badge.color,
              }}
              leftSection={
                <div className=" bg-white p-[4px] rounded-[5px] w-2 aspect-square flex items-center justify-center">
                  <img className="w-full" src={props.badge.icon} alt="icon" />
                </div>
              }
            >
              {props.badge.text}{" "}
            </Badge>
          </div>
        </Group>
        <Space />
        <Divider />
        <Space />
        <Stack gap={"xs"}>
          <Text className="text-sm font-medium">{t("features")}</Text>
          <Group wrap="nowrap" className="text-xs text-[#767676]">
            <Group gap={"4"} wrap="nowrap">
              <Users width={16} strokeWidth={1.25} className="text-primary" />
              <span>{props.unit_for_sentence}</span>
            </Group>
            <Divider orientation="vertical" />
            <Group gap={"4"} wrap="nowrap">
              <Expand width={16} strokeWidth={1.25} className="text-primary" />
              <span>{props.area}</span>
            </Group>
            <Divider orientation="vertical" />
            <Group gap={"4"} wrap="nowrap">
              <BedSingle
                width={16}
                strokeWidth={1.25}
                className="text-primary"
              />
              <span>
                {props.unit_content.find((e) => e.key === "bedrooms")?.count ||
                  0}{" "}
                {t("bedrooms")}
              </span>
            </Group>
            <Divider orientation="vertical" />
            <Group gap={"4"} wrap="nowrap">
              <Bath width={16} strokeWidth={1.25} className="text-primary" />
              <span>
                {props.unit_content.find((e) => e.key === "toilets")?.count ||
                  0}{" "}
                {t("toilets")}
              </span>
            </Group>
          </Group>
        </Stack>
      </Stack>
    </Card>
  )
}

export default UnitCard
