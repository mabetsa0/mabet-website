"use client"
import UnitCard from "@/components/common/unit-card"
import Mabet from "@/services"
import {
  Group,
  Loader,
  ScrollArea,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { SearchResultsResponse } from "../@types/results"
import Pagination from "./pagination"
import { useTranslations } from "next-intl"
import { useCities, useUnitTypes } from "@/context/global-date-context"
import UnitCodeFilter from "./filters/unit-code-filter"
import OnlyAvailable from "./filters/only-available-filter"

const Results = () => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const { data, status } = useQuery({
    queryKey: ["search", searchParams.toString()],
    queryFn: async () => {
      const results = await Mabet.get<SearchResultsResponse>(`/units`, {
        params: searchParams,
      })
      return results.data.data
    },
  })

  const unitTypes = useUnitTypes()
  const cities = useCities()
  const searchedUnitType =
    unitTypes.find((ele) => ele.id + "" == searchParams.get("unit_type"))
      ?.name || ""
  const searchedUnit =
    cities.find((ele) => ele.id + "" == searchParams.get("city_id"))?.name ||
    t("general.all-cities")

  return (
    <section>
      <div className="container">
        <Group mb={"xl"}>
          <Title order={2}>{`${t("generl.search-results")} ${
            searchedUnitType
          } ${t("general.in")} ${searchedUnit}`}</Title>{" "}
          {data?.total ? (
            <Text c={"gray"}>
              ({data?.total} {t("general.unit")})
            </Text>
          ) : null}
        </Group>
        <ScrollArea.Autosize>
          <Group pb={"md"}>
            <UnitCodeFilter />
            <OnlyAvailable />
          </Group>
        </ScrollArea.Autosize>
        {status === "pending" ? (
          <div className="flex items-center justify-center min-h-[30vh]">
            <Loader />
          </div>
        ) : null}
        {status === "error" ? (
          <div>
            <Text c={"red"}>Error</Text>
          </div>
        ) : null}
        {status === "success" ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {data.data.map((unit) => {
              return <UnitCard key={unit.id} {...unit} />
            })}
          </SimpleGrid>
        ) : null}

        <Pagination total={data?.last_page} />
      </div>
    </section>
  )
}

export default Results
