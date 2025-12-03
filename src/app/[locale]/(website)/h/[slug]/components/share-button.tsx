"use client"

import { useTranslations } from "next-intl"
import { ActionIcon, Button, ButtonVariant } from "@mantine/core"
import { Share } from "lucide-react"
import { Host } from "@/@types/hot-response"

const ShareButton = ({
  variant,
  host,
}: {
  variant?: ButtonVariant
  host: Host
}) => {
  const t = useTranslations()
  const share = async () => {
    const shareData = {
      title: host.name,
      text: t("host-page.share-text", { hostName: host.name }),
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
        variant={variant || "outline"}
        color="dark"
        className="border-[#F3F3F3]"
        onClick={share}
      >
        {t("general.share")}
      </Button>
      <ActionIcon
        hiddenFrom="md"
        variant="white"
        c={"dark"}
        size={"xl"}
        radius={"xl"}
        className="hover:bg-white/70"
        onClick={share}
      >
        <Share size={28} strokeWidth={1.25} />
      </ActionIcon>
    </>
  )
}

export default ShareButton
