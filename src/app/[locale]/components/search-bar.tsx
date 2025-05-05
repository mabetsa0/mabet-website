"use client"

import { City } from "@/@types/cities"
import { UnitType } from "@/@types/unit-types"
import { UnitTypeIcons } from "@/assets"
import SelectDropdownSearch from "@/components/ui/select-with-search"
import { cn } from "@/lib/cn"
import { useRouter } from "@/lib/i18n/navigation"
import { objectToSearchParams } from "@/utils/obj-to-searchParams"
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
import dayjs from "dayjs"
import { Building2, MapPin, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import DateRangePicker from "./date-range-picker"

// Definition of form values is required
type FormValues = {
  city_id: string
  unit_type: string
  dates: [Date | null, Date | null]
}

// createFormContext returns a tuple with 3 items:
// FormProvider is a component that sets form context
// useFormContext hook return form object that was previously set in FormProvider
// useForm hook works the same way as useForm exported from the package but has predefined type
export const [FormProvider, useSearchBarFormContext, useForm] =
  createFormContext<FormValues>()
const SearchBar = ({
  cities,
  unitTypes,
}: {
  cities: City[]
  unitTypes: UnitType[]
}) => {
  const t = useTranslations("general")
  const form = useForm({
    mode: "controlled",
    initialValues: {
      city_id: "",
      unit_type: "",
      dates: [dayjs().toDate(), dayjs().add(1, "day").toDate()],
    },
  })

  const Router = useRouter()
  const onSubmit = form.onSubmit((values) => {
    Router.push(`/search?${objectToSearchParams(values).toString()}`)
  })
  return (
    <section>
      <div className="container">
        {" "}
        <FormProvider form={form}>
          <form onSubmit={onSubmit}>
            <Group
              wrap="nowrap"
              className="bg-white rounded-[90px] border-[3px] border-[#F3F3F3] text-black"
              p={"8px"}
            >
              <Grid className="grow " px={"lg"}>
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
                    data={cities.map((city) => ({
                      value: city.id + "",
                      label: city.name,
                    }))}
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
                        <Stack className="w-full " gap={2}>
                          <Group gap={4}>
                            <Building2 size={17} strokeWidth={1.5} />

                            <Text className="text-sm">
                              {" "}
                              {t("select-unit-type")}
                            </Text>
                          </Group>
                          <Group
                            className={cn(
                              "h-[50px] items-center text-gray-600 text-lg",
                              form.values.unit_type && "text-gray-700"
                            )}
                          >
                            {form.values.unit_type
                              ? unitTypes.find(
                                  (element) =>
                                    element.id + "" == form.values.unit_type
                                )!.name
                              : t("select")}
                          </Group>
                        </Stack>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Radio.Group
                          key={form.key("unit_type")}
                          {...form.getInputProps("unit_type")}
                        >
                          <SimpleGrid cols={2}>
                            {unitTypes.map((type) => {
                              return (
                                <Radio.Card
                                  key={type.id}
                                  radius="md"
                                  value={type.id + ""}
                                  className="group duration-300 data-[checked]:border-primary data-[checked]:bg-[#18807826] px-2.5 py-2.5 relative"
                                >
                                  <Group wrap="nowrap" align="flex-start">
                                    <Radio.Indicator className="absolute opacity-0" />
                                    <Stack gap={"xs"} ta={"center"}>
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
                                        className="duration-300 group-data-[checked]:text-primary"
                                      >
                                        {type.name}
                                      </Text>
                                      <Text ta={"center"} size="sm" c={"gray"}>
                                        {type.units_count_text}
                                      </Text>
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
