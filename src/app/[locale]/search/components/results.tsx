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

import { FilterButtonWithSearch } from "@/components/ui/filter-button-with-search"
import ToggleFilterButton from "@/components/ui/toggle-filter-button"
import { useCities, useUnitTypes } from "@/context/global-date-context"
import { getRegions } from "@/services/lists"
import { useQuery } from "@tanstack/react-query"
import { Building2, Map, Shield, TicketPercent } from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { SearchResultsResponse } from "../@types/results"
import UnitCodeFilter from "./filters/unit-code-filter"
import Pagination from "./pagination"
import PriceFilter from "./filters/price-filter"

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

  // getting regions
  const cityId = searchParams.get("city_id")
  const regionsData = useQuery({
    queryKey: ["region", cityId],
    staleTime: Infinity,
    enabled: !!cityId,
    queryFn: async () => {
      const response = await getRegions(cityId!)
      return response.data.districts.map((ele) => ({
        label: ele.name,
        value: ele.id + "",
      }))
    },
  })

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
        <ScrollArea w={"100%"}>
          <Group wrap="nowrap" pb={"md"}>
            <UnitCodeFilter />
            <ToggleFilterButton
              filterKey="show_only_available"
              leftSection={<Building2 strokeWidth={1.25} />}
            >
              {t("search.filter.show_only_available-filter.button")}
            </ToggleFilterButton>
            <FilterButtonWithSearch
              filterKey="region_id"
              label={t("general.select-region")}
              data={regionsData.data || []}
              buttonProps={{
                leftSection: <Map strokeWidth={1.25} />,
                children: t("general.region"),
              }}
            />
            <ToggleFilterButton
              filterKey="no_insurance"
              leftSection={<Shield strokeWidth={1.25} />}
            >
              {t("search.filter.no_insurance.button")}
            </ToggleFilterButton>
            <ToggleFilterButton
              filterKey="load_offers"
              leftSection={<TicketPercent strokeWidth={1.25} />}
            >
              {t("search.filt.load_offers.button")}
            </ToggleFilterButton>
            <PriceFilter />
          </Group>
        </ScrollArea>
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
