"use client"
/* eslint-disable @next/next/no-img-element */
import {
  BadgeAlert,
  BadgeCheck,
  CalendarDays,
  Gift,
  Wallet,
} from "lucide-react"

import { User } from "@/types/user-response"

import ProfileDataCard from "./data-card"
import { cn } from "@/lib/cn"

import { RiyalIcon } from "../icons"
import { useLocale } from "next-intl"

const ProfileHeader = (props: User & { isRtl: boolean }) => {
  const isRtl = useLocale() === "ar"
  return (
    <div className="flex justify-between gap-10 py-8 max-md:flex-col max-md:items-center max-md:text-center">
      <div className="flex gap-2">
        <div>
          <p className="mb-2 text-lg font-bold xl:text-xl">
            <img
              src={props.user.avatar}
              className="inline-block aspect-square w-8 ltr:mr-2 rtl:ml-2"
              alt="avatar"
            />
            {props.user.name ? props.user.name : "الاسم: غير معروف"}
          </p>
          <span className="text-textGray">
            {props.user.email ? props.user.email : "الايميل: غير معروف"}
          </span>
        </div>
        <>
          {props.user.nafath_validated ? (
            <p className="mt-1 cursor-pointer" title="verified">
              <BadgeCheck className="inline-block h-5 w-5 text-primary" />{" "}
              <span className="text-sm font-semibold ltr:hidden">
                حساب موثق
              </span>
              <span className="text-sm font-semibold rtl:hidden">Verified</span>
            </p>
          ) : (
            <p className="mt-1 cursor-pointer" title="verified">
              <BadgeAlert className="inline-block h-5 w-5 text-red-500" />{" "}
              <span className="text-sm font-semibold ltr:hidden">غير موثق</span>
              <span className="text-sm font-semibold rtl:hidden">
                Unverified
              </span>
            </p>
          )}
        </>
      </div>
      <div className="flex gap-4 max-md:flex-col xl:gap-5">
        <div className="flex gap-4 xl:gap-5">
          <ProfileDataCard
            className="rounded-b-none max-md:!w-full"
            label={props.isRtl ? "عدد الحجوزات" : "Reservations"}
            value={props.user.bookings_count || "0"}
            icon={<CalendarDays className="text-white" size={18} />}
          />
        </div>
        <div className="flex gap-4 xl:gap-5">
          <div
            className={cn(
              "rounded-2xl rounded-bl-none [box-shadow:0px_0px_8px_0px_#188078d8]",
              "rounded-bl-xl rounded-tl-none",
              "min-w-[165px] cursor-pointer bg-primary p-3 font-bold text-white md:min-w-[180px] xl:min-w-[210px]"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex aspect-square w-10 items-center justify-center rounded-full border-[3px] border-white">
                <Wallet className="text-white" size={18} />
              </div>
              <p className="text-xl">
                {Number(props.user.wallet_balance).toFixed(2) || "0.0,00"}{" "}
                {isRtl ? <RiyalIcon /> : "SAR"}
              </p>
            </div>
            <p className="mt-3 text-sm">
              {props.isRtl ? "رصيد محفظتك" : "Your Wallet"}
            </p>
          </div>
          <ProfileDataCard
            className="!rounded-bl-xl rounded-tr-none"
            label={props.isRtl ? "نقاطك" : "Your points"}
            value={props.user.points || "00"}
            icon={<Gift className="text-white" size={18} />}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
