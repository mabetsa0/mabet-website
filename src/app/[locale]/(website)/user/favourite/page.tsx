"use client"
import { useTranslations } from "next-intl"
import { SimpleGrid, Space, Stack, Text } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { parseAsInteger, useQueryState } from "nuqs"
import UnitCard from "@/components/common/unit-card"
import UnitCardSkeleton from "@/components/common/unit-card-skeleton"
import Mabet from "@/services"
import Pagination from "../../units/components/pagination"
import { FavouritesResponse } from "./@type"

const Page = () => {
  const t = useTranslations()

  const [page, _] = useQueryState("page", parseAsInteger.withDefault(1))

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
    <Stack className="pt-lg">
      <Space />
      <Stack>
        <Text className="text-h3 md:text-h2 font-bold">
          {t("user.favourites.title")}
        </Text>
        <Text className="md:text-lg">{t("user.favourites.description")}</Text>
      </Stack>

      {status === "pending" ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }} pb="lg">
          {Array.from({ length: 6 }).map((_, index) => (
            <UnitCardSkeleton className="w-full sm:max-w-[unset]" key={index} />
          ))}
        </SimpleGrid>
      ) : null}

      {status === "error" && (
        <div className="flex min-h-20 items-center justify-center">
          <p className="text-center text-sm text-red-500">
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
      <div className="flex w-full justify-center">
        <Pagination total={data?.data.data.last_page || 0} />
      </div>
    </Stack>
  )
}

export default Page
