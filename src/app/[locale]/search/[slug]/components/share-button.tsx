"use client"

import { ActionIcon, Button } from "@mantine/core"
import { Share } from "lucide-react"
import { useTranslations } from "next-intl"
import { useUnitData } from "../context/unit-context"

const ShareButton = () => {
  const unit = useUnitData()
  const t = useTranslations()
  const share = async () => {
    const shareData = {
      title: unit.name,
      text: `تمتع بافضل خدمة ممكنة في ${unit.name} `,
      url: window.location.href,
    }
    try {
      if (!window.navigator.share) return
      await navigator.share(shareData)
    } catch (err) {
      console.log("🚀 ~ share ~ err:", err)
    }
  }

  return (
    <>
      <Button
        leftSection={<Share strokeWidth={1.25} />}
        visibleFrom="md"
        variant="outline"
        color="dark"
        className="border-[#F3F3F3]"
        onClick={share}
      >
        {t("general.share")}
      </Button>
      <ActionIcon
        hiddenFrom="md"
        variant="outline"
        color="dark"
        className="border-[#F3F3F3]"
        onClick={share}
      >
        <Share strokeWidth={1.25} />
      </ActionIcon>
    </>
  )
}

export default ShareButton
