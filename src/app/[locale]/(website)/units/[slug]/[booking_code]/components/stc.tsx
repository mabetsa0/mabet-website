/* eslint-disable @next/next/no-img-element */
import { useLocale, useTranslations } from "next-intl"
import { Checkbox, Group, Stack, Text, UnstyledButton } from "@mantine/core"
import { parseAsBoolean, useQueryState } from "nuqs"
import { stcAr, stcEn } from "@/assets"
import { cn } from "@/lib/cn"

export const STC = () => {
  const locale = useLocale()
  const stc = locale === "ar" ? stcAr : stcEn
  const [use_qitaf_points, setUseQitafPoints] = useQueryState(
    "use_qitaf_points",
    parseAsBoolean.withDefault(false)
  )
  const t = useTranslations("unit.stc-modal")
  return (
    <>
      <UnstyledButton
        onClick={() => setUseQitafPoints(!use_qitaf_points)}
        className={cn(
          "w-full rounded-md border border-[#500e74] p-0.5 shadow-lg shadow-[#500e74]",
          use_qitaf_points && "bg-[#500e74]/10"
        )}
      >
        <Group align="center" gap="lg">
          <img className="h-4" src={stc.src} alt="STC" />
          <Stack gap={"3px"}>
            <Text fw={500} size="sm">
              {t("button")}
            </Text>
            <Text size="xs" c="#767676">
              {t("description")}
            </Text>
          </Stack>
          <Checkbox
            className="ms-auto"
            size="xl"
            checked={Boolean(use_qitaf_points)}
            onChange={(e) => setUseQitafPoints(e.currentTarget.checked)}
          />
        </Group>
      </UnstyledButton>
    </>
  )
}
