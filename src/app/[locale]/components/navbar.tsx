/* eslint-disable @next/next/no-img-element */
"use client"
import { AppShell, Burger, Group, UnstyledButton } from "@mantine/core"

import { logo } from "@/assets"
import UserButton from "@/components/common/auth/user-button"
import LanguageSwitcher from "@/components/common/lang-switch"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"
import { useTranslations } from "next-intl"
import React from "react"
import { Link } from "@/lib/i18n/navigation"
import { usePathname } from "next/navigation"
import { APP_LINK } from "@/config"
import NextLink from "next/link"

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  const t = useTranslations("header")
  const pathname = usePathname()
  const matches = useMediaQuery("(max-width: 62em)")
  if (pathname.includes("search") && matches) return <>{children}</>
  return (
    <AppShell
      header={{ height: { base: 65, md: 74 } }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: true, mobile: !opened },
      }}
      withBorder={true}
    >
      <AppShell.Header>
        <Group
          wrap="nowrap"
          className="max-w-7xl mx-auto max-sm:justify-between"
          py={"xs"}
          h="100%"
          px="md"
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
          <Group
            className="  justify-center md:justify-between"
            wrap="nowrap"
            style={{ flex: 1 }}
          >
            <Link href={"/"}>
              <img alt="logo" src={logo.src} className="max-md:h-2" />
            </Link>
            <Group>
              <Group me="md" gap={0} visibleFrom="md">
                <UnstyledButton
                  className={"block px-xs py-md rounded-md  font-medium"}
                >
                  {t("about-us")}
                </UnstyledButton>
                <UnstyledButton
                  component="a"
                  target="_blank"
                  href={APP_LINK}
                  className={"block px-xs py-md rounded-md  font-medium"}
                >
                  {t("download-app")}
                </UnstyledButton>
                <UnstyledButton
                  className={"block px-xs py-md rounded-md  font-medium"}
                >
                  {t("contact-us")}
                </UnstyledButton>
                <UnstyledButton
                  className={"block px-xs py-md rounded-md  font-medium"}
                  component={NextLink}
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
        <UnstyledButton className={"block px-xs py-md rounded-md  font-medium"}>
          {t("about-us")}
        </UnstyledButton>
        <UnstyledButton
          component="a"
          target="_blank"
          href={APP_LINK}
          className={"block px-xs py-md rounded-md  font-medium"}
        >
          {t("download-app")}
        </UnstyledButton>
        <UnstyledButton className={"block px-xs py-md rounded-md  font-medium"}>
          {t("contact-us")}
        </UnstyledButton>
        <UnstyledButton
          component={NextLink}
          href={"/blog"}
          className={"block px-xs py-md rounded-md  font-medium"}
        >
          {t("blog")}
        </UnstyledButton>
        <LanguageSwitcher />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
