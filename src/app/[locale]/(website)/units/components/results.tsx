"use client"
import { ComponentRef, Suspense, useRef } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import {
  ActionIcon,
  Box,
  Button,
  Group,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import dayjs from "dayjs"
import {
  BadgePercent,
  Building2,
  ChevronRight,
  CircleDollarSign,
  Map,
  Shield,
  SignpostBig,
  TicketPercent,
  WavesLadder,
} from "lucide-react"
import noResults from "@/assets/no-results.svg"
import UnitCard from "@/components/common/unit-card"
import UnitCardSkeleton from "@/components/common/unit-card-skeleton"
import FilterButtonWithCheckbox from "@/components/ui/filter-button-with-checkbox"
import FilterButtonWithRadio from "@/components/ui/filter-button-with-radio"
import { FilterButtonWithSearch } from "@/components/ui/filter-button-with-search"
import ToggleFilterButton from "@/components/ui/toggle-filter-button"
import { useCities, useUnitTypes } from "@/context/global-data-context"
import { useDirections } from "@/hooks/use-directions"
import { useFacilities } from "@/hooks/use-facilities"
import { usePools } from "@/hooks/use-pools"
import { useRegions } from "@/hooks/use-regions"
import { useRouter } from "@/lib/i18n/navigation"
import Mabet from "@/services"
import MobileSearch from "../../components/mobile-search"
import useFilters from "../hooks/use-filters"
import { SearchResultsResponse } from "../types/results"
import { countAppliedFilters } from "../types/search-params"
import CountFilter from "./filters/count-filter"
import MobileFilterDrawer from "./filters/mobile-filters-drawer"
import OrderFilter from "./filters/order-filter"
import PriceFilter from "./filters/price-filter"
import RatingFilter from "./filters/rating-filter"
import UnitCodeFilter from "./filters/unit-code-filter"
import UnitTypeFilter from "./filters/unit-type-filter"
import Pagination from "./pagination"

const Results = () => {
  const t = useTranslations()
  const searchParams = useSearchParams()
  const [_, setFilters] = useFilters()

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
    unitTypes.find((ele) => ele.id + "" == searchParams.get("unit_type_id"))
      ?.name || ""
  const searchedUnit =
    cities.find((ele) => ele.id + "" == searchParams.get("city_id"))?.name ||
    t("general.all-cities")

  // getting regions
  const cityId = searchParams.get("city_id")
  const regionsData = useRegions(cityId || "")
  //
  const poolsQuery = usePools()
  const facilitiesQuery = useFacilities()
  const directionsQuery = useDirections()

  const Router = useRouter()
  const back = () => {
    Router.back()
  }
  const scrollRef = useRef<ComponentRef<"div">>(null)

  const clearFilters = () => {
    setFilters(null)
  }

  return (
    <>
      <Stack
        className="sticky top-0 z-[5] bg-white px-1 py-0.5 shadow-sm"
        hiddenFrom="md"
      >
        <Group wrap="nowrap">
          <ActionIcon onClick={back} size={"lg"} color="dark" variant="subtle">
            <ChevronRight
              size={28}
              strokeWidth={1.4}
              className="ltr:rotate-180"
            />
          </ActionIcon>
          <Suspense>
            <div className="w-full">
              <MobileSearch>
                <Button
                  component="div"
                  size="lg"
                  w={"100%"}
                  color="'dark"
                  variant="outline"
                  className="h-[64px] w-full rounded-[50px] border-[1.5px] border-[#F3F3F3] text-[12px] font-normal"
                  classNames={{
                    inner: " justify-start",
                  }}
                >
                  <Stack justify="start" align="start" gap={"4"}>
                    <Text c={"dark"} fw={700} fz={14}>
                      {searchedUnit}
                    </Text>
                    <Group gap={"xs"} wrap="nowrap">
                      <Text fz={"12"}>{searchedUnitType}</Text>
                      {searchParams.get("from") && searchParams.get("to") ? (
                        <Text fz={"12"}>
                          {dayjs(searchParams.get("from")).format("DD MMMM")} -{" "}
                          {dayjs(searchParams.get("to")).format("DD MMMM")}
                        </Text>
                      ) : (
                        ""
                      )}
                    </Group>
                  </Stack>
                </Button>
              </MobileSearch>
            </div>
          </Suspense>
          <MobileFilterDrawer />
        </Group>
        <Box>
          <ScrollArea w={"100%"}>
            <Group className="w-fit" wrap="nowrap" px={"sm"} pb={"md"}>
              <UnitCodeFilter />
              <ToggleFilterButton
                filterKey="show_only_available"
                leftSection={<Building2 strokeWidth={1.25} />}
              >
                {t("search.filter.show_only_available-filter.button")}
              </ToggleFilterButton>
              <UnitTypeFilter />
              <FilterButtonWithSearch
                filterKey="region_id"
                label={t("general.select-region")}
                data={regionsData.data || []}
                buttonProps={{
                  leftSection: <Map strokeWidth={1.25} />,
                  children: t("general.region"),
                }}
              />

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

              <RatingFilter />
            </Group>
          </ScrollArea>
        </Box>
      </Stack>

      <section>
        <div ref={scrollRef} className="relative container">
          <Group
            visibleFrom="md"
            wrap="nowrap"
            justify="space-between"
            align="start"
          >
            <Group mb={{ base: "md", md: "xl" }} className="gap-y-[2px]">
              <Title className="text-h4 md:text-h2">{`${t("generl.search-results")} ${
                searchedUnitType
              } ${t("general.in")} ${searchedUnit}`}</Title>{" "}
              {data?.total ? (
                <Text c={"gray"}>
                  ({data?.total} {t("general.unit")})
                </Text>
              ) : null}
            </Group>
            <Button onClick={clearFilters} variant="transparent">
              {t("general.clear")} ({countAppliedFilters(searchParams)})
            </Button>
          </Group>
          <ScrollArea visibleFrom="md" w={"100%"}>
            <Group className="w-fit" wrap="nowrap" px={"sm"} pb={"md"}>
              <UnitCodeFilter />
              <ToggleFilterButton
                filterKey="show_only_available"
                leftSection={<Building2 strokeWidth={1.25} />}
              >
                {t("search.filter.show_only_available-filter.button")}
              </ToggleFilterButton>
              <UnitTypeFilter />
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
                {t("search.filter.load_offers.button")}
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
                filterKey="amenities[]"
                data={poolsQuery.data ? poolsQuery.data : []}
                title={t("search.filter.pools-filter.title")}
                buttonProps={{
                  children: t("search.filter.pools-filter.button"),
                  leftSection: <WavesLadder strokeWidth={1.25} />,
                }}
              />
              <FilterButtonWithCheckbox
                filterKey="facilities[]"
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
            </Group>
          </ScrollArea>

          {status === "pending" ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <UnitCardSkeleton
                  className="w-full lg:max-w-[unset]"
                  key={index}
                />
              ))}
            </SimpleGrid>
          ) : null}
          {status === "error" ? (
            <div>
              <Text c={"red"}>Error</Text>
            </div>
          ) : null}
          {status === "success" ? (
            <>
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                {data.data.map((unit) => {
                  return (
                    <UnitCard
                      className="w-full lg:max-w-[unset]"
                      key={unit.id}
                      {...unit}
                    />
                  )
                })}
              </SimpleGrid>
              {data.data.length === 0 && (
                <div className="flex min-h-[30vh] flex-col items-center justify-center">
                  <Image src={noResults} alt="no results" />
                  <Stack
                    align={"center"}
                    justify={"center"}
                    gap={"lg"}
                    maw={650}
                  >
                    <Text
                      ta={"center"}
                      className="text-h4 md:text-h3 font-bold"
                    >
                      {t("general.no-results-title")}
                    </Text>
                    <Text ta={"center"} c={"#767676"} className="md:text-lg">
                      {t("general.no-results-description")}
                    </Text>
                    <Button onClick={() => setFilters(null)}>
                      {t("general.no-results-button")}
                    </Button>
                  </Stack>
                </div>
              )}
            </>
          ) : null}
          <OrderFilter />

          <Pagination total={data?.last_page} />
        </div>
      </section>
    </>
  )
}

export default Results
