"use client"
import { AppShell, Burger, Group, UnstyledButton } from "@mantine/core"
import { CircleAlert } from "lucide-react"

import { useDisclosure } from "@mantine/hooks"
import React from "react"

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
      padding="md">
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <CircleAlert size={30} />
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={"block px-xs py-md rounded-md "}>Home</UnstyledButton>
              <UnstyledButton className={"block px-xs py-md rounded-md "}>Blog</UnstyledButton>
              <UnstyledButton className={"block px-xs py-md rounded-md "}>Contacts</UnstyledButton>
              <UnstyledButton className={"block px-xs py-md rounded-md "}>Support</UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={"block px-xs py-md rounded-md "}>Home</UnstyledButton>
        <UnstyledButton className={"block px-xs py-md rounded-md "}>Blog</UnstyledButton>
        <UnstyledButton className={"block px-xs py-md rounded-md "}>Contacts</UnstyledButton>
        <UnstyledButton className={"block px-xs py-md rounded-md "}>Support</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
