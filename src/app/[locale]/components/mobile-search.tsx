"use client"
import { City } from "@/@types/cities"
import { UnitType } from "@/@types/unit-types"
import { UnitTypeIcons } from "@/assets"
import { useRouter } from "@/lib/i18n/navigation"
import { objectToSearchParams } from "@/utils/obj-to-searchParams"
import {
  ActionIcon,
  Burger,
  Button,
  Divider,
  Group,
  Image,
  Radio,
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { createFormContext } from "@mantine/form"
import dayjs from "dayjs"
import { Check, ChevronRight, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Drawer } from "vaul"
import "dayjs/locale/ar"
import relativeTime from "dayjs/plugin/relativeTime"
import durations from "dayjs/plugin/duration"
dayjs.extend(durations)
dayjs.extend(relativeTime)
// Definition of form values is required
type FormValues = {
  city_id: string
  unit_type: string
  dates: [Date | null, Date | null]
  step: number
}
type TransformedValues = (values: FormValues) => {
  city_id: string
  unit_type: string
  from: string
  to: string
}

const [FormProvider, useFormContext, useForm] = createFormContext<
  FormValues,
  TransformedValues
>()

const SelectCity = ({ cities }: { cities: City[] }) => {
  const form = useFormContext()
  const t = useTranslations("general")
  const [search, setSearch] = useState("")

  return (
    <Stack>
      <Space />
      <TextInput
        variant="default"
        value={search}
        leftSection={<Search size={18} className="text-primary" />}
        classNames={{
          input: "border border-gray-300 rounded-[30px] h-[50px]",
        }}
        onChange={(event) => setSearch(event.currentTarget.value)}
        placeholder={t("city-search-placeholder")}
      />
      <ScrollArea.Autosize h="50vh">
        <Stack gap={"xs"}>
          <UnstyledButton
            className="py-xs flex gap-xs"
            onClick={() => {
              form.setFieldValue("city_id", "0")
            }}
            key={0}
          >
            {form.values.city_id == "0" ? (
              <Check size={18} color="#767676" />
            ) : null}
            {t("all-cities")}
          </UnstyledButton>
          {cities
            .filter((city) =>
              city.name.toLowerCase().includes(search.toLowerCase().trim())
            )
            .map((city) => {
              return (
                <UnstyledButton
                  className="py-xs flex gap-xs"
                  onClick={() => {
                    form.setFieldValue("city_id", city.id + "")
                  }}
                  key={city.id}
                >
                  {form.values.city_id == city.id + "" ? (
                    <Check size={18} color="#767676" />
                  ) : null}
                  {city.name}
                </UnstyledButton>
              )
            })}
        </Stack>
      </ScrollArea.Autosize>
      <Button
        onClick={() => {
          form.setFieldValue("step", 1)
        }}
      >
        {t("continue")}
      </Button>
    </Stack>
  )
}

const SelectUnitType = ({ unitTypes }: { unitTypes: UnitType[] }) => {
  const form = useFormContext()
  const t = useTranslations("general")

  return (
    <Stack>
      <div className="p-lg">
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
                  className="group duration-300 data-[checked]:border-primary data-[checked]:bg-[#18807826] px-1.5 py-1.5 relative"
                >
                  <Group wrap="nowrap" align="flex-start">
                    <Radio.Indicator className="absolute opacity-0" />
                    <Stack gap={"xs"} ta={"center"}>
                      <Image
                        h={35}
                        w={35}
                        mx={"auto"}
                        src={
                          UnitTypeIcons[
                            (type.id + "") as keyof typeof UnitTypeIcons
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
      </div>
      <Button
        onClick={() => {
          form.setFieldValue("step", 2)
        }}
      >
        {t("continue")}
      </Button>
    </Stack>
  )
}

const SelectDate = (props: { cities: City[]; unitTypes: UnitType[] }) => {
  const form = useFormContext()
  const t = useTranslations()
  const selectedCite =
    props.cities.find((ele) => String(ele.id) == form.values.city_id)?.name ||
    t("general.all-cities")
  const selectedType =
    props.unitTypes.find((ele) => String(ele.id) == form.values.unit_type)
      ?.name || ""

  const [from, to] = form.values.dates

  const duration = dayjs(to).diff(dayjs(from), "days")

  return (
    <Stack>
      <Text py={"xs"} c={"#767676"}>
        {selectedCite} {selectedType}
      </Text>
      <Group justify="space-between">
        <Text c={"#767676"}>
          {t("general.from")}{" "}
          {from ? (
            <span className=" font-bold text-primary">
              {dayjs(from).format("DD")}
            </span>
          ) : null}{" "}
          {from ? dayjs(from).format("/ MMMM") : ""} -{" "}
          <span className=" font-bold text-primary">
            {to ? dayjs(to).format("DD") : null}
          </span>{" "}
          {to ? dayjs(to).format("/ MMMM") : null}
        </Text>
        {from && to ? (
          <Text c={"primary"}>
            ({dayjs.duration(duration, "day").locale("ar").humanize()})
          </Text>
        ) : null}
      </Group>
      <Divider />
      <div>
        <SegmentedControl
          size="sm"
          value={
            duration >= 27 ? "monthly" : duration >= 7 ? "weekly" : "daily"
          }
          fullWidth
          readOnly
          data={[
            {
              value: "daily",
              label: t("date-range-picker.daily"),
            },
            {
              value: "weekly",
              label: t("date-range-picker.weekly"),
            },
            {
              value: "monthly",
              label: t("date-range-picker.monthly"),
            },
          ]}
        />
      </div>
      <div className="w-full flex justify-center">
        <DatePicker
          size="lg"
          hideOutsideDates
          minDate={new Date()}
          type="range"
          // value={value}
          // onChange={setValue}
          key={form.key("dates")}
          {...form.getInputProps("dates")}
        />
      </div>
      <Button type="submit">{t("general.search-now")}</Button>
    </Stack>
  )
}
const MobileSearch = (props: { cities: City[]; unitTypes: UnitType[] }) => {
  const t = useTranslations("general")
  const form = useForm({
    mode: "controlled",
    initialValues: {
      city_id: "0",
      unit_type: "",
      dates: [dayjs().toDate(), dayjs().add(1, "day").toDate()],
      step: 0,
    },
    transformValues(values) {
      return {
        city_id: values.city_id,
        unit_type: values.unit_type,
        from: values.dates[0]
          ? dayjs(values.dates[0]).format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD"),
        to: values.dates[1]
          ? dayjs(values.dates[1]).format("YYYY-MM-DD")
          : dayjs().add(1, "day").format("YYYY-MM-DD"),
      }
    },
  })
  const step = form.values.step

  const Router = useRouter()
  const onSubmit = form.onSubmit((values) => {
    Router.push(`/search?${objectToSearchParams(values).toString()}`)
  })
  return (
    <>
      <div className="flex justify-center py-1.5 px-1 md:hidden">
        <Drawer.Root onClose={() => form.reset()}>
          <Drawer.Trigger>
            <Button
              component="div"
              leftSection={
                <Search className="text-primary" strokeWidth={1.25} />
              }
              size="lg"
              variant="outline"
              className="text-[12px] max-w-[85vw] border-[1.5] [box-shadow:_0px_16px_40px_0px_#0000001A]  font-normal rounded-[50px] h-[76px] text-[#767676]"
            >
              {t("mobile-search")}
            </Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className=" h-fit fixed bottom-0 left-0 right-0 outline-none">
              <div className="px-1 pb-1  overflow-hidden rounded-t-lg bg-white">
                <Drawer.Title className="font-bold text-xl">
                  <Group gap={"xs"} align="center">
                    {step == 0 ? (
                      <Drawer.Close>
                        <Burger component={"span"} opened size={"md"} />
                      </Drawer.Close>
                    ) : (
                      <div className="py-1">
                        <ActionIcon
                          onClick={() => {
                            form.setFieldValue("step", form.values.step - 1)
                          }}
                          variant="white"
                          size={"lg"}
                        >
                          <ChevronRight className="text-primary ltr:rotate-180" />
                        </ActionIcon>
                      </div>
                    )}

                    {step == 0 ? t("select-city") : null}
                    {step == 1 ? t("select-unitType") : null}
                    {step == 2 ? t("select-select-search-date") : null}
                  </Group>
                </Drawer.Title>
                <Divider />
                <FormProvider form={form}>
                  <form onSubmit={onSubmit}>
                    {step === 0 && <SelectCity cities={props.cities} />}
                    {step === 1 && (
                      <SelectUnitType unitTypes={props.unitTypes} />
                    )}
                    {step === 2 && <SelectDate {...props} />}
                  </form>
                </FormProvider>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  )
}

export default MobileSearch
