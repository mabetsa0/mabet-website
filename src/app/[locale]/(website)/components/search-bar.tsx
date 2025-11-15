"use client"

import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import {
  ActionIcon,
  Divider,
  Grid,
  Group,
  Image,
  Popover,
  Radio,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core"
import { createFormContext } from "@mantine/form"
import { Building2, MapPin, Search } from "lucide-react"
import { UnitTypeIcons } from "@/assets"
import SelectDropdownSearch from "@/components/ui/select-with-search"
import { useCities, useUnitTypes } from "@/context/global-data-context"
import { cn } from "@/lib/cn"
import { useRouter } from "@/lib/i18n/navigation"
import DateRangePicker from "./date-range-picker"
import {
  type SearchFormValues,
  type TransformedSearchValues,
  getInitialSearchFormValues,
  transformSearchFormValues,
  buildSearchUrl,
  DEFAULT_CITY_ID,
} from "./shared/search-utils"

// Definition of form values is required
type TransformedValues = (values: SearchFormValues) => TransformedSearchValues

// createFormContext returns a tuple with 3 items:
// FormProvider is a component that sets form context
// useFormContext hook return form object that was previously set in FormProvider
// useForm hook works the same way as useForm exported from the package but has predefined type
export const [FormProvider, useSearchBarFormContext, useForm] =
  createFormContext<SearchFormValues, TransformedValues>()

const SearchBar = () => {
  const cities = useCities()
  const unitTypes = useUnitTypes()
  const searchparams = useSearchParams()
  const t = useTranslations("general")
  const router = useRouter()

  const form = useForm({
    mode: "controlled",
    initialValues: getInitialSearchFormValues(searchparams),
    transformValues: transformSearchFormValues,
  })

  const onSubmit = form.onSubmit((values) => {
    const url = buildSearchUrl(searchparams, values)
    router.push(url)
  })
  return (
    <section>
      <div className="container">
        {" "}
        <FormProvider form={form}>
          <form onSubmit={onSubmit}>
            <Group
              wrap="nowrap"
              className="rounded-[90px] border-[3px] border-[#F3F3F3] bg-white text-black"
              p={"8px"}
            >
              <Grid className="grow" px={"lg"}>
                <Grid.Col span={3}>
                  <SelectDropdownSearch
                    searchLabel={t("select-city")}
                    searchPlaceholder={t("city-search-placeholder")}
                    size="lg"
                    classNames={{
                      label: "text-sm font-normal",

                      input: "text-gray-700 placeholder:text-gray-600",
                    }}
                    variant="unstyled"
                    label={
                      <Group gap={"4"}>
                        <MapPin size={17} strokeWidth={1.5} />
                        {t("select-city")}
                      </Group>
                    }
                    placeholder={t("select")}
                    data={[
                      {
                        value: DEFAULT_CITY_ID,
                        label: t("all-cities"),
                      },
                      ...cities.map((city) => ({
                        value: city.id + "",
                        label: city.name,
                      })),
                    ]}
                    key={form.key("city_id")}
                    {...form.getInputProps("city_id")}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Group wrap="nowrap">
                    <Divider orientation="vertical" />
                    <Popover
                      transitionProps={{ duration: 200, transition: "pop" }}
                      withArrow
                      shadow="md"
                    >
                      <Popover.Target>
                        <Stack className="w-full" gap={2}>
                          <Group gap={4}>
                            <Building2 size={17} strokeWidth={1.5} />

                            <Text className="text-sm">
                              {" "}
                              {t("select-unit-type")}
                            </Text>
                          </Group>
                          <Group
                            className={cn(
                              "h-[50px] !cursor-pointer items-center text-lg text-gray-600",
                              form.values.unit_type_id && "text-gray-700"
                            )}
                          >
                            {form.values.unit_type_id
                              ? unitTypes.find(
                                  (element) =>
                                    element.id + "" == form.values.unit_type_id
                                )!.name
                              : t("select")}
                          </Group>
                        </Stack>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Radio.Group
                          key={form.key("unit_type_id")}
                          {...form.getInputProps("unit_type_id")}
                        >
                          <SimpleGrid cols={2}>
                            {unitTypes.map((type) => {
                              return (
                                <Radio.Card
                                  key={type.id}
                                  radius="md"
                                  value={type.id + ""}
                                  className="group data-[checked]:border-primary relative px-2.5 py-2.5 duration-300 data-[checked]:bg-[#18807826]"
                                >
                                  <Group wrap="nowrap" align="flex-start">
                                    <Radio.Indicator className="absolute opacity-0" />
                                    <Stack
                                      gap={"xs"}
                                      ta={"center"}
                                      className="w-full"
                                    >
                                      <Image
                                        h={40}
                                        w={40}
                                        mx={"auto"}
                                        src={
                                          UnitTypeIcons[
                                            (type.id +
                                              "") as keyof typeof UnitTypeIcons
                                          ]
                                        }
                                        alt={type.name}
                                      />
                                      <Text
                                        fz={"sm"}
                                        fw={700}
                                        className="group-data-[checked]:text-primary duration-300"
                                      >
                                        {type.name}
                                      </Text>
                                      {/* <Text ta={"center"} size="sm" c={"gray"}>
                                        {type.units_count_text}
                                      </Text> */}
                                    </Stack>
                                  </Group>
                                </Radio.Card>
                              )
                            })}
                          </SimpleGrid>
                        </Radio.Group>
                      </Popover.Dropdown>
                    </Popover>
                  </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                  <Group wrap="nowrap" h={"100%"}>
                    <Divider orientation="vertical" />
                    <DateRangePicker />
                  </Group>
                </Grid.Col>
              </Grid>
              <ActionIcon type="submit" size={96} radius={"50%"}>
                <Search size={36} strokeWidth={1.25} />
              </ActionIcon>
            </Group>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}

export default SearchBar
