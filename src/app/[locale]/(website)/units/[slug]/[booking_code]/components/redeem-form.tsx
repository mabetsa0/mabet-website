"use client"
import { stc } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import { CustomNumberInput } from "@/components/ui/number-input"
import { Button, Group, Stack, Text } from "@mantine/core"
import { useTranslations } from "next-intl"
import { useMemo, useState } from "react"

type RedeemFormProps = {
  availablePoints: number
  onConfirm: (pointsToRedeem: number) => void
  conversionRate?: number // points to SAR, default 1:1
}

const RedeemForm = ({
  availablePoints,
  onConfirm,
  conversionRate = 1,
}: RedeemFormProps) => {
  const t = useTranslations("unit.stc-redeem-form")
  const [pointsToRedeem, setPointsToRedeem] = useState<number | "">("")

  const sanitizedValue = useMemo(() => {
    const n = typeof pointsToRedeem === "number" ? pointsToRedeem : 0
    if (!Number.isFinite(n) || n < 0) return 0
    return Math.min(n, Math.max(0, availablePoints))
  }, [pointsToRedeem, availablePoints])

  const sarPreview = useMemo(
    () => sanitizedValue * conversionRate,
    [sanitizedValue, conversionRate]
  )
  const isDisabled = sanitizedValue <= 0

  return (
    <Stack gap="md" p={"xl"}>
      <img className="h-2.5" src={stc.src} alt="STC" />
      <Text size="lg" fw={500} ta={"center"}>
        {t("you-have-points", { points: availablePoints.toLocaleString() })}
      </Text>

      <Stack gap={4}>
        <Text size="sm" c="#767676">
          {t("points-to-redeem")}
        </Text>
        <CustomNumberInput
          value={pointsToRedeem}
          onChange={(value) =>
            setPointsToRedeem(
              typeof value === "number"
                ? value
                : value === ""
                  ? ""
                  : Number(value)
            )
          }
          min={0}
          max={Math.max(0, availablePoints)}
          thousandSeparator
        />
      </Stack>

      <Group justify="space-between">
        <Text className="text-lg">{t("you-will-get")}</Text>
        <Text className="text-xl font-bold">
          {sarPreview.toLocaleString()} <RiyalIcon />
        </Text>
      </Group>

      <Button
        size="md"
        disabled={isDisabled}
        onClick={() => onConfirm(sanitizedValue)}
      >
        {t("confirm")}
      </Button>
    </Stack>
  )
}

export default RedeemForm
