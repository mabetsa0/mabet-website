"use client"
/* eslint-disable @next/next/no-img-element */
import { BadgeCheck, CalendarDays, Gift, Wallet } from "lucide-react"

import { UserResponse } from "@/types/user-response"

import { cn } from "@/lib/cn"
import ProfileDataCard from "./data-card"

import { useNafath } from "@/hooks/use-nafath"
import Mabet from "@/services"
import { Button } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import { RiyalIcon } from "../icons"

const ProfileHeader = () => {
  const isRtl = useLocale() === "ar"
  const t = useTranslations("general")
  const [_, { onOpen }] = useNafath()

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await Mabet.get<UserResponse>(`/account/me`)
      return response.data.data.user
    },
  })
  return (
    <div className="flex justify-between gap-10 py-8 max-md:flex-col max-md:items-center max-md:text-center">
      <div className="flex gap-2">
        <div>
          <p className="mb-2 text-lg font-bold xl:text-xl">
            <img
              src={user?.avatar}
              className="inline-block aspect-square w-8 ltr:mr-2 rtl:ml-2"
              alt="avatar"
            />
            {user?.name ? user?.name : "الاسم: غير معروف"}
          </p>
          <span className="text-textGray">
            {user?.email ? user?.email : "الايميل: غير معروف"}
          </span>
        </div>
        <>
          {user?.nafath_validated ? (
            <p className="mt-1 cursor-pointer" title="verified">
              <BadgeCheck className="inline-block h-5 w-5 text-primary" />{" "}
              <span className="text-sm font-semibold ltr:hidden">
                حساب موثق
              </span>
              <span className="text-sm font-semibold rtl:hidden">Verified</span>
            </p>
          ) : (
            <Button
              color="dark"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={onOpen}
            >
              {t("verify-account")}
            </Button>
          )}
        </>
      </div>
      <div className="flex gap-4 max-md:flex-col xl:gap-5">
        <div className="flex gap-4 xl:gap-5">
          <ProfileDataCard
            className="rounded-b-none max-md:!w-full"
            label={isRtl ? "عدد الحجوزات" : "Reservations"}
            value={user?.bookings_count || "0"}
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
                {Number(user?.wallet_balance).toFixed(2) || "0.0,00"}{" "}
                {isRtl ? <RiyalIcon /> : "SAR"}
              </p>
            </div>
            <p className="mt-3 text-sm">
              {isRtl ? "رصيد محفظتك" : "Your Wallet"}
            </p>
          </div>
          <ProfileDataCard
            className="!rounded-bl-xl rounded-tr-none"
            label={isRtl ? "نقاطك" : "Your points"}
            value={user?.points || "00"}
            icon={<Gift className="text-white" size={18} />}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileHeader
