/* eslint-disable @next/next/no-img-element */
import { Group, Stack, Text } from "@mantine/core"
import { Expand, MapPin, Star, Users } from "lucide-react"
import { useTranslations } from "next-intl"
import { useUnitData } from "../context/unit-context"

const AboutUnit = () => {
  const unit = useUnitData()
  const t = useTranslations()
  return (
    <Stack>
      <h3 className="text-h4 md:text-h3 font-medium">{t("unit.about-unit")}</h3>
      <Stack gap={"md"}>
        {unit.stars ? (
          <Group align="start">
            <Star strokeWidth={1.25} />
            <div>
              <Text className="text-xl font-medium">{t("unit.ratings")}</Text>
              <Text className="text-[#767676]">
                {t("unit.ratings-message", {
                  number: unit.reviews_count,
                  value: unit.stars,
                })}
              </Text>
            </div>
          </Group>
        ) : null}
        <Group align="start">
          <MapPin strokeWidth={1.25} />
          <div>
            <Text className="text-xl font-medium">{t("unit.location")}</Text>
            <Text className="text-[#767676]">{unit.location}</Text>
          </div>
        </Group>
        <Group align="start">
          <Expand strokeWidth={1.25} />
          <div>
            <Text className="text-xl font-medium">{t("unit.area")}</Text>
            <Text className="text-[#767676]">
              {t("unit.area-message")}{" "}
              <span className="font-medium text-primary">{unit.area}</span>
            </Text>
          </div>
        </Group>
        <Group align="start">
          <Users strokeWidth={1.25} />
          <div>
            <Text className="text-xl font-medium">{t("unit.unit-for")}</Text>
            <Text className="text-[#767676]">
              {t("unit.unit-for-message")}{" "}
              <span className="font-medium text-primary">
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
