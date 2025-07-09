"use client"
import UnitCard from "@/components/common/unit-card"
import Mabet from "@/services"
import { Loader, SimpleGrid, Space, Stack, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { parseAsInteger, useQueryState } from "nuqs"
import Pagination from "../../units/components/pagination"
import { FavouritesResponse } from "./@type"

type Props = {}

const Page = (props: Props) => {
  const t = useTranslations()

  const [page, set] = useQueryState("page", parseAsInteger.withDefault(1))

  const { data, status } = useQuery({
    queryKey: ["favourites", page],
    queryFn: () =>
      Mabet.get<FavouritesResponse>("/account/favourites", {
        params: {
          page,
        },
      }),
  })

  return (
    <Stack>
      <Space />
      <Stack>
        <Text className="text-h3 md:text-h2 font-bold">
          {t("user.favourites.title")}
        </Text>
        <Text className="md:text-lg">{t("user.favourites.description")}</Text>
      </Stack>

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
        data.data.data.favourites.length === 0 ? (
          <div>
            <Text c={"#767676"}>{t("user.favourites.empty")}</Text>
          </div>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {data.data.data.favourites.map((unit) => (
              <UnitCard className="sm:max-w-[unset]" {...unit} key={unit.id} />
            ))}
          </SimpleGrid>
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
