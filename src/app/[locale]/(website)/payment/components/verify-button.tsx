"use client"
import { useNafath } from "@/hooks/use-nafath"
import { Button } from "@mantine/core"
import { Verified } from "lucide-react"
import { useTranslations } from "next-intl"

const VerifyButton = () => {
  const [_, { onOpen }] = useNafath()
  const t = useTranslations("payment-redirect-page")
  return (
    <Button leftSection={<Verified />} onClick={onOpen} variant="outline">
      {t("nafath-button")}
    </Button>
  )
}

export default VerifyButton
