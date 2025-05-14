/* eslint-disable @next/next/no-img-element */
"use client"
import { City } from "@/@types/cities"
import { UnitType } from "@/@types/unit-types"
import "@/app/transition-css.css"
import { UnitTypeIcons } from "@/assets"
import AutoHeight from "@/components/ui/auto-height"
import { useCities, useUnitTypes } from "@/context/global-date-context"
import { useRouter } from "@/lib/i18n/navigation"
import {
  ActionIcon,
  Burger,
  Button,
  Divider,
  Group,
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
import "dayjs/locale/ar"
import durations from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"
import { Check, ChevronRight, Search } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import { Drawer } from "vaul"
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
                      <img
                        height={35}
                        width={35}
                        className="mx-auto"
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

  const locale = useLocale()

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
            ({dayjs.duration(duration, "day").locale(locale).humanize()})
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
const MobileSearch = ({ children }: { children: React.ReactNode }) => {
  const cities = useCities()
  const unitTypes = useUnitTypes()
  const t = useTranslations("general")
  const searchparams = useSearchParams()
  const form = useForm({
    mode: "controlled",
    initialValues: {
      city_id: searchparams.get("city_id") || "0",
      unit_type: searchparams.get("unit_type") || "",
      dates: [
        searchparams.get("from")
          ? new Date(searchparams.get("from") as string)
          : dayjs().toDate(),

        searchparams.get("to")
          ? new Date(searchparams.get("to") as string)
          : dayjs().add(1, "day").toDate(),
      ],
      step: 0,
    },
    transformValues(values) {
      return {
        city_id: values.city_id == "0" ? "" : values.city_id,
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
  const nodeRef = useRef<ElementRef<"div">>(null)

  const Router = useRouter()
  const onSubmit = form.onSubmit((values) => {
    const newSearchParams = new URLSearchParams(searchparams)
    Object.entries(values).map(([key, value]) => {
      newSearchParams.delete(key)
      newSearchParams.append(key, value)
    })
    Router.push(`/search?${newSearchParams.toString()}`)
  })
  return (
    <>
      <Drawer.Root onClose={() => form.reset()}>
        <Drawer.Trigger className="w-full">{children}</Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed  z-[100] inset-0 bg-black/40" />
          <Drawer.Content className="  z-[101]  h-fit fixed bottom-0 left-0 right-0 outline-none">
            <div className="px-1 pb-1  overflow-hidden rounded-t-lg bg-white">
              <div className="flex justify-center pt-0.5">
                <div className="w-[120px] h-[8px] rounded bg-gray-200"></div>
              </div>
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
              <AutoHeight>
                <FormProvider form={form}>
                  <form onSubmit={onSubmit}>
                    <SwitchTransition>
                      <CSSTransition
                        key={step}
                        nodeRef={nodeRef}
                        addEndListener={(done: () => void) => {
                          nodeRef.current?.addEventListener(
                            "transitionend",
                            done,
                            false
                          )
                        }}
                        timeout={300}
                        classNames="fade-slide"
                      >
                        <div ref={nodeRef}>
                          {step === 0 && <SelectCity cities={cities} />}
                          {step === 1 && (
                            <SelectUnitType unitTypes={unitTypes} />
                          )}
                          {step === 2 && (
                            <SelectDate cities={cities} unitTypes={unitTypes} />
                          )}
                        </div>
                      </CSSTransition>
                    </SwitchTransition>
                  </form>
                </FormProvider>
              </AutoHeight>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  )
}

export default MobileSearch
