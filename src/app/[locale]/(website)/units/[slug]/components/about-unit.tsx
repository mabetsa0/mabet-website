/* eslint-disable @next/next/no-img-element */
import { useTranslations } from "next-intl"
import { Group, Stack, Text } from "@mantine/core"
import { Expand, MapPin, Star, Users } from "lucide-react"
import { useUnitData } from "../context/unit-context"

const AboutUnit = () => {
  const unit = useUnitData()
  const t = useTranslations()
  return (
    <Stack>
      <h3 className="text-h4 md:text-h3 hidden font-medium md:block">
        {t("unit.about-unit")}
      </h3>
      <Stack gap={"md"}>
        {unit.stars ? (
          <Group align="start" wrap="nowrap">
            <Star strokeWidth={1.25} />
            <div>
              <Text className="text-xl font-medium">{t("unit.ratings")}</Text>
              <Text className="text-[#767676]">
                {t("unit.ratings-message", {
                  number: unit.reviews_count,
                })}{" "}
                <span className="text-primary font-medium">({unit.stars})</span>
              </Text>
            </div>
          </Group>
        ) : null}
        <Group align="start" wrap="nowrap">
          <MapPin strokeWidth={1.25} />
          <div>
            <Text className="text-xl font-medium">{t("unit.location")}</Text>
            <Text className="text-[#767676]">{unit.location}</Text>
          </div>
        </Group>
        <Group align="start" wrap="nowrap">
          <Expand strokeWidth={1.25} />
          <div>
            <Text className="text-xl font-medium">{t("unit.area")}</Text>
            <Text className="text-[#767676]">
              {t("unit.area-message")}{" "}
              <span className="text-primary font-medium">{unit.area}</span>
            </Text>
          </div>
        </Group>
        <Group align="start" wrap="nowrap">
          <Users strokeWidth={1.25} />
          <div>
            <Text className="text-xl font-medium">{t("unit.unit-for")}</Text>
            <Text className="text-[#767676]">
              {t("unit.unit-for-message")}{" "}
              <span className="text-primary font-medium">
                {unit.unit_for_sentence}
              </span>
            </Text>
          </div>
        </Group>
      </Stack>
    </Stack>
  )
}

export default AboutUnit
