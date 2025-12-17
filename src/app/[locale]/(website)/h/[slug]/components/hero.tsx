import { getTranslations } from "next-intl/server"
import { Avatar, Group, Image, Stack, Text } from "@mantine/core"
import { Building2, Calendar, MessageCircle, Star } from "lucide-react"
import { Host } from "@/@types/hot-response"
import ShareButton from "./share-button"

type Props = {
  host: Host
}

export default async function Hero({ host }: Props) {
  const t = await getTranslations("host-page")

  return (
    <section>
      <div className="container">
        <Group justify="space-between" className="py-1.5" align="center">
          <h1 className="text-h3 font-bold">{t("title")}</h1>
          <ShareButton host={host} />
        </Group>
        <div className="relative h-[400px] overflow-hidden rounded-3xl">
          <Image
            src={host.cover}
            alt={host.name}
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-4">
            <Text className="text-h3 font-bold text-white">{host.name}</Text>
          </div>
        </div>
        <Group className="translate-y-[-30%] lg:flex-nowrap" px={"md"}>
          <div className="rounded-full border-8 border-white">
            <Avatar size={110} src={host.avatar} alt={host.name} />
          </div>
          <Stack gap="xs" className="w-full lg:pt-1">
            <Text className="text-h5 text-dark font-bold">{host.name}</Text>
            <Group gap="lg" wrap="wrap">
              {/* Rating */}
              <Group gap={4} align="center">
                <Star size={20} className="fill-orange-500 text-orange-500" />
                <Text size="sm" className="text-dark">
                  {host.bio_info.stars.total} ({host.bio_info.stars.user_counts}
                  ) {t("rating")}
                </Text>
              </Group>

              {/* Average response speed */}
              <Group gap={4} align="center">
                <MessageCircle size={20} className="text-dark" />
                <Text size="sm" className="text-dark">
                  {t("average-response-speed")}:{" "}
                  <span className="text-primary font-bold">
                    {host.bio_info.reply_average.text}
                  </span>
                </Text>
              </Group>

              {/* Host since */}
              <Group gap={4} align="center">
                <Calendar size={20} className="text-dark" />
                <Text size="sm" className="text-dark">
                  {t("host-since")}:{" "}
                  <span className="text-primary font-bold">
                    {host.bio_info.since.text}
                  </span>
                </Text>
              </Group>

              {/* Number of units */}
              <Group gap={4} align="center">
                <Building2 size={20} className="text-dark" />
                <Text size="sm" className="text-dark">
                  {t("number-of-units")}:{" "}
                  <span className="text-primary font-bold">
                    {host.bio_info.units.text}
                  </span>
                </Text>
              </Group>
            </Group>
          </Stack>
        </Group>
      </div>
    </section>
  )
}
