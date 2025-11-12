"use client"
import { useTranslations } from "next-intl"
import { Grid, Group, Stack, Text } from "@mantine/core"
import { CalendarRange, Gift, WalletMinimal } from "lucide-react"
import useUser from "../hooks/use-user"

const UserStatus = () => {
  const { user } = useUser()

  const t = useTranslations("user")
  return (
    <Stack className="min-h-[350px] py-2" justify="flex-end">
      <Group wrap="nowrap">
        <div className="hidden w-[260px] shrink-0 md:block"></div>
        <div className="w-full">
          <Grid columns={6}>
            <Grid.Col span={{ base: 3, md: 2 }}>
              <Group
                wrap="nowrap"
                gap={"xs"}
                className="rounded-2xl bg-white py-1 pe-0.5 ltr:pl-0.5 md:ltr:pl-1 rtl:pr-0.5 md:rtl:pr-1"
              >
                <div className="bg-primary flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md md:h-[72px] md:w-[72px] md:rounded-3xl">
                  <CalendarRange
                    strokeWidth={1.6}
                    className="size-[24px] text-white md:size-3"
                  />
                </div>
                <Stack w={"100%"} gap={"xs"}>
                  <Text
                    className="text-base max-md:text-end md:text-2xl"
                    fw={"bold"}
                  >
                    {user.bookings_count || "00"}
                  </Text>
                  <Text fw={500} c={"primary"} className="text-sm md:text-base">
                    {t("bookings_count")}
                  </Text>
                </Stack>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 3, md: 2 }}>
              <Group
                wrap="nowrap"
                gap={"xs"}
                className="rounded-2xl bg-white py-1 ps-1 pe-0.5"
              >
                <div className="bg-primary flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md md:h-[72px] md:w-[72px] md:rounded-3xl">
                  <WalletMinimal
                    strokeWidth={1.6}
                    className="size-[24px] text-white md:size-3"
                  />
                </div>
                <Stack gap={"xs"} w="100%">
                  <Text
                    truncate
                    className="w-full text-base max-md:text-end md:text-2xl"
                    fw={"bold"}
                  >
                    {user.wallet_balance || "00"}
                  </Text>
                  <Text fw={500} c={"primary"} className="text-sm md:text-base">
                    {t("wallet-balance")}
                  </Text>
                </Stack>
              </Group>
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 2 }}>
              <Group
                wrap="nowrap"
                gap={"xs"}
                className="rounded-2xl bg-white py-1 ps-0.5 pe-0.5 md:ps-1"
              >
                <div className="bg-primary flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-md md:h-[72px] md:w-[72px] md:rounded-3xl">
                  <Gift
                    strokeWidth={1.6}
                    className="size-[24px] text-white md:size-3"
                  />
                </div>
                <Stack gap={"xs"} w={"100%"}>
                  <Text
                    className="text-base max-md:text-end md:text-2xl"
                    fw={"bold"}
                  >
                    {user.points || "00"}
                  </Text>
                  <Text fw={500} c={"primary"} className="text-sm md:text-base">
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
