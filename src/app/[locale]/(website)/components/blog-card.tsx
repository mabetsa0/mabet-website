import { Blog } from "@/@types/blogs"
import { Button, Card, Image, Text, Title } from "@mantine/core"
import dayjs from "dayjs"
import "dayjs/locale/ar"
import { ChevronLeft } from "lucide-react"
import { getLocale, getTranslations } from "next-intl/server"
import Link from "next/link"

export default async function BlogCard(props: Blog) {
  const locale = await getLocale()
  const t = await getTranslations("home.blogs.card")

  return (
    <Card
      padding="xs"
      radius="md"
      withBorder
      className={"border-[#F3F3F3] w-full sm:max-w-[400px]"}
    >
      <div className="h-[290px]">
        <Image
          radius={"md"}
          src={props.coverImage}
          className="w-full h-full  object-cover"
          alt={props.title}
        />
      </div>
      <Title mt={"sm"} order={5}>
        {props.title}
      </Title>
      <Text c={"#767676"} lineClamp={2}>
        {props.excerpt}
      </Text>
      <Text mt={"xs"} fz={"xs"} c={"#767676"}>
        {" "}
        {dayjs(props.date).locale(locale).format("DD MMM, YYYY")}{" "}
      </Text>
      <div className="mt-1">
        <Link href={`/blog/${props.slug}`}>
          <Button
            variant="transparent"
            rightSection={<ChevronLeft className="ltr:rotate-180" />}
          >
            {t("continue")}
          </Button>
        </Link>
      </div>
    </Card>
  )
}
