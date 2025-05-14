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

import FilterButtonWithCheckbox from "@/components/ui/filter-button-with-checkbox"
import FilterButtonWithRadio from "@/components/ui/filter-button-with-radio"
import { FilterButtonWithSearch } from "@/components/ui/filter-button-with-search"
import ToggleFilterButton from "@/components/ui/toggle-filter-button"
import { useCities, useUnitTypes } from "@/context/global-date-context"
import {
  getDirections,
  getFacilities,
  getPools,
  getRegions,
} from "@/services/lists"
import { useQuery } from "@tanstack/react-query"
import {
  BadgePercent,
  Building2,
  CircleDollarSign,
  Map,
  Shield,
  SignpostBig,
  TicketPercent,
  WavesLadder,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { SearchResultsResponse } from "../@types/results"
import PriceFilter from "./filters/price-filter"
import RatingFilter from "./filters/rating-filter"
import UnitCodeFilter from "./filters/unit-code-filter"
import Pagination from "./pagination"
import CountFilter from "./filters/count-filter"

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
  //
  const poolsQuery = useQuery({
    queryKey: ["pools"],
    staleTime: Infinity,

    queryFn: async () => {
      const response = await getPools()
      return response.data.amenities.map((ele) => ({
        label: ele.name,
        value: ele.id + "",
      }))
    },
  })
  const facilitiesQuery = useQuery({
    queryKey: ["facilities"],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await getFacilities()
      return response.data.facilities.map((ele) => ({
        label: ele.name,
        value: ele.id + "",
      }))
    },
  })
  const directionsQuery = useQuery({
    queryKey: ["/location/directions"],
    staleTime: Infinity,
    queryFn: async () => {
      const response = await getDirections()
      return response.data.directions.map((ele) => ({
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
        <ScrollArea visibleFrom="md" w={"100%"}>
          <Group wrap="nowrap" px={"sm"} pb={"md"}>
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
            <FilterButtonWithRadio
              filterKey="direction_id"
              buttonProps={{
                leftSection: <SignpostBig strokeWidth={1.25} />,
                children: t("search.filter.direction-filter.button"),
              }}
              title={t("search.filter.direction-filter.title")}
              data={directionsQuery.data || []}
            />

            <ToggleFilterButton
              filterKey="free_cancellation"
              leftSection={<CircleDollarSign strokeWidth={1.25} />}
            >
              {t("search.filter.free_cancellation.button")}
            </ToggleFilterButton>
            <RatingFilter />
            <ToggleFilterButton
              filterKey="last_hours_offer"
              leftSection={<BadgePercent strokeWidth={1.25} />}
            >
              {t("search.filter.last_hours_offer-filter.button")}
            </ToggleFilterButton>
            <FilterButtonWithCheckbox
              filterKey="amenities"
              data={poolsQuery.data ? poolsQuery.data : []}
              title={t("search.filter.pools-filter.title")}
              buttonProps={{
                children: t("search.filter.pools-filter.button"),
                leftSection: <WavesLadder strokeWidth={1.25} />,
              }}
            />
            <FilterButtonWithCheckbox
              filterKey="facilities"
              data={facilitiesQuery.data ? facilitiesQuery.data : []}
              title={t("search.filter.facilities-filter.title")}
              buttonProps={{
                children: t("search.filter.facilities-filter.button"),
              }}
            />
            <CountFilter />
            <FilterButtonWithRadio
              filterKey="unit_for"
              buttonProps={{
                children: t("search.filter.unit_for-filter.button"),
              }}
              title={t("search.filter.unit_for-filter.title")}
              data={[
                {
                  label: t("general.for-families"),
                  value: "family",
                },
                {
                  label: t("general.for-singles"),
                  value: "single",
                },
                {
                  label: t("general.for-both"),
                  value: "both",
                },
              ]}
            />
            <FilterButtonWithRadio
              filterKey="result_type"
              buttonProps={{
                children: t("search.filter.result_type-filter.button"),
              }}
              title={t("search.filter.result_type-filter.button")}
              data={[
                {
                  label: t("general.default"),
                  value: "default",
                },
                {
                  label: t("general.mostly_viewed"),
                  value: "mostly_viewed",
                },
                {
                  label: t("general.lowest_price"),
                  value: "lowest_price",
                },
                {
                  label: t("general.highest_price"),
                  value: "highest_price",
                },
              ]}
            />
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
