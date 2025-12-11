"use client"

import React, { useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Eye } from "lucide-react"

type Props = {
  unit: {
    name: string
    id: string

    image: string
  }
}

const UnitCard = ({ unit: { name, image, id } }: Props) => {
  const ref = useRef<React.ComponentRef<"div">>(null)
  const t = useTranslations("chat")
  const locale = useLocale()

  return (
    <>
      <div dir="rtl" className="mx-auto my-4 max-w-md px-4" ref={ref}>
        <div className="overflow-hidden rounded-lg border">
          <p className="border-b bg-[#F2F2F2] px-[6px] py-2 text-sm font-bold">
            {t("unit-card.inquiry-about-booking", { name })}
          </p>
          <div className="flex">
            <div className="h-[95px] w-[95px]">
              <img
                className="h-full w-full object-cover"
                src={image}
                alt={name}
              />
            </div>
            <div className="space-y-2 p-2">
              <p className="text-sm font-bold">{name}</p>

              <a
                href={`https://mabet.com.sa/${locale}/units/${id}`}
                target="_blank"
                className="flex items-center gap-1"
              >
                <Eye className="size-4" />
                <span className="text-muted-foreground text-xs font-medium">
                  {t("unit-card.view-unit")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" })
          }
        }}
        className="sticky top-10 z-10 mb-2 flex cursor-pointer justify-center"
      >
        <div className="text-foreground/80 w-fit rounded-3xl border border-[#EEEEEE] bg-white px-4 py-1 text-center text-sm font-semibold">
          {t("unit-card.inquiry-about-booking", { name })}
        </div>
      </div>
    </>
  )
}

export default UnitCard
