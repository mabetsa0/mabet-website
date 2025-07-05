"use client"
import UnitCard from "@/components/common/unit-card"
import Mabet from "@/services"
import { Group, Loader, SimpleGrid, Space, Stack, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { parseAsInteger, useQueryState } from "nuqs"
import Pagination from "../../units/components/pagination"
import { WalletResponse } from "./@types"
import WalletCard from "./components/wallet-card"
import AddToWallet from "./components/add-to-wallet"
import { RiyalIcon } from "@/components/icons"

type Props = {}

const Page = (props: Props) => {
  const t = useTranslations()

  const [page, set] = useQueryState("page", parseAsInteger.withDefault(1))

  const { data, status } = useQuery({
    queryKey: ["wallet", page],
    queryFn: () =>
      Mabet.get<WalletResponse>("/account/wallet", {
        params: {
          page,
        },
      }),
  })

  return (
    <Stack>
      <Space />
      <Group wrap="nowrap">
        <Stack className="grow">
          <Text className="text-h3 md:text-h2 font-bold">
            {t("user.wallet.title")}
          </Text>
          <Text className="md:text-lg">
            {t("user.wallet.description")}{" "}
            <span className="text-primary ">
              {data?.data.data.current_balance}
              <RiyalIcon />
            </span>
          </Text>
        </Stack>
        {/* <AddToWallet /> */}
      </Group>
      <Space />

      {status === "pending" && (
        <div className="flex items-center justify-center min-h-20">
          <Loader />
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center justify-center min-h-20">
          <p className="text-center text-red-500  text-sm">
            {t("user.bookings.server-error")}
          </p>
        </div>
      )}

      {status === "success" ? (
        data.data.data.data.length === 0 ? (
          <div>
            <Text c={"#767676"}>{t("user.wallet.empty")}</Text>
          </div>
        ) : (
          <Stack>
            {data.data.data.data.map((ele) => (
              <WalletCard {...ele} key={ele.id} />
            ))}
          </Stack>
        )
      ) : null}
      <Space />
      <Space />
      <div className="flex justify-center w-full ">
        <Pagination total={data?.data.data.last_page || 0} />
      </div>
    </Stack>
  )
}

export default Page
