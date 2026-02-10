/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useMemo } from "react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Script from "next/script"
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
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"
import { applePay, mada, madfu, masterCard, tamara, visa } from "@/assets"
import { RiyalIcon } from "@/components/icons"
import { BookingDetails } from "../payment-summary"
import { STCRedeem } from "./stc-redeem"

const paymentCards = [masterCard, mada, visa]

type PaymentMethodType = "card" | "tabby" | "madfu" | "tamara"

interface PaymentMethodOption {
  value: PaymentMethodType
  label: string
  description: React.ReactNode
  enabled: boolean
}

const PaymentForm = (booking: BookingDetails) => {
  const paymentMethods = booking.payment_methods
  const t = useTranslations("payment-form")
  const locale = useLocale()

  // Get available payment methods based on status
  const availableMethods = useMemo<PaymentMethodOption[]>(() => {
    const methods: PaymentMethodOption[] = []

    if (paymentMethods.cards.status) {
      methods.push({
        value: "card",
        label: t("card"),
        description: (
          <Group component={"span"}>
            {paymentCards.map((card, index) => (
              <span key={index} className="relative h-2 w-3">
                <Image
                  alt={"payment option"}
                  src={card}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                />
              </span>
            ))}
            {paymentMethods.apple_pay.status && (
              <span className="relative h-2 w-3">
                <Image
                  alt={"payment option"}
                  src={applePay}
                  className="absolute inset-0 h-full w-full object-contain"
                  loading="lazy"
                />
              </span>
            )}
          </Group>
        ),
        enabled: true,
      })
    }

    if (paymentMethods.tabby.status) {
      methods.push({
        value: "tabby",
        label: t("tabby"),
        description: <span className="block" id="tabby"></span>,
        enabled: true,
      })
    }

    if (paymentMethods.madfu.status) {
      methods.push({
        value: "madfu",
        label: t("madfu"),
        description: (
          <Group component={"span"}>
            <Image alt="madfu" src={madfu} />
            <Text c={"#767676"} component="span">
              {t("madfu-description")}
            </Text>
          </Group>
        ),
        enabled: true,
      })
    }

    if (paymentMethods.tamara.status) {
      methods.push({
        value: "tamara",
        label: t("tamara"),
        description: (
          <Group component={"span"}>
            <Image alt="tamara" src={tamara} />
            <Text c={"#767676"} component="span">
              {t("madfu-description")}
            </Text>
          </Group>
        ),
        enabled: true,
      })
    }

    return methods
  }, [paymentMethods, t])

  // Get default method - use first available or "card" if available
  const defaultMethod = useMemo(() => {
    const cardMethod = availableMethods.find((m) => m.value === "card")
    return cardMethod?.value || availableMethods[0]?.value || "card"
  }, [availableMethods])

  const [{ method, use_wallet, payment_option }, set] = useQueryStates({
    method: parseAsString.withDefault("card"),
    use_wallet: parseAsStringLiteral(["1"]),
    payment_option: parseAsStringLiteral(["full", "partial"]).withDefault(
      "partial"
    ),
  })

  // Update method if current selection is not available or set default
  useEffect(() => {
    if (availableMethods.length === 0) return

    const isMethodAvailable = availableMethods.some((m) => m.value === method)
    if (!isMethodAvailable) {
      set({ method: defaultMethod })
    }
  }, [method, availableMethods, defaultMethod, set])

  // Initialize Tabby promo
  useEffect(() => {
    if (!window.TabbyPromo || !paymentMethods.tabby.status) return
    new window.TabbyPromo({
      selector: "#tabby",
      currency: "SAR", // required, currency of your product. AED|SAR|KWD|BHD|QAR only supported, with no spaces or lowercase.
      price: booking.full_payment + "", // required, price or the product. 2 decimals max for AED|SAR|QAR and 3 decimals max for KWD|BHD.
      installmentsCount: 4, // Optional, for non-standard plans.
      lang: locale.toLocaleUpperCase(), // Optional, language of snippet and popups, if the property is not set, then it is based on the attribute 'lang' of your html tag.
      source: "product", // Optional, snippet placement; `product` for product page and `cart` for cart page.
    })
  }, [locale, booking.full_payment, paymentMethods.tabby.status])

  const showWalletOption =
    Number(booking.wallet.current_balance) > 0 && method === "card"
  const showPaymentOptions =
    method === "card" && booking.down_payment !== booking.full_payment

  if (availableMethods.length === 0) {
    return (
      <Stack className="md:mt-5">
        <Stack gap={"xs"}>
          <h2 className="text-h4 md:text-h5 font-bold">{t("title")}</h2>
          <Text className="text-lg" c={"#767676"}>
            {t("description")}
          </Text>
        </Stack>
        <Text c={"red"} mt={"md"}>
          No payment methods available
        </Text>
      </Stack>
    )
  }

  return (
    <Stack className="md:mt-5">
      <Stack gap={"xs"}>
        <h2 className="text-h4 md:text-h5 font-bold">{t("title")}</h2>
        <Text className="text-lg" c={"#767676"}>
          {t("description")}
        </Text>
      </Stack>
      {/* <STCRedeem /> */}
      {showWalletOption && (
        <>
          <Group wrap="nowrap" align="start" mt={"sm"}>
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
          <Divider />
        </>
      )}

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
          {availableMethods.map((paymentMethod, index) => (
            <div key={paymentMethod.value}>
              {index > 0 && <Divider my="xs" />}
              <Radio
                size="lg"
                value={paymentMethod.value}
                label={paymentMethod.label}
                classNames={{
                  label: "font-bold",
                  description: "-ms-2.5 mt-1",
                }}
                description={paymentMethod.description}
              />
              {paymentMethod.value === "card" && showPaymentOptions && (
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
                          {t("partial-payment", {
                            value: booking.down_payment,
                          })}{" "}
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
              )}
            </div>
          ))}
        </Stack>
      </RadioGroup>

      {paymentMethods.tabby.status && (
        <Script
          src="https://checkout.tabby.ai/tabby-promo.js"
          onLoad={() => {
            // @ts-expect-error any
            new TabbyPromo({
              selector: "#tabby",
              currency: "SAR",
              price: booking.full_payment + "",
              installmentsCount: 4,
              lang: locale.toLocaleUpperCase(),
              source: "product",
            })
          }}
        />
      )}
    </Stack>
  )
}

export default PaymentForm
