/* eslint-disable @next/next/no-img-element */
"use client"
import { useCallback, useEffect, useMemo } from "react"
import { useTranslations } from "next-intl"
import {
  ActionIcon,
  Button,
  Checkbox,
  Divider,
  Group,
  NumberFormatter,
  Radio,
  RangeSlider,
  ScrollArea,
  Select,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure, useForceUpdate } from "@mantine/hooks"
import "dayjs/locale/ar"
import { Search, SlidersHorizontal, Star } from "lucide-react"
import { Drawer } from "vaul"
import "@/app/transition-css.css"
import { RiyalIcon } from "@/components/icons"
import { CustomNumberInput } from "@/components/ui/number-input"
import SelectDropdownSearch from "@/components/ui/select-with-search"
import { useCities, useUnitTypes } from "@/context/global-data-context"
import { useDirections } from "@/hooks/use-directions"
import { useFacilities } from "@/hooks/use-facilities"
import { usePools } from "@/hooks/use-pools"
import { useRegions } from "@/hooks/use-regions"
import { handleFormError } from "@/utils/handle-form-errors"
import useFilters from "../../hooks/use-filters"

// Constants
const TOGGLE_FILTER_KEYS = [
  "free_cancellation",
  "no_insurance",
  "last_hour_offer",
  "load_offers",
] as const

const RATING_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10] as const

const DEFAULT_INITIAL_VALUES = {
  unit_query: "",
  price: [50, 6000] as [number, number],
  result_type: "Default",
  toggle_filters: [""] as string[],
  rating: [""] as string[],
  direction_id: "",
  city_id: "",
  region_id: "",
  unit_type_id: "",
  rooms_count: 0,
  single_beds_count: 0,
  master_beds_count: 0,
  amenities: [""] as string[],
  facilities: [""] as string[],
  unit_for: "",
}

