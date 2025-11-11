"use client"
import { Button, CloseButton, Container, Group, Text } from "@mantine/core"
import { useEffect, useState } from "react"
import { APP_LINK, DOWNLOAD_APP_BANNER_KEY } from "@/config"
import { useTranslations } from "next-intl"
import { mabetLogo } from "@/assets"
import Image from "next/image"

export default function DownloadAppBanner({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean
  setIsVisible: (isVisible: boolean) => void
}) {
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
          <Image src={mabetLogo} alt="app" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text fw={600} size="sm">
              {t("download-app")}
            </Text>
            <Text size="xs">
              <b>{t("download-app-description")}</b>
            </Text>
          </div>
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
