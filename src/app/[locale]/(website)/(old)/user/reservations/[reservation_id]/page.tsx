/* eslint-disable @next/next/no-img-element */
import { OldMabeet } from "@/api"
import { Eye } from "lucide-react"

import { RiyalIcon } from "@/components/icons"
import BackButton from "@/components/ui/back-button"
import { SingleBookingResponse } from "@/types/single-booking-response"
import { Button } from "@mantine/core"
import Mabet from "@/services"

export interface BookingResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  bookings: Bookings
}

export interface Bookings {
  id: number
  code: string
  heading: string[]
  can_be_cancelled: boolean
  cancellation_text: string
  can_be_edited: boolean
  can_add_review: boolean
  payment_method: PaymentMethod
  unit: Unit
  booking_link: string
  checkin_text: string
  checkin_hijri: string
  checkin_time: string
  checkout_text: string
  checkout_hijri: string
  checkout_time: string
  nights_count: number
  night_price: string
  nights: string
  insurance: string
  partner: BookingsPartner
  badge: BookingsBadge
  total: string
  customer_fees: string
  paid: string
  paid_text: string
  remaining: string
  remaining_text: string
  pdf_link: string
  maps_link: string
  arrival_instructions: ArrivalInstruction[]
  from: string
  to: string
  duration: number
  night_price_text: string
  sub_total: string
  sub_total_text: string
  insurance_text: string
  total_text: string
  customer_fees_text: string
  show_down_payment: boolean
  down_payment: string
  down_payment_text: string
  full_payment: string
  full_payment_text: string
  payment_methods: PaymentMethods
  cashback: string
  cashback_text: string
  coupon: string
  discount_amount: string
  discount_amount_text: string
  discount: string
  discount_text: string
  discount_percent: string
  discount_percent_text: number
  saved_text: string
  additional_receipt_params: AdditionalReceiptParam[]
  wallet: Wallet
  support: Support
}

export interface AdditionalReceiptParam {
  label: string
  value: string
  color: string
}

export interface ArrivalInstruction {
  label: null
  content_type: string
  content: string
}

export interface BookingsBadge {
  label: string
  color: string
  bg_color: string
}

export interface BookingsPartner {
  name: string
  phone: string
}

export interface PaymentMethod {
  label: string
  icon: string
  icon_svg: string
  link?: string
}

export interface PaymentMethods {
  track_id: string
  apple_pay: ApplePay
  cards: ApplePay
  tabby: ApplePay
  madfu: ApplePay
}

export interface ApplePay {
  status: boolean
}

export interface Support {
  label: string
  links: PaymentMethod[]
}

export interface Unit {
  id: number
  is_favourite: boolean
  views: number
  partner: UnitPartner
  link: string
  slug: string
  name: string
  code: string
  cancellation_summary: CancellationSummary
  province: string
  city: string
  region: string
  area: string
  location: string
  mla: string
  mlg: string
  coupon: Coupon
  badge: UnitBadge
  stars: string
  reviews_count: number
  reviews_count_text: string
  unit_type: string
  checkin: string
  checkout: string
  currency: string
  images: Image[]
  cancellation_policy: CancellationPolicy
  licence: Licence
  insurance: number
  terms: string[]
}

export interface UnitBadge {
  text: string
  color: string
  bg_color: string
  border_color: string
  icon: string
  icon_svg: string
}

export interface CancellationPolicy {
  title: string
  description: string
}

export interface CancellationSummary {
  data: Datum[]
}

export interface Datum {
  title: string
  icon: string
  icon_svg: string
}