const MobileFilterDrawer = () => {
  const [opened, { close, open }] = useDisclosure()
  const t = useTranslations()
  const cities = useCities()
  const unitTypes = useUnitTypes()
  const [filters, setFilters] = useFilters()

  // Memoize transformValues function
  const transformValues = useCallback(
    ({
      amenities,
      facilities,
      price,
      toggle_filters,
      rating,
      ...values
    }: typeof DEFAULT_INITIAL_VALUES) => {
      return {
        ...values,
        "amenities[]": amenities,
        "facilities[]": facilities,
        "rating[]": rating,
        priceFrom: price[0],
        priceTo: price[1],
        ...toggle_filters.reduce(
          (acc, curr) => {
            acc[curr] = 1
            return acc
          },
          {} as Record<string, number>
        ),
      }
    },
    []
  )

  const form = useForm({
    mode: "uncontrolled",
    initialValues: DEFAULT_INITIAL_VALUES,
    transformValues,
  })

  // Initialize form when drawer opens or filters change
  useEffect(() => {
    if (!opened) return

    const formValues = {
      unit_query: filters.unit_query || "",
      price: [filters.priceFrom || 50, filters.priceTo || 6000] as [
        number,
        number,
      ],
      result_type: filters.result_type || "Default",
      toggle_filters: TOGGLE_FILTER_KEYS.filter(
        (e) => !!filters[e]
      ) as string[],
      rating: (filters["rating[]"] || [""]) as string[],
      direction_id: filters.direction_id || "",
      city_id: filters.city_id || "",
      region_id: filters.region_id || "",
      unit_type_id: filters.unit_type_id || "",
      rooms_count: filters.rooms_count || 0,
      single_beds_count: filters.single_beds_count || 0,
      master_beds_count: filters.master_beds_count || 0,
      amenities: (filters["amenities[]"] || [""]) as string[],
      facilities: (filters["facilities[]"] || [""]) as string[],
      unit_for: filters.unit_for || "",
    }
    form.initialize(formValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened])

  // Calculate dirty inputs count (recalculated on each render as form state changes)
  const dirtyInputs = Object.values(form.getDirty()).filter(Boolean).length

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      setFilters(values)
      close()
    } catch (error) {
      handleFormError(error, form)
    }
  })

  // Optimize clearFilters - single setFilters call
  const clearFilters = useCallback(() => {
    form.setValues(DEFAULT_INITIAL_VALUES)
    form.resetDirty()
    setFilters(null)
  }, [form, setFilters])

  // Get cityId from form values
  const cityId = form.getValues().city_id
  const regionsData = useRegions(cityId || "")
  const poolsQuery = usePools()
  const facilitiesQuery = useFacilities()
  const directionsQuery = useDirections()

  // Memoize static option arrays
  const resultTypeOptions = useMemo(
    () => [
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
    ],
    [t]
  )

  const toggleFilterOptions = useMemo(
    () => [
      {
        label: t("search.filter.show_only_available-filter.button"),
        value: "show_only_available",
      },
      {
        label: t("search.filter.no_insurance.button"),
        value: "no_insurance",
      },
      {
        label: t("search.filter.load_offers.button"),
        value: "load_offers",
      },
      {
        label: t("search.filter.free_cancellation.button"),
        value: "free_cancellation",
      },
      {
        label: t("search.filter.last_hours_offer-filter.button"),
        value: "last_hour_offer",
      },
    ],
    [t]
  )

  const unitForOptions = useMemo(
    () => [
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
    ],
    [t]
  )

  // Memoize cities data transformation
  const citiesData = useMemo(
    () => [
      {
        value: "0",
        label: t("general.all-cities"),
      },
      ...cities.map((city) => ({
        value: city.id + "",
        label: city.name,
      })),
    ],
    [cities, t]
  )

  // Get price values from form
  const priceValues = form.getValues().price

  const forceUpdate = useForceUpdate()

  return (
    <Drawer.Root open={opened} onClose={close}>
      <Drawer.Trigger>
        {" "}
        <ActionIcon
          onClick={open}
          component="span"
          size={"lg"}
          className="border-[#F3F3F3]"
          color="dark"
          variant="outline"
        >
          <SlidersHorizontal size={24} strokeWidth={1.4} />
        </ActionIcon>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[100] bg-black/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-[101] h-fit outline-none">
          <div className="overflow-hidden rounded-t-lg bg-white">
            <div className="flex justify-center pt-0.5">
              <div className="h-[4px] w-[70px] rounded bg-gray-300"></div>
            </div>
            <Drawer.Title className="px-1 py-1 text-center text-xl font-bold">
              <span className="block w-full text-center">
                {t("search.filter.mobile-title")}
              </span>
            </Drawer.Title>
            <Divider />
            <form onSubmit={handleSubmit}>
              <ScrollArea h={"70svh"} className="px-1">
                <Stack gap={"lg"}>
                  <Space />
                  {/* unit code filter */}
                  <TextInput
                    size="lg"
                    classNames={{
                      label: "mb-sm text-lg font-bold",
                    }}
                    label={t("search.filter.unit-code-filter.title")}
                    radius={"xl"}
                    leftSection={
                      <Search className="text-primary" strokeWidth={1.25} />
                    }
                    placeholder={t(
                      "search.filter.unit-code-filter.placeholder"
                    )}
                    key={form.key("unit_query")}
                    {...form.getInputProps("unit_query")}
                  />
                  <Divider />
                  {/* end unit code filter */}

                  {/* price filter */}
                  <Stack gap={"lg"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.price-filter.title")}
                    </Text>
                    <RangeSlider
                      min={50}
                      max={6000}
                      step={10}
                      onChangeEnd={() => forceUpdate()}
                      key={form.key("price")}
                      {...form.getInputProps("price")}
                    />
                    <Group wrap="nowrap" className="text-[#767676]">
                      <div className="w-full rounded-4xl border-[1.5px] border-[#F3F3F3] p-1">
                        {t("search.filter.price-filter.from")}{" "}
                        <NumberFormatter
                          value={priceValues[0]}
                          thousandSeparator
                        />{" "}
                        <RiyalIcon />
                      </div>
                      -
                      <div className="w-full rounded-4xl border-[1.5px] border-[#F3F3F3] p-1">
                        {t("search.filter.price-filter.to")}{" "}
                        <NumberFormatter
                          value={priceValues[1]}
                          thousandSeparator
                        />{" "}
                        <RiyalIcon />
                      </div>
                    </Group>
                  </Stack>
                  <Divider />
                  {/* end price filter */}
                  {/* result type filter */}
                  <Stack gap={"lg"} p={"xs"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.result_type-filter.button")}
                    </Text>
                    <Radio.Group
                      key={form.key("result_type")}
                      {...form.getInputProps("result_type")}
                    >
                      <Stack>
                        {resultTypeOptions.map((element) => (
                          <Radio
                            key={element.value}
                            classNames={{ label: "text-base" }}
                            value={element.value}
                            label={element.label}
                          />
                        ))}
                      </Stack>
                    </Radio.Group>
                  </Stack>
                  {/* end result type filter */}
                  <Divider />
                  {/* toggle filters */}
                  <Stack gap={"lg"} p={"xs"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.toggle-filter.button")}
                    </Text>
                    <Checkbox.Group
                      key={form.key("toggle_filters")}
                      {...form.getInputProps("toggle_filters")}
                    >
                      <Stack>
                        {toggleFilterOptions.map((element) => (
                          <Checkbox
                            radius={"sm"}
                            key={element.value}
                            classNames={{ label: "text-base" }}
                            value={element.value}
                            label={element.label}
                          />
                        ))}
                      </Stack>
                    </Checkbox.Group>
                  </Stack>
                  {/* end toggle filters */}
                  <Divider />
                  {/* ratting filters */}
                  <Stack gap={"lg"} p={"xs"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.rating-filter.title")}
                    </Text>
                    <Checkbox.Group
                      key={form.key("rating")}
                      {...form.getInputProps("rating")}
                    >
                      <SimpleGrid cols={3}>
                        {RATING_OPTIONS.map((ele) => (
                          <Checkbox.Card
                            className="group data-checked:bg-primary duration-200"
                            value={ele + ""}
                            key={ele}
                            radius="md"
                          >
                            <Group
                              wrap="nowrap"
                              align="center"
                              justify="center"
                              py={"xs"}
                              gap={"4"}
                              w={"100%"}
                            >
                              <Checkbox.Indicator className="absolute inset-0 opacity-0" />
                              <Star
                                className="fill-[#FFE234] text-[#FFE234] duration-200 group-data-checked:fill-white group-data-checked:text-white"
                                strokeWidth={1.25}
                              />
                              <Text
                                fw={500}
                                className="duration-200 group-data-checked:text-white"
                              >
                                {ele === 3 ? "<" : ""} {ele}
                              </Text>
                            </Group>
                          </Checkbox.Card>
                        ))}
                      </SimpleGrid>
                    </Checkbox.Group>
                  </Stack>
                  {/* end ratting filter */}
                  <Divider />
                  {/* start region filter */}
                  <SelectDropdownSearch
                    searchLabel={t("general.select-city")}
                    searchPlaceholder={t("general.city-search-placeholder")}
                    size="lg"
                    radius={"xl"}
                    classNames={{
                      label: "mb-0.5 font-normal",
                    }}
                    label={t("general.select-city")}
                    placeholder={t("general.select")}
                    data={citiesData}
                    key={form.key("city_id")}
                    {...form.getInputProps("city_id")}
                  />
                  <SelectDropdownSearch
                    searchLabel={t("general.select-region")}
                    searchPlaceholder={t("general.region-search-placeholder")}
                    size="lg"
                    radius={"xl"}
                    classNames={{
                      label: "mb-0.5 font-normal",
                    }}
                    label={t("general.select-region")}
                    placeholder={t("general.select")}
                    data={regionsData.data || []}
                    key={form.key("region_id")}
                    {...form.getInputProps("region_id")}
                  />
                  <Select
                    rightSection={<div></div>}
                    size="lg"
                    radius={"xl"}
                    label={t("search.filter.direction-filter.title")}
                    placeholder={t("search.filter.direction-filter.button")}
                    data={directionsQuery.data || []}
                    comboboxProps={{
                      withinPortal: false,
                    }}
                    classNames={{
                      label: "mb-0.5 font-normal",
                    }}
                    key={form.key("direction_id")}
                    {...form.getInputProps("direction_id")}
                  />

                  {/* end region filter */}
                  <Divider />
                  {/* unit type filter */}
                  <Stack gap={"lg"} p={"xs"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.result_type-filter.button")}
                    </Text>
                    <Radio.Group
                      key={form.key("unit_type_id")}
                      {...form.getInputProps("unit_type_id")}
                    >
                      <Stack>
                        {unitTypes.map((element) => {
                          return (
                            <Radio
                              key={element.id}
                              classNames={{ label: "text-base" }}
                              value={element.id + ""}
                              label={element.name}
                            />
                          )
                        })}
                      </Stack>
                    </Radio.Group>
                  </Stack>
                  {/* end unit type filter */}

                  <Divider />
                  {/* start pools filter */}
                  <Stack gap={"lg"} p={"xs"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.unit_for-filter.title")}
                    </Text>
                    <Checkbox.Group
                      key={form.key("unit_for")}
                      {...form.getInputProps("unit_for")}
                    >
                      <Stack>
                        {unitForOptions.map((element) => (
                          <Checkbox
                            radius={"sm"}
                            size="lg"
                            key={element.value}
                            value={element.value}
                            label={element.label}
                          />
                        ))}
                      </Stack>
                    </Checkbox.Group>
                  </Stack>
                  {/* end unit for filter */}
                  <Divider />
                  {/* end pools filter */}
                  {/* rooms count filter */}
                  <Stack gap={"lg"} p={"xs"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.count-filter.title")}
                    </Text>
                    <Stack gap={"lg"}>
                      <CustomNumberInput
                        classNames={{
                          input: "text-center",
                          label: "mb-0.5 font-normal",
                        }}
                        label={t("search.filter.count-filter.room-count")}
                        key={form.key("rooms_count")}
                        {...form.getInputProps("rooms_count")}
                      />
                      <CustomNumberInput
                        classNames={{
                          input: "text-center",
                          label: "mb-0.5 font-normal",
                        }}
                        key={form.key("master_beds_count")}
                        {...form.getInputProps("master_beds_count")}
                        label={t("search.filter.count-filter.beds-count")}
                      />
                      <CustomNumberInput
                        classNames={{
                          input: "text-center",
                          label: "mb-0.5 font-normal",
                        }}
                        key={form.key("single_beds_count")}
                        {...form.getInputProps("single_beds_count")}
                        label={t(
                          "search.filter.count-filter.single-beds-count"
                        )}
                      />
                    </Stack>
                  </Stack>
                  {/*end rooms count filter  */}
                  <Divider />
                  {/* start pools filter */}
                  <Stack gap={"lg"} p={"xs"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.pools-filter.title")}
                    </Text>
                    <Checkbox.Group
                      key={form.key("amenities")}
                      {...form.getInputProps("amenities")}
                    >
                      <Stack>
                        {poolsQuery.data?.map((element) => (
                          <Checkbox
                            radius={"sm"}
                            size="lg"
                            key={element.value}
                            value={element.value}
                            label={element.label}
                          />
                        ))}
                      </Stack>
                    </Checkbox.Group>
                  </Stack>
                  {/* end pools filter */}
                  <Divider />

                  {/* facilities filter */}
                  <Stack gap={"lg"} p={"xs"}>
                    <Text className="text-lg font-bold">
                      {t("search.filter.facilities-filter.title")}
                    </Text>
                    <Checkbox.Group
                      key={form.key("facilities")}
                      {...form.getInputProps("facilities")}
                    >
                      <Stack>
                        {facilitiesQuery.data?.map((element) => (
                          <Checkbox
                            radius={"sm"}
                            size="lg"
                            key={element.value}
                            value={element.value}
                            label={element.label}
                          />
                        ))}
                      </Stack>
                    </Checkbox.Group>
                  </Stack>
                  {/* end facilities filter */}
                </Stack>
              </ScrollArea>

              <SimpleGrid
                pb={"md"}
                pt={"xs"}
                className="[box-shadow:_0px_-16px_40px_0px_#0000001F]"
                cols={2}
              >
                <Button type="submit">
                  {t("general.apply-filters")}
                  <span className="text-primary ms-1 inline-flex aspect-square h-1.5 w-1.5 shrink-0 items-center justify-center rounded-4xl bg-white">
                    {dirtyInputs}
                  </span>
                </Button>
                <Button
                  onClick={clearFilters}
                  variant="transparent"
                  color="red"
                >
                  {t("general.clear")}
                </Button>
              </SimpleGrid>
            </form>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default MobileFilterDrawer
