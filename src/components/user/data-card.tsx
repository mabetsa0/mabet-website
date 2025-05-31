import React from "react"

import { cn } from "@/lib/cn"

type Props = {
  label: string
  icon: React.ReactNode
  value: string | number
  className?: string
}

const DataCard = ({ label, icon, value, className = "" }: Props) => {
  return (
    <div
      className={cn(
        "rounded-2xl rounded-bl-none [box-shadow:0px_0px_8px_0px_#188078d8]",
        className,
        "min-w-[165px] cursor-pointer bg-primary p-3 font-bold text-white md:min-w-[180px] xl:min-w-[210px]"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex aspect-square w-10 items-center justify-center rounded-full border-[3px] border-white">
          {icon}
        </div>
        <p className="text-xl">{value}</p>
      </div>
      <p className="mt-3 text-sm">{label}</p>
    </div>
  )
}

export default DataCard
