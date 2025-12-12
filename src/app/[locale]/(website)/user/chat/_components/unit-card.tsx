"use client"

import React, { useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Button, Group } from "@mantine/core"
import { Link } from "@/lib/i18n/navigation"

type Props = {
  unit: {
    name: string
    id: string

    image: string
  }
  scrollIntoView: () => void
}

const UnitCard = ({ unit: { name, image, id }, scrollIntoView }: Props) => {
  const t = useTranslations("chat")

  return (
    <>
      <div className="mb-0.5 border-b border-b-gray-100 px-1">
        <Group wrap="nowrap" align="start" gap="xs">
          <div className="size-5 overflow-hidden rounded-md">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-h5 font-bold">{name}</p>
          <div className="ms-auto">
            <Button size="sm" component={Link} href={`/units/${id}`}>
              {t("unit-card.book-now")}
            </Button>
          </div>
        </Group>
      </div>
      <div
        onClick={scrollIntoView}
        className="sticky top-9 z-10 mb-0.5 flex cursor-pointer justify-center"
      >
        <div className="text-foreground/80 w-fit max-w-xs rounded-md border border-[#EEEEEE] bg-white px-0.5 py-0.5 text-center text-xs font-semibold">
          {t("unit-card.inquiry-about-booking", { name })}
        </div>
      </div>
    </>
  )
}

export default UnitCard
