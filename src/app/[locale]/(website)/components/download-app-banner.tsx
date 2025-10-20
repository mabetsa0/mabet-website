"use client"
import { Button, CloseButton, Container, Group, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { APP_LINK, DOWNLOAD_APP_BANNER_KEY } from "@/config"
import { useTranslations } from "next-intl"

export default function DownloadAppBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations("header")

  useEffect(() => {
    try {
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem(DOWNLOAD_APP_BANNER_KEY)
          : "1"
      setIsVisible(!stored)
    } catch {
      setIsVisible(true)
    }
  }, [])

  const handleClose = () => {
    try {
      localStorage.setItem(DOWNLOAD_APP_BANNER_KEY, "1")
    } catch {}
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className="md:hidden"
      style={{ backgroundColor: "#0f172a", color: "white" }}
    >
      <Container
        size={"lg"}
        px="md"
        py={8}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Group gap="sm" wrap="nowrap" style={{ flex: 1 }}>
          <Text fw={600} size="sm">
            {t("download-app")}
          </Text>
        </Group>
        <Group gap="xs" wrap="nowrap">
          <Button
            component="a"
            href={APP_LINK}
            target="_blank"
            size="xs"
            variant="white"
            color="dark"
          >
            {t("download-app")}
          </Button>
          <CloseButton
            aria-label="Close banner"
            onClick={handleClose}
            variant="white"
            size="sm"
          />
        </Group>
      </Container>
    </div>
  )
}
