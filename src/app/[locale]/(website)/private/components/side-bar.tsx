"use client"
import { Session } from "@/@types/user"
import { useNafath } from "@/hooks/use-nafath"
import { cn } from "@/lib/cn"
import { Link, usePathname, useRouter } from "@/lib/i18n/navigation"
import {
  Button,
  Card,
  Group,
  ScrollArea,
  Stack,
  Tabs,
  Text,
} from "@mantine/core"
import {
  BadgeCheck,
  CalendarRange,
  Headset,
  Heart,
  LogOut,
  UserRound,
  Wallet,
} from "lucide-react"
import { useTranslations } from "next-intl"
import useUser from "../hooks/use-user"

type Props = {
  session: Session
}

const SideBar = (props: Props) => {
  const { user } = useUser()

  const pathname = usePathname()
  const t = useTranslations("general")
  const [_, { onOpen }] = useNafath()

  const items = [
    {
      Icon: <UserRound />,
      label: t("profile"),
      path: "/private/profile",
    },
    {
      Icon: <CalendarRange />,
      label: t("bookings"),
      path: "/private/bookings",
    },
    {
      Icon: <Wallet />,
      label: t("wallet"),
      path: "/private/wallet",
    },
    {
      Icon: <Heart />,
      label: t("favourite"),
      path: "/private/favourite",
    },
    {
      Icon: <Headset />,
      label: t("support"),
      path: "/private/contact-us",
    },
  ]

  const router = useRouter()
  return (
    <>
      <Card
        visibleFrom="md"
        className="bg-white sticky  top-16  "
        radius={"16px"}
        shadow="md"
        w={"260px"}
      >
        <Group
          wrap="nowrap"
          gap={"xs"}
          className="bg-white rounded-2xl p-0.5  "
        >
          {/* <div className="w-[72px] flex items-center justify-center h-[72px] rounded-3xl bg-primary"> */}
          <img className="w-[52px] h-[52px]" alt={"avatar"} src={user.avatar} />
          {/* </div> */}
          <Stack gap={"xs"}>
            <Text truncate maw={"170px"} fw={"bold"}>
              {user.name}
            </Text>
            <Button
              size="xs"
              onClick={user.nafath_validated ? undefined : onOpen}
              variant={user.nafath_validated ? "white" : "light"}
              leftSection={user.nafath_validated ? <BadgeCheck /> : undefined}
            >
              {user.nafath_validated ? t("verified") : t("verify-account")}
            </Button>
          </Stack>
        </Group>
        <Stack gap={"sm"} className="  divide-y divide-[#F3F3F3] mt-1 ">
          {items.map((ele, index) => {
            return (
              <div key={index} className="w-full pb-0.5">
                <Button
                  component={Link}
                  href={ele.path}
                  fullWidth
                  justify="start"
                  variant={pathname === ele.path ? "light" : "white"}
                  color={pathname === ele.path ? "primary" : "dark"}
                  size="md"
                  className={cn(`hover:bg-primary/15  font-bold duration-300 `)}
                  leftSection={ele.Icon}
                >
                  {ele.label}
                </Button>
              </div>
            )
          })}
          <div className="w-full pb-0.5">
            <Button
              fullWidth
              justify="start"
              variant={"white"}
              color={"red"}
              size="md"
              className={cn(`hover:bg-red/15 font-bold duration-300 `)}
              leftSection={<LogOut />}
            >
              {t("logout")}
            </Button>
          </div>
        </Stack>
      </Card>

      <ScrollArea hiddenFrom="md" w={"100%"} pb={"md"} pt={"xs"}>
        <Tabs value={pathname} onChange={(value) => router.push(value!)}>
          <Tabs.List className=" flex-nowrap">
            {items.map((ele, index) => {
              return (
                <Tabs.Tab
                  size={"lg"}
                  className="data-[active]:text-primary text-lg"
                  value={ele.path}
                  key={index}
                >
                  {ele.label}
                </Tabs.Tab>
              )
            })}
          </Tabs.List>
        </Tabs>
      </ScrollArea>
    </>
  )
}

export default SideBar
