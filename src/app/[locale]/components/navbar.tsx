/* eslint-disable @next/next/no-img-element */
"use client"
import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Group,
  UnstyledButton,
} from "@mantine/core"

import { logo } from "@/assets"
import { useDisclosure } from "@mantine/hooks"
import React from "react"
import { useTranslations } from "next-intl"
import LanguageSwitcher from "@/components/common/lang-switch"

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  const t = useTranslations("header")
  return (
    <AppShell
      header={{ height: { base: 65, md: 74 } }}
      navbar={{
        width: 300,
        breakpoint: "md",
        collapsed: { desktop: true, mobile: !opened },
      }}
      withBorder={false}
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
            <img alt="logo" src={logo.src} className="max-md:h-2.5" />
            <Group>
              <Group me="md" gap={0} visibleFrom="md">
                <UnstyledButton
                  className={"block px-xs py-md rounded-md  font-medium"}
                >
                  {t("about-us")}
                </UnstyledButton>
                <UnstyledButton
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
                >
                  {t("blog")}
                </UnstyledButton>
              </Group>
              <Group visibleFrom="md">
                <LanguageSwitcher />
                <Button
                  leftSection={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      viewBox="0 0 14 16"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.99985 0.833332C5.06685 0.833332 3.49985 2.40034 3.49985 4.33333C3.49985 6.26633 5.06685 7.83333 6.99985 7.83333C8.93284 7.83333 10.4998 6.26633 10.4998 4.33333C10.4998 2.40034 8.93284 0.833332 6.99985 0.833332ZM4.49985 4.33333C4.49985 2.95262 5.61914 1.83333 6.99985 1.83333C8.38056 1.83333 9.49985 2.95262 9.49985 4.33333C9.49985 5.71404 8.38056 6.83333 6.99985 6.83333C5.61914 6.83333 4.49985 5.71404 4.49985 4.33333Z"
                        fill="white"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.1524 10.0528C11.044 9.99163 10.9482 9.93761 10.8707 9.89145C8.50136 8.48063 5.49857 8.48063 3.12921 9.89145C3.05167 9.93762 2.95588 9.99166 2.84744 10.0528C2.37223 10.3209 1.65389 10.7262 1.16178 11.2079C0.853999 11.5091 0.561563 11.9061 0.5084 12.3925C0.451862 12.9097 0.677504 13.3951 1.13018 13.8264C1.91115 14.5704 2.84834 15.1667 4.06054 15.1667H9.93939C11.1516 15.1667 12.0888 14.5704 12.8697 13.8264C13.3224 13.3951 13.5481 12.9097 13.4915 12.3925C13.4384 11.9061 13.1459 11.5091 12.8382 11.2079C12.346 10.7262 11.6276 10.3209 11.1524 10.0528ZM3.64082 10.7507C5.69494 9.52756 8.30499 9.52756 10.3591 10.7507C10.471 10.8173 10.5937 10.8869 10.7221 10.9598C11.1972 11.2293 11.7519 11.544 12.1387 11.9225C12.3787 12.1575 12.4811 12.3514 12.4974 12.5012C12.5104 12.6201 12.4804 12.8162 12.18 13.1024C11.4894 13.7603 10.7877 14.1667 9.93939 14.1667H4.06054C3.21225 14.1667 2.51053 13.7603 1.81996 13.1024C1.51954 12.8162 1.48948 12.6201 1.50248 12.5012C1.51885 12.3514 1.62119 12.1575 1.86128 11.9225C2.248 11.544 2.80268 11.2293 3.27776 10.9598C3.4062 10.8869 3.52891 10.8173 3.64082 10.7507Z"
                        fill="white"
                      />
                    </svg>
                  }
                >
                  {t("login")}
                </Button>
              </Group>
            </Group>
          </Group>
          <Group hiddenFrom="md">
            {/* <LanguageSwitcher /> */}

            <ActionIcon size={"lg"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                viewBox="0 0 14 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.99985 0.833332C5.06685 0.833332 3.49985 2.40034 3.49985 4.33333C3.49985 6.26633 5.06685 7.83333 6.99985 7.83333C8.93284 7.83333 10.4998 6.26633 10.4998 4.33333C10.4998 2.40034 8.93284 0.833332 6.99985 0.833332ZM4.49985 4.33333C4.49985 2.95262 5.61914 1.83333 6.99985 1.83333C8.38056 1.83333 9.49985 2.95262 9.49985 4.33333C9.49985 5.71404 8.38056 6.83333 6.99985 6.83333C5.61914 6.83333 4.49985 5.71404 4.49985 4.33333Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.1524 10.0528C11.044 9.99163 10.9482 9.93761 10.8707 9.89145C8.50136 8.48063 5.49857 8.48063 3.12921 9.89145C3.05167 9.93762 2.95588 9.99166 2.84744 10.0528C2.37223 10.3209 1.65389 10.7262 1.16178 11.2079C0.853999 11.5091 0.561563 11.9061 0.5084 12.3925C0.451862 12.9097 0.677504 13.3951 1.13018 13.8264C1.91115 14.5704 2.84834 15.1667 4.06054 15.1667H9.93939C11.1516 15.1667 12.0888 14.5704 12.8697 13.8264C13.3224 13.3951 13.5481 12.9097 13.4915 12.3925C13.4384 11.9061 13.1459 11.5091 12.8382 11.2079C12.346 10.7262 11.6276 10.3209 11.1524 10.0528ZM3.64082 10.7507C5.69494 9.52756 8.30499 9.52756 10.3591 10.7507C10.471 10.8173 10.5937 10.8869 10.7221 10.9598C11.1972 11.2293 11.7519 11.544 12.1387 11.9225C12.3787 12.1575 12.4811 12.3514 12.4974 12.5012C12.5104 12.6201 12.4804 12.8162 12.18 13.1024C11.4894 13.7603 10.7877 14.1667 9.93939 14.1667H4.06054C3.21225 14.1667 2.51053 13.7603 1.81996 13.1024C1.51954 12.8162 1.48948 12.6201 1.50248 12.5012C1.51885 12.3514 1.62119 12.1575 1.86128 11.9225C2.248 11.544 2.80268 11.2293 3.27776 10.9598C3.4062 10.8869 3.52891 10.8173 3.64082 10.7507Z"
                  fill="white"
                />
              </svg>
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={"block px-xs py-md rounded-md  font-medium"}>
          {t("about-us")}
        </UnstyledButton>
        <UnstyledButton className={"block px-xs py-md rounded-md  font-medium"}>
          {t("download-app")}
        </UnstyledButton>
        <UnstyledButton className={"block px-xs py-md rounded-md  font-medium"}>
          {t("contact-us")}
        </UnstyledButton>
        <UnstyledButton className={"block px-xs py-md rounded-md  font-medium"}>
          {t("blog")}
        </UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
