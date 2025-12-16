/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { AppShell, Burger, Group, UnstyledButton } from "@mantine/core"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { logo } from "@/assets"
import UserButton from "@/components/common/auth/user-button"
import LanguageSwitcher from "@/components/common/lang-switch"
import { APP_LINK, DOWNLOAD_APP_BANNER_KEY } from "@/config"
import { Link } from "@/lib/i18n/navigation"
import DownloadAppBanner from "./download-app-banner"

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  const t = useTranslations("header")
  const pathname = usePathname()
  const matches = useMediaQuery("(max-width: 62em)")
  const [isVisible, setIsVisible] = useState(false)

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
  if (pathname.includes("units") && matches)
    return (
      <>
        <DownloadAppBanner isVisible={isVisible} setIsVisible={setIsVisible} />
        {children}
      </>
    )
  return (
    <>
      <AppShell
        header={{
          height: { base: !isVisible ? 65 : 111, md: 74 },
        }}
        navbar={{
          width: 300,
          breakpoint: "md",
          collapsed: { desktop: true, mobile: !opened },
        }}
        withBorder={true}
      >
        <AppShell.Header>
          <DownloadAppBanner
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />

          <Group
            wrap="nowrap"
            className="mx-auto h-[65px] max-w-7xl max-sm:justify-between max-sm:bg-white md:h-full"
            py="xs"
            px="md"
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              size="sm"
            />
            <Group
              className="justify-center md:justify-between"
              wrap="nowrap"
              style={{ flex: 1 }}
            >
              <Link href={"/"}>
                <Image alt="logo" src={logo} className="max-md:h-2" />
              </Link>
              <Group>
                <Group me="md" gap={0} visibleFrom="md">
                  <UnstyledButton
                    component={Link}
                    href={"/units"}
                    className={"px-xs py-md block rounded-md font-medium"}
                  >
                    {t("search")}
                  </UnstyledButton>
                  <UnstyledButton
                    component="a"
                    target="_blank"
                    href={APP_LINK}
                    className={"px-xs py-md block rounded-md font-medium"}
                  >
                    {t("download-app")}
                  </UnstyledButton>
                  {/* <UnstyledButton
                  className={"block px-xs py-md rounded-md  font-medium"}
                >
                  {t("contact-us")}
                </UnstyledButton> */}
                  <UnstyledButton
                    className={"px-xs py-md block rounded-md font-medium"}
                    component={Link}
                    href={"/blog"}
                  >
                    {t("blog")}
                  </UnstyledButton>
                </Group>
                <Group visibleFrom="md">
                  <LanguageSwitcher />
                  <UserButton />
                </Group>
              </Group>
            </Group>
            <Group hiddenFrom="md">
              {/* <LanguageSwitcher /> */}

              <UserButton />
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar py="md" px={4}>
          <UnstyledButton
            component={Link}
            href={"/units"}
            className={"px-xs py-md block rounded-md font-medium"}
          >
            {t("search")}
          </UnstyledButton>
          <UnstyledButton
            component="a"
            target="_blank"
            href={APP_LINK}
            className={"px-xs py-md block rounded-md font-medium"}
          >
            {t("download-app")}
          </UnstyledButton>
          {/* <UnstyledButton className={"block px-xs py-md rounded-md  font-medium"}>
          {t("contact-us")}
        </UnstyledButton> */}
          <UnstyledButton
            component={Link}
            href={"/blog"}
            className={"px-xs py-md block rounded-md font-medium"}
          >
            {t("blog")}
          </UnstyledButton>
          <LanguageSwitcher />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  )
}
