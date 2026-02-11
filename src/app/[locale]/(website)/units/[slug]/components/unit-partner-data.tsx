"use client"
import { useTranslations } from "next-intl"
import { Avatar, Button, Group, Stack, Text } from "@mantine/core"
import { ArrowLeft, Star } from "lucide-react"
import { Link } from "@/lib/i18n/navigation"
import { useSession } from "@/stores/session-store"
import ChatModal from "../../../user/chat/_components/chat-modal"
import { useUnitData } from "../context/unit-context"

const UnitPartnerData = () => {
  const unit = useUnitData()
  const t = useTranslations()
  return (
    <>
      {unit.partner && (
        <Stack>
          <h3 className="text-h4 md:text-h3 font-medium">
            {t("unit.partner-data")}
          </h3>
          <Group align="center" wrap="nowrap" justify="space-between">
            <Group>
              <Avatar src={""} size={60} radius="xl" />

              <Group gap="xs">
                <Text className="text-xl font-medium">{unit.partner.name}</Text>
                {unit.partner.stars && (
                  <Group gap="xs" wrap="nowrap" mt={4}>
                    <Star
                      size={16}
                      className="text-primary fill-primary"
                      strokeWidth={1.25}
                    />
                    <Text className="text-sm text-[#767676]">
                      {unit.partner.stars} · {unit.partner.reviews_count_text}
                    </Text>
                  </Group>
                )}
              </Group>
            </Group>
            <Stack>
              <Button
                component={Link}
                href={`/h/${unit.slug}`}
                rightSection={
                  <ArrowLeft className="ltr:rotate-180" strokeWidth={1.5} />
                }
                ms={"auto"}
                variant="light"
                color="primary"
                className="border-[#F3F3F3]"
              >
                {t("unit.view-profile")}
              </Button>
              <ChatModal
                topicId={unit.id.toString()}
                partnerId={unit.partner.id.toString()}
              />
            </Stack>
          </Group>
        </Stack>
      )}
    </>
  )
}

export default UnitPartnerData
