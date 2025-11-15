import { createFormContext } from "@mantine/form"

export type FormValues = {
  city_id: string
  unit_type_id: string
  dates: [Date | null, Date | null]
  step: number
}

export type TransformedValuesObject = {
  city_id: string
  unit_type_id: string
  from: string
  to: string
}

export type TransformedValues = (values: FormValues) => TransformedValuesObject

const [FormProvider, useFormContext, useForm] = createFormContext<
  FormValues,
  TransformedValues
>()

export { FormProvider, useFormContext, useForm }
