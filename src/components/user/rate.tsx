"use client"

import { Button } from "@mantine/core"
import { Plus } from "lucide-react"
import { useLocale } from "next-intl"

type Props = {
  cleanliness: number
  conformity: number
  service: number
  place_condition: number
  handleChange: any
}

const UnitRating = ({
  cleanliness,
  conformity,
  service,
  place_condition,
  handleChange,
}: Props) => {
  const isRtl = useLocale() === "ar"
  return (
    <>
      <div className="mb-4 flex items-center gap-5 md:mb-5">
        <p className="min-w-[170px] max-md:text-sm md:min-w-[210px]">
          {isRtl ? "نظافة المكان" : "Cleanliness"}
        </p>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full !p-0"
            onClick={() => {
              handleChange("increase", "cleanliness")
            }}
          >
            <Plus className="text-white hover:text-primary" size={22} />
          </Button>

          <p className="w-[50px] text-center font-bold">{`${cleanliness}/10`}</p>

          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full !p-0"
            onClick={() => {
              handleChange("decrease", "cleanliness")
            }}
          >
            <span className="scale-x-150 text-2xl">-</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-5 md:mb-5">
        <p className="min-w-[170px] max-md:text-sm md:min-w-[210px]">
          {isRtl ? "المطابقة للمواصفات" : "Conformity to specifications"}
        </p>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full !p-0"
            onClick={() => {
              handleChange("increase", "conformity")
            }}
          >
            <Plus className="text-white hover:text-primary" size={22} />
          </Button>

          <p className="w-[50px] text-center font-bold">{`${conformity}/10`}</p>

          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full !p-0"
            onClick={() => {
              handleChange("decrease", "conformity")
            }}
          >
            <span className="scale-x-150 text-2xl">-</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-5 md:mb-5">
        <p className="min-w-[170px] max-md:text-sm md:min-w-[210px]">
          {isRtl ? "خدمة المضيف" : "Customer service"}
        </p>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full !p-0"
            onClick={() => {
              handleChange("increase", "service")
            }}
          >
            <Plus className="text-white hover:text-primary" size={22} />
          </Button>

          <p className="w-[50px] text-center font-bold">{`${service}/10`}</p>

          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full !p-0"
            onClick={() => {
              handleChange("decrease", "service")
            }}
          >
            <span className="scale-x-150 text-2xl">-</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-5 md:mb-5">
        <p className="min-w-[170px] max-md:text-sm md:min-w-[210px]">
          {isRtl ? "حالة المبيت" : "Housing condition"}
        </p>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full !p-0"
            onClick={() => {
              handleChange("increase", "place_condition")
            }}
          >
            <Plus className="text-white hover:text-primary" size={22} />
          </Button>

          <p className="w-[50px] text-center font-bold">{`${place_condition}/10`}</p>

          <Button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full !p-0"
            onClick={() => {
              handleChange("decrease", "place_condition")
            }}
          >
            <span className="scale-x-150 text-2xl">-</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default UnitRating
