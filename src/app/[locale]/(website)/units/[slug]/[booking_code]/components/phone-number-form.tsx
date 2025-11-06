import Mabet from "@/services"
import { handleFormError } from "@/utils/handle-form-errors"
import { Button, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import PhoneInput, {
  getCountryCallingCode,
  isPossiblePhoneNumber,
  isSupportedCountry,
} from "react-phone-number-input"
import ar from "react-phone-number-input/locale/ar.json"
import en from "react-phone-number-input/locale/en.json"

type Props = {
  title: string
  onSubmit: (data: {
    country_code: string
    phonenumber: string
  }) => Promise<void>
}

const PhoneNumberForm = (props: Props) => {
  const t = useTranslations("auth")
  const locale = useLocale()
  const { booking_code } = useParams()
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      phonenumber: "",
      country_code: "966",
    },
    validate: {
      phonenumber: (value) => {
        return isPossiblePhoneNumber(value) ? null : t("invalid-phone-number")
      },
    },
    transformValues(values) {
      return {
        country_code: "+" + values.country_code,
        phonenumber: values.phonenumber.replace("+" + values.country_code, ""),
      }
    },
  })
  const onSubmit = form.onSubmit(async (data) => {
    try {
      if (data.country_code !== "+966")
        throw new Error(t("invalid-country-code"))
      await Mabet.post(`/qitaf-points-redeem/otp`, {
        phone_number: data.phonenumber,
      })
      await props.onSubmit(data)
    } catch (error) {
      handleFormError(error, form)
    }
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <Text>{props.title}</Text>
        <div dir="ltr">
          <PhoneInput
            styles={{
              input: {
                background: "transparent",
              },
            }}
            classNames={{
              input: "!text-left",
            }}
            className="items-end"
            name="mobile"
            labels={locale === "ar" ? ar : en}
            international
            countryCallingCodeEditable={false}
            defaultCountry="SA"
            inputComponent={TextInput}
            size="lg"
            onCountryChange={(value) => {
              if (!value || !isSupportedCountry(value)) return
              const code = getCountryCallingCode(value)
              form.setFieldValue("country_code", code)
            }}
            key={form.key("phonenumber")}
            {...form.getInputProps("phonenumber")}
          />
        </div>
        <Button type="submit" loading={form.submitting}>
          {t("continue")}
        </Button>
        {form.errors.root && (
          <Text className="text-sm " c={"red"} ta={"center"}>
            {form.errors.root}
          </Text>
        )}
      </Stack>
    </form>
  )
}

export default PhoneNumberForm
