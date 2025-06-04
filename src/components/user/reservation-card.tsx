/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react"
import Image from "next/image"
import { Button, Modal } from "@mantine/core"
import {
  Calendar,
  Circle,
  Clock,
  CreditCard,
  Gift,
  LogIn,
  LogOut,
  Phone,
  Tag,
} from "lucide-react"

// import { Booking } from "@/types/reservations-response"

import AddReview from "./add-review"
import CompletePayment from "./complete-payment"
import { useLocale } from "next-intl"
import { logo } from "@/assets"
import { Booking } from "@/app/[locale]/(website)/(old)/user/reservations/page"
import { Link } from "@/lib/i18n/navigation"

const ReservationCard = ({ ...props }: Booking) => {
  const isRtl = useLocale() === "ar"
  const url = `/user/reservations/${props.id}`

  // show review module
  const [showAddReview, setShowAddReview] = useState(false)

  const handleShowReview: React.MouseEventHandler = (e) => {
    e.stopPropagation()
    setShowAddReview(true)
  }
  const handleClose = () => {
    setShowAddReview(false)
  }
  const [completePayment, setCompletePayment] = useState(false)

  const handleCompletePayment: React.MouseEventHandler = (e) => {
    e.stopPropagation()
    setCompletePayment(true)
  }
  const handleCompletePaymentClose = () => {
    setCompletePayment(false)
  }

  // handle arrival_instructions
  const [showInstructions, setShowInstructions] = useState(false)
  const handleShowInstructions = () => {
    setShowInstructions(true)
  }
  const handleCloseInstructions = () => {
    setShowInstructions(false)
  }

  // const instructionsImage = arrival_instructions ? arrival_instructions.filter(value=>{})
  const contactNumber = props.arrival_instructions
    ? props.arrival_instructions.filter((e) => {
        return e.content_type === "phone"
      })
    : false

  return (
    <>
      <div className="relative mb-6 flex flex-col overflow-hidden rounded-3xl bg-gray-100/70 p-2 shadow md:mb-5 xl:flex-row">
        <div
          className="absolute top-[6.5rem] z-[2] w-[190px] whitespace-nowrap py-1 text-center text-[15px] font-medium ltr:-right-3 ltr:origin-right ltr:rotate-45 rtl:-left-3 rtl:origin-left rtl:-rotate-45"
          style={{
            background: props.badge?.bg_color,
            color: props.badge?.color,
          }}
        >
          {props.badge.label}
        </div>
        <div className="relative block xl:w-[325px]">
          <div className="relative aspect-[3/2.5] overflow-hidden rounded-2xl">
            <img
              className="h-full w-full object-cover"
              loading="lazy"
              src={props.unit.images[0].image_path}
              alt={props.unit.name}
            />
          </div>
          {props.can_view_maps ? (
            <Button
              variant="light"
              color="white"
              component="a"
              target="_blank"
              href={props.maps_link}
              className="absolute bottom-3 ltr:right-3 rtl:left-3"
            >
              {!isRtl ? "show map" : "عرض الخريطة"}
            </Button>
          ) : null}
          <Button
            variant="light"
            color="white"
            component={Link}
            href={url}
            className="absolute bottom-3 ltr:left-3 rtl:right-3"
          >
            {!isRtl ? "Reservation Details" : "تفاصيل الحجز"}
          </Button>
        </div>

        <div className="flex grow gap-2 p-4 max-md:flex-col max-md:gap-4">
          <div className={`text-textGray max-xl:text-sm md:w-2/3`}>
            <p className="mb-2 text-lg font-medium text-[#1f1f1f] md:text-2xl md:leading-relaxed">
              {props.unit.name}
              <span className="text-[11px] text-textGray">
                ({props.unit.code})
              </span>
            </p>
            <p className="mb-2 flex items-center gap-1">
              <Tag size={18} color="#6c757d" />
              {isRtl ? "الاجمالي" : "Total "} {props.total}
            </p>
            <p className="mb-2 flex items-center gap-1">
              <CreditCard size={18} color="#6c757d" />
              {isRtl ? "المدفوع" : "Paid "} {props.down_payment}
            </p>
            {props.remaining ? (
              <p className="mb-2 flex items-center gap-1">
                <CreditCard size={18} color="#6c757d" />
                {isRtl ? "المتبقي" : "The remainder"} {props.remaining}
              </p>
            ) : null}
            <p className="mb-2 flex items-center gap-1 text-[12px]">
              <Calendar size={18} color="#6c757d" />
              <span>
                (
                <LogIn size={14} className="mx-1 inline-block text-green-700" />
                {props.from})
              </span>
              -
              <span>
                ({props.to}{" "}
                <LogOut size={14} className="mx-1 inline-block text-red-600" />)
              </span>
            </p>
            <p className="mb-2 flex items-center gap-1 text-[12px]">
              <Clock size={18} color="#6c757d" />
              <span>
                {isRtl ? "وقت الدخول" : "Arrival Time"}({props.checkin})
              </span>
              -
              <span>
                {isRtl ? "وقت الخروج" : "Leave Time"}({props.checkout})
              </span>
            </p>
            <p className="mb-2 flex items-center gap-1">
              <Gift size={18} color="#6c757d" />

              {isRtl ? `نقاط (${props.points})` : `Points (${props.points})`}
            </p>
          </div>

          <div className="flex flex-col justify-end gap-3 md:w-1/3">
            {props.arrival_instructions?.length &&
            props.arrival_instructions.length > 0 ? (
              <div>
                <Button
                  variant="light"
                  onClick={handleShowInstructions}
                  type={"button"}
                  className={`w-full text-center ltr:px-4 ltr:!text-sm ltr:xl:-translate-x-1 rtl:px-6`}
                >
                  {isRtl ? "تعليمات الوصول" : "Arrival Instructions"}
                </Button>
              </div>
            ) : null}
            {!!props.remaining ? (
              <div>
                <Button size="xs" fullWidth onClick={handleCompletePayment}>
                  {isRtl ? "إكمال الدفع" : "complete payment"}
                </Button>
              </div>
            ) : null}
            {props.can_add_review ? (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <Button
                  variant="light"
                  type="button"
                  onClick={handleShowReview}
                  className={`w-full text-center ltr:px-4 ltr:!text-sm ltr:xl:-translate-x-1 rtl:px-6`}
                >
                  {isRtl ? "أضافة تقييم" : "Add Review"}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Modal
        centered
        opened={completePayment}
        onClose={handleCompletePaymentClose}
        title={props.unit.name}
      >
        <CompletePayment bookingCode={props.code} />
      </Modal>
      <Modal
        centered
        opened={showAddReview}
        onClose={handleClose}
        title={props.unit.name}
      >
        <AddReview handleClose={handleClose} bookingId={props.code} />
      </Modal>
      <Modal
        size="lg"
        centered
        opened={showInstructions}
        onClose={handleCloseInstructions}
        title={isRtl ? "تعليمات الوصول" : "Arrival Instructions"}
      >
        <div className="space-y-4">
          <p className="text-xl font-medium">
            {isRtl
              ? "يرجى اتباع تعلميات الوصول لضمان الحصول على اعلى جودة حجز"
              : "Please follow the arrival instructions to ensure the highest quality reservation."}
          </p>

          {contactNumber
            ? contactNumber.map((e, i) => {
                return (
                  <div
                    className="flex items-center gap-3 rounded-md bg-gray-150/50 px-2 py-3 text-gray-500"
                    key={e.content + e.label + i}
                  >
                    <Image src={logo} alt="mabet" className="w-14" />
                    <div>
                      <p>{e.label}</p>
                      <p>{e.content}</p>
                    </div>
                  </div>
                )
              })
            : null}

          {props.arrival_instructions?.map((e, i) => {
            if (e.content_type === "phone" || e.content_type === "image")
              return null
            return (
              <div
                className="flex items-center gap-3 rounded-md bg-customWhite/50 px-2 py-3 text-gray-500"
                key={e.content + e.label + i}
              >
                <Image src={logo} alt="mabet" className="w-14" />
                <div>
                  <p>{e.label}</p>
                  <p>{e.content}</p>
                </div>
              </div>
            )
          })}
          {props.arrival_instructions?.map((e, i) => {
            if (e.content_type !== "image") return null
            return (
              <div className="" key={i}>
                <p className="flex items-start gap-3 py-1">
                  <Circle className="mt-1 w-5 shrink-0 text-primary" />{" "}
                  <span>{e.label}</span>
                </p>
                <img src={e.content} className="w-full" alt="image" />
              </div>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

export default ReservationCard
