"use client"
import { Session } from "@/@types/user"
import { Grid, Group, Stack, Text } from "@mantine/core"
import { CalendarRange, Gift, WalletMinimal } from "lucide-react"
import { useTranslations } from "next-intl"
import useUser from "../hooks/use-user"

type Props = {
  session: Session
}

const UserStatus = (props: Props) => {
  const { user } = useUser()

  const t = useTranslations("user")
  return (
    <Stack className="min-h-[350px] py-2" justify="flex-end">
      <Group wrap="nowrap">
        <div className="w-[300px] shrink-0 hidden md:block"></div>
        <div className="w-full">
          <Grid columns={6}>
            <Grid.Col span={{ base: 3, md: 2 }}>
              <Group
                wrap="nowrap"
                gap={"xs"}
                className="bg-white rounded-2xl p-1"
              >
                <div className="w-[62px] md:w-[72px] shrink-0  flex items-center justify-center h-[62px] md:h-[72px]  rounded-2xl md:rounded-3xl bg-primary">
                  <CalendarRange
                    strokeWidth={1.6}
                    size={40}
                    className="text-white"
                  />
                </div>
                <Stack w={"100%"} gap={"xs"}>
                  <Text
                    className="max-md:text-end text-xl md:text-4xl"
                    fw={"bold"}
                  >
                    {user.bookings_count || "00"}
                  </Text>
                  <Text fw={500} c={"primary"}>
                    {t("bookings_count")}
                  </Text>
                </Stack>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 3, md: 2 }}>
              <Group
                wrap="nowrap"
                gap={"xs"}
                className="bg-white rounded-2xl p-1"
              >
                <div className="w-[62px] md:w-[72px] shrink-0  flex items-center justify-center h-[62px] md:h-[72px]  rounded-2xl md:rounded-3xl bg-primary">
                  <WalletMinimal
                    strokeWidth={1.6}
                    size={40}
                    className="text-white"
                  />
                </div>
                <Stack gap={"xs"} w="100%">
                  <Text
                    truncate
                    className="max-md:text-end text-xl md:text-4xl w-3/4 "
                    fw={"bold"}
                  >
                    {user.wallet_balance || "00"}
                  </Text>
                  <Text fw={500} c={"primary"}>
                    {t("wallet-balance")}
                  </Text>
                </Stack>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 2 }}>
              <Group
                wrap="nowrap"
                gap={"xs"}
                className="bg-white rounded-2xl p-1"
              >
                <div className="w-[62px] md:w-[72px] shrink-0  flex items-center justify-center h-[62px] md:h-[72px]  rounded-2xl md:rounded-3xl bg-primary">
                  <Gift strokeWidth={1.6} size={40} className="text-white" />
                </div>
                <Stack gap={"xs"} w={"100%"}>
                  <Text
                    className="max-md:text-end text-xl md:text-4xl"
                    fw={"bold"}
                  >
                    {user.points || "00"}
                  </Text>
                  <Text fw={500} c={"primary"}>
                    {t("points")}
                  </Text>
                </Stack>
              </Group>
            </Grid.Col>
          </Grid>
        </div>
      </Group>
    </Stack>
  )
}

export default UserStatus