export interface Coupon {
  id: number
  code: string
  text: string
  color: string
  bg_color: string
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface Licence {
  license_text: string
}

export interface UnitPartner {
  id: number
  name: string
  stars: string
  reviews_count: number
  reviews_count_text: string
}

export interface Wallet {
  current_balance: string
  current_balance_text: string
}

const Page = async ({
  params,
}: {
  params: Promise<{ locale: "ar" | "en"; reservation_id: string }>
}) => {
  const { locale, reservation_id } = await params
  const isRtl = locale === "ar"
  // const response = await Mabeet.get<SingleBookingResponse>(`/account/bookings/${params.reservation_id}`)
  const response = await Mabet.get<BookingResponse>(
    `/account/bookings/${reservation_id}`
  )
  const data = response.data.data.bookings

  return (
    <>
      <section className="px-6">
        <BackButton />
        <div>
          <h3 className="mb-10 text-center text-xl font-bold text-customBlack lg:text-3xl">
            {isRtl ? `الحجز رقم` : ` Reservation No. `} {data?.id}
          </h3>

          <div className="flex gap-10 max-md:flex-col">
            <div className="w-full md:w-1/2">
              <div className="rounded-xl border px-4 py-6 shadow">
                <h2 className="mb-4 text-lg font-bold">
                  {isRtl ? "تفاصيل الحجز" : "Reservation details"}
                </h2>

                <div>
                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "العقار" : "Unit name"}
                    </p>
                    <p className="text-textGray">{data?.unit.name}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "كود العقار" : "Unit code"}
                    </p>
                    <p className="text-textGray">{data?.unit.code}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">{isRtl ? "المدينة" : "City"}</p>
                    <p className="text-textGray">{data?.unit.city}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "المنطقة" : "province"}
                    </p>
                    <p className="text-textGray">{data?.unit.province}</p>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-medium">
                      {isRtl ? "صفحة العقار" : "Unit page"}
                    </p>
                    <Button
                      color="gray"
                      variant="light"
                      component="a"
                      href={data ? data.unit.link : ""}
                    >
                      <span className="flex items-center gap-2 font-medium">
                        {isRtl ? "عرض العقار" : "Show unit"}

                        <Eye />
                      </span>
                    </Button>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "تاريخ الوصول" : "Arrival date"}
                    </p>
                    <p className="text-textGray">
                      {data?.from}
                      <span className="mt-1 block">{data?.checkin_hijri}</span>
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "وقت الوصول" : "Arrival time"}
                    </p>
                    <p className="text-textGray">{data?.checkin_time}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? " تاريخ المغادرة" : "Leaving date"}
                    </p>
                    <p className="text-textGray">
                      {data?.to}
                      <span className="mt-1 block">{data?.checkout_hijri}</span>
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? " وقت المغادرة" : "Leaving time"}
                    </p>
                    <p className="text-textGray">{data?.checkout_time}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "عدد الليالي" : "NO. of nights"}
                    </p>
                    <p className="text-textGray">{data?.nights}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "سعر الليلة" : "Night price"}
                    </p>
                    <p className="text-textGray">
                      {data?.night_price}{" "}
                      {isRtl ? (
                        <RiyalIcon className="fill-textGray" width={13} />
                      ) : (
                        "SAR"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="mb-4 rounded-xl border px-4 py-6 shadow">
                <h2 className="mb-4 text-lg font-bold">
                  {isRtl ? "بيانات المضيف" : "Host data"}
                </h2>

                <div>
                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">{isRtl ? "الاسم" : "Name"}</p>
                    <p className="text-textGray">{data?.partner.name}</p>
                  </div>

                  {/* <div className="mb-4 flex justify-between">
                    <p className="font-medium">{isRtl ? "الايميل" : "Email"}</p>
                    <p className="text-textGray">{data?}</p>
                  </div> */}

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "رقم الجوال" : "Phone NO."}
                    </p>
                    <p className="text-textGray">{data?.partner.phone}</p>
                  </div>
                </div>
              </div>
              <div className="mb-4 rounded-xl border px-4 py-6 shadow">
                <h2 className="mb-4 text-lg font-bold">
                  {isRtl ? "ملخص الحجز" : "Reservation summar"}
                </h2>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-medium">{isRtl ? "الفاتورة" : "Bill"}</p>
                    <Button
                      color="gray"
                      variant="light"
                      component="a"
                      href={data ? data.unit.link : ""}
                    >
                      <span className="flex items-center gap-2 font-medium">
                        {isRtl ? "عرض الفاتورة" : "Show bill"}

                        <Eye />
                      </span>
                    </Button>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "التأمين" : "insurance"}
                    </p>
                    <p className="text-textGray">
                      {data?.insurance} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "رسوم الخدمة" : "Service fee"}
                    </p>
                    <p className="text-textGray">
                      {data?.customer_fees} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "الإجمالي" : "Total"}
                    </p>
                    <p className="text-textGray">
                      {data?.total} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 rounded-xl border px-4 py-6 shadow">
                <h2 className="mb-4 text-lg font-bold">
                  {isRtl ? "بيانات الدفع" : "Payment details"}
                </h2>

                <div>
                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "طريقة الدفع" : "Payment method"}
                    </p>
                    <p className="text-textGray">
                      {data?.payment_method.label}{" "}
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">{isRtl ? "المدفوع" : "Paid"}</p>
                    <p className="text-textGray">
                      {data?.paid} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>

                  {data?.remaining ? (
                    <div className="mb-4 flex justify-between">
                      <p className="font-medium">
                        {isRtl ? "المتبقي" : "Remainder"}
                      </p>
                      <p className="text-textGray">
                        {data?.remaining} {isRtl ? <RiyalIcon /> : "SAR"}
                      </p>
                    </div>
                  ) : null}

                  <div className=" mt-3 flex justify-between border-t">
                    <p className="font-bold">{isRtl ? "الإجمالي" : "Total"}</p>
                    <p className="text-textGray">
                      {data?.total} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
