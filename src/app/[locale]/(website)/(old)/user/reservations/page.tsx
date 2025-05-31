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
import { parseAsString, useQueryState } from "nuqs"
type Props = {}

const Page = () => {
  const params = useParams()
  const isRtl = params.locale === "ar"

  const url = `/my/reservations?page=`
  const { isLoading, error, data, setPageIndex, pageIndex, totalPages } =
    usePaginationFetcher<OldReservationResponse>({
      url: url,
      old: true,
    })

  const [paymentStatus, setPaymentStatus] = useQueryState(
    "payment_status",
    parseAsString.withDefault("")
  )

  const onClose = () => {
    setPaymentStatus("")
  }
  if (error) return <ErrorUI />
  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    )

  const { reservations: bookings } = data!.data
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

      {totalPages > 1 ? (
        <div className="mt-auto py-4 md:py-8">
          <div className="mx-auto w-fit">
            <Pagination
              value={pageIndex}
              onChange={setPageIndex}
              total={totalPages}
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
}

export default Page
