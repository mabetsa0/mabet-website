"use client"
import Mabet from "@/services"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { UserResponse } from "../layout"
import { Grid, Group, Stack, Text } from "@mantine/core"
import { Session } from "@/@types/user"
import { useTranslations } from "next-intl"
import { CalendarRange, Gift, WalletMinimal } from "lucide-react"

type Props = {
  session: Session
}

const UserStatus = (props: Props) => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await Mabet.get<UserResponse>(`/account/me`)
      return response.data.data.user
    },
    initialData: props.session.user,
  })
  const t = useTranslations("user")
  return (
    <Stack className="min-h-[350px] py-2" justify="flex-end">
      <Grid columns={4}>
        <Grid.Col visibleFrom="md" span={{ base: 0, md: 1 }} />
        <Grid.Col span={{ base: 2, md: 1 }}>
          <Group wrap="nowrap" gap={"xs"} className="bg-white rounded-2xl p-1">
            <div className="w-[72px] shrink-0  flex items-center justify-center h-[72px] rounded-3xl bg-primary">
              <CalendarRange
                strokeWidth={1.6}
                size={40}
                className="text-white"
              />
            </div>
            <Stack w={"100%"} gap={"xs"}>
              <Text size="38px" className="max-md:text-end" fw={"bold"}>
                {user.bookings_count}
              </Text>
              <Text fw={500} c={"primary"}>
                {t("bookings_count")}
              </Text>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 2, md: 1 }}>
          <Group wrap="nowrap" gap={"xs"} className="bg-white rounded-2xl p-1">
            <div className="w-[72px] shrink-0  flex items-center justify-center h-[72px] rounded-3xl bg-primary">
              <WalletMinimal
                strokeWidth={1.6}
                size={40}
                className="text-white"
              />
            </div>
            <Stack gap={"xs"} w="100%">
              <Text
                w={"100%"}
                size="38px"
                className="max-md:text-end"
                fw={"bold"}
              >
                {user.wallet_balance}
              </Text>
              <Text fw={500} c={"primary"}>
                {t("wallet-balance")}
              </Text>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 4, md: 1 }}>
          <Group wrap="nowrap" gap={"xs"} className="bg-white rounded-2xl p-1">
            <div className="w-[72px] shrink-0  flex items-center justify-center h-[72px] rounded-3xl bg-primary">
              <Gift strokeWidth={1.6} size={40} className="text-white" />
            </div>
            <Stack gap={"xs"} w={"100%"}>
              <Text size="38px" className="max-md:text-end " fw={"bold"}>
                {user.points || "00"}
              </Text>
              <Text fw={500} c={"primary"}>
                {t("points")}
              </Text>
            </Stack>
          </Group>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}

export default UserStatus
