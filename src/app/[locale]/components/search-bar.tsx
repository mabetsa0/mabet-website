"use client"

import { Building2, MapPin, Search } from "lucide-react"
import { ActionIcon, Divider, Group, Select, Grid } from "@mantine/core"
import { useTranslations } from "next-intl"
import DateRangePicker from "./date-range-picker"
import { City } from "@/@types/cities"
import { UnitType } from "@/@types/unit-types"
import { createFormContext } from "@mantine/form"
import { useRouter } from "@/lib/i18n/navigation"
import { objectToSearchParams } from "@/utils/obj-to-searchParams"
import dayjs from "dayjs"

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
                  <Select
                    size="lg"
                    classNames={{
                      label: "text-sm",
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
                    rightSection={<div></div>}
                    rightSectionWidth={0}
                    searchable
                    key={form.key("city_id")}
                    {...form.getInputProps("city_id")}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <Group wrap="nowrap">
                    <Divider orientation="vertical" />
                    <Select
                      size="lg"
                      classNames={{
                        label: "text-sm",
                        input: "text-gray-700 placeholder:text-gray-600",
                      }}
                      variant="unstyled"
                      label={
                        <Group gap={"4"}>
                          <Building2 size={17} strokeWidth={1.5} />
                          {t("select-unit-type")}
                        </Group>
                      }
                      placeholder={t("select")}
                      data={unitTypes.map((type) => ({
                        value: type.id + "",
                        label: type.name,
                      }))}
                      rightSection={<div></div>}
                      rightSectionWidth={0}
                      searchable
                      key={form.key("unit_type")}
                      {...form.getInputProps("unit_type")}
                    />
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
