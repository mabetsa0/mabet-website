/* eslint-disable @next/next/no-img-element */
"use client"
import { mada, madfu, masterCard, visa } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import {
  Divider,
  Group,
  Radio,
  RadioGroup,
  Space,
  Stack,
  Switch,
  Text,
} from "@mantine/core"
import { useLocale, useTranslations } from "next-intl"
import Script from "next/script"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"
import { useEffect } from "react"
import { BookingDetails } from "../payment-summary"

const paymentCards = [masterCard, mada, visa]
const PaymentForm = (booking: BookingDetails) => {
  const [{ method, use_wallet, payment_option }, set] = useQueryStates({
    method: parseAsString.withDefault("card"),
    use_wallet: parseAsStringLiteral(["1"]),
    payment_option: parseAsStringLiteral(["full", "partial"]).withDefault(
      "partial"
    ),
  })
  const t = useTranslations("payment-form")
  const locale = useLocale()

  useEffect(() => {
    if (!window.TabbyPromo) return
    new window.TabbyPromo({
      selector: "#tabby",
      currency: "SAR", // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
      price: booking.full_payment + "", // required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
      installmentsCount: 4, // Optional, for non-standard plans.
      lang: locale.toLocaleUpperCase(), // Optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag.
      source: "product", // Optional, snippet placement; `product` for product page and `cart` for cart page.
    })
  }, [locale, booking.full_payment])
  return (
    <Stack className="md:mt-5">
      <Stack gap={"xs"}>
        <h2 className="text-h4 md:text-h5 font-bold">{t("title")}</h2>
        <Text className="text-lg" c={"#767676"}>
          {t("description")}
        </Text>
      </Stack>
      {Number(booking.wallet.current_balance) && method === "card" ? (
        <Group>
          <Switch
            checked={!!use_wallet}
            onChange={(e) => {
              set({ use_wallet: e.target.checked ? "1" : null })
            }}
            size="lg"
          />
          <Stack gap={"4"}>
            <Text className="text-xl font-bold">{t("use-wallet")}</Text>
            <Text c={"#767676"}>
              {t("use-wallet-description", {
                value: booking.wallet.current_balance,
              })}{" "}
              <RiyalIcon />
            </Text>
          </Stack>
        </Group>
      ) : null}
      <Divider />
      <RadioGroup
        value={method}
        onChange={(value) => {
          set({
            method: value,
            payment_option: value === "card" ? "partial" : null,
            use_wallet: value === "card" ? "1" : null,
          })
        }}
      >
        <Stack gap={"lg"}>
          <Radio
            size="lg"
            value={"card"}
            label={t("card")}
            classNames={{
              label: "font-bold",
              description: "-ms-2.5 mt-1",
            }}
            description={
              <Group component={"span"}>
                {paymentCards.map((card, index) => (
                  <span key={index} className="relative h-2 w-3">
                    <img
                      alt={"payment option"}
                      src={card.src}
                      className="absolute inset-0 h-full w-full object-contain"
                      loading="lazy"
                    />
                  </span>
                ))}
              </Group>
            }
          />
          {method === "card" ? (
            <Radio.Group
              value={payment_option}
              onChange={(value) => {
                set({ payment_option: value as "full" | "partial" })
              }}
            >
              <Stack ms={"lg"}>
                <Space />
                <Radio
                  size="sm"
                  value="partial"
                  label={
                    <span>
                      {t("partial-payment", { value: booking.down_payment })}{" "}
                      <RiyalIcon />
                    </span>
                  }
                />
                <Radio
                  value="full"
                  label={
                    <span>
                      {t("full-payment", { value: booking.full_payment })}
                      <RiyalIcon />
                    </span>
                  }
                />
              </Stack>
            </Radio.Group>
          ) : null}
          <Divider />
          <Radio
            size="lg"
            value={"tabby"}
            label={t("tabby")}
            classNames={{
              label: "font-bold",
              description: "-ms-2.5 mt-1",
            }}
            description={<span className="block" id="tabby"></span>}
          />
          <Divider />
          <Radio
            size="lg"
            value={"madfu"}
            label={t("madfu")}
            classNames={{
              label: "font-bold",
              description: "-ms-2.5 mt-1",
            }}
            description={
              <Group component={"span"}>
                <img alt="madfu" src={madfu.src} />
                <Text c={"#767676"} component="span">
                  {t("madfu-description")}
                </Text>
              </Group>
            }
          />
        </Stack>
      </RadioGroup>
      {/* <PayByWallet opened={opened} toggleModel={toggleModel} /> */}
      <Script
        src="https://checkout.tabby.ai/tabby-promo.js"
        onLoad={() => {
          // @ts-expect-error any
          new TabbyPromo({
            selector: "#tabby",
            currency: "SAR", // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
            price: booking.full_payment + "", // required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
            installmentsCount: 4, // Optional, for non-standard plans.
            lang: locale.toLocaleUpperCase(), // Optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag.
            source: "product", // Optional, snippet placement; `product` for product page and `cart` for cart page.
          })
        }}
      />
    </Stack>
  )
}

export default PaymentForm
