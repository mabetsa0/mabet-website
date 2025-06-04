"use client"

import { Loader, Modal, Pagination } from "@mantine/core"
import { useParams } from "next/navigation"

import usePaginationFetcher from "@/hooks/use-paginated-fetcher"
import { OldReservationResponse } from "@/types/old-reservations-response"
// import BookingCard from "@/components/ui/cards/booking-card"
import ErrorUI from "@/components/ui/error"
import ReservationCard from "@/components/user/reservation-card"
import UserTapHeader from "@/components/user/tap-header"
import { Check, X } from "lucide-react"
import { parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { useQuery } from "@tanstack/react-query"
import Mabet from "@/services"
export interface ReservationsResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  bookings: Booking[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: null
  previous_page_url: null
}

export interface Booking {
  id: number
  code: string
  track_id: string
  partner: BookingPartner
  badge: StatusClass
  status: StatusClass
  unit: Unit
  total: string
  points: number
  down_payment: string
  checkin: string
  checkin_text: string
  checkin_hijri: string
  checkin_time: string
  checkout: string
  checkout_text: string
  checkout_hijri: string
  checkout_time: string
  arrival_remain: number
  paid: string
  paid_text: string
  remaining: string
  remaining_text: string
  can_add_review: boolean
  can_view_maps: boolean
  maps_link: string
  arrival_instructions: ArrivalInstruction[]
  from: string
  to: string
  duration: number
  night_price: string
  night_price_text: string
  sub_total: string
  sub_total_text: string
  insurance: string
  insurance_text: string
  total_text: string
  customer_fees: string
  customer_fees_text: string
  show_down_payment: boolean
  down_payment_text: string
  full_payment: string
  full_payment_text: string
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

export interface StatusClass {
  label: string
  color: string
  bg_color: string
}

export interface BookingPartner {
  phone: string
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
  province: string
  city: string
  region: string
  area: string
  location: string
  mla: string
  mlg: string
  coupon: Coupon
  badge: UnitForClass
  stars: string
  reviews_count: number
  reviews_count_text: string
  unit_type: string
  checkin: string
  checkout: string
  currency: string
  unit_for_sentence: string
  unit_for: UnitForClass[]
  details: string
  unit_content: UnitContent[]
  counts: Counts
  has_videos: boolean
  features: Feature[]
  chat_allowed: boolean
  response_rate: string
  tabby: Madfu
  madfu: Madfu
  reviews: Reviews
  images: Image[]
  cancellation_policy: CancellationPolicy
  licence: Licence
  insurance: number
}

export interface UnitForClass {
  text: string
  color: string
  bg_color: string
  border_color?: string
  icon: string
  icon_svg: string
}

export interface CancellationPolicy {
  title: string
  description: string
}

export interface Counts {
  room_count: number
  receptions_count: number
  toilets_count: number
  pools_count: number
  kitchens_count: number
}

export interface Coupon {
  id: number
  code: string
  text: string
  color: string
  bg_color: string
}

export interface Feature {
  name: string
  icon: string
  icon_svg: string
  list: string[]
  id?: number
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface Licence {
  license_text: string
}

export interface Madfu {
  enabled: boolean
  tabby_text: string
}

export interface UnitPartner {
  id: number
  name: string
  stars: string
  reviews_count: number
  reviews_count_text: string
}

export interface Reviews {
  heading: string
  reviews: null
}

export interface UnitContent {
  key: string
  count: string
  icon: string
  icon_svg: string
}

export interface Wallet {
  current_balance: string
  current_balance_text: string
}

type Props = {}

const Page = () => {
  const params = useParams()
  const isRtl = params.locale === "ar"
  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  )

  // const url = `/my/reservations?page=`
  // const { isLoading, error, data, setPageIndex, pageIndex, totalPages } =
  //   usePaginationFetcher<OldReservationResponse>({
  //     url: url,
  //     old: true,
  //   })

  const { data, status, error } = useQuery({
    queryKey: ["reservations", pageIndex],
    queryFn: () =>
      Mabet.get<ReservationsResponse>("/account/bookings", {
        params: {
          page: pageIndex,
        },
      }),
  })

  const [paymentStatus, setPaymentStatus] = useQueryState(
    "payment_status",
    parseAsString.withDefault("")
  )

  const onClose = () => {
    setPaymentStatus("")
  }
  if (status === "error") return <ErrorUI />
  if (status === "pending")
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    )

  const { bookings } = data!.data.data
  if (bookings.length === 0)
    return (
      <div className="md:px-5">
        <div>
          <p className="mb-3 text-lg font-semibold">
            {isRtl
              ? "لا يوجد حجوزات سابقة"
              : "There are no previous reservations'"}
          </p>
          <p className="text-textGray max-md:text-sm">
            {isRtl
              ? "يمكنك متابعة كل حجوزاتك من هنا"
              : "You can follow all your reservations from here"}
          </p>
        </div>
      </div>
    )

  return (
    <div className="md:px-5">
      <div>
        <UserTapHeader
          title={isRtl ? "حجوزاتك" : "Your Reservations"}
          des={
            isRtl
              ? "يمكنك متابعة كل حجوزاتك من هنا"
              : "You can follow all your reservations from here"
          }
        />
        {/* <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6"> */}
        <div className="space-y-4">
          {bookings.map((booking, i) => {
            // return <BookingCard key={booking.id} {...booking} isRtl={isRtl} />
            return <ReservationCard key={booking.id} {...booking} />
          })}
        </div>
      </div>

      {data?.data.data.last_page > 1 ? (
        <div className="mt-auto py-4 md:py-8">
          <div className="mx-auto w-fit">
            <Pagination
              value={pageIndex}
              onChange={setPageIndex}
              total={data?.data.data.last_page}
              classNames={{
                control: "data-[active]:!bg-primary hover:bg-primary",
              }}
            />
          </div>
        </div>
      ) : null}

      <Modal opened={paymentStatus ? true : false} onClose={onClose}>
        <div className="flex flex-col items-center text-center">
          {paymentStatus === "failed" ? (
            <X strokeWidth={1} className="size-20 text-red-500 mb-4" />
          ) : (
            <Check strokeWidth={1} className="size-20 text-green-500 mb-4" />
          )}

          <p className="text-lg font-medium pb-4">
            {paymentStatus === "failed" ? "فشلت عملية الدفع" : "تم الدفع بنجاح"}
          </p>
        </div>
      </Modal>
    </div>
  )

  return null
}

export default Page
