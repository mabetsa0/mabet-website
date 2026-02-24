"use client"

import { useTranslations } from "next-intl"
import { Avatar } from "@mantine/core"
import { User } from "lucide-react"
import { MabetSupport } from "@/assets"
import { cn } from "@/lib/cn"

const WhatsAppSupport = () => {
  const t = useTranslations("whatsappBar")
  return (
    <div className="relative">
      <a href={`https://wa.me/+966567570014`}>
        <div
          className={cn(
            "relative flex items-center gap-0.5 bg-white py-0.5 duration-100 hover:bg-[#FAFAFA] sm:px-1"
          )}
        >
          <Avatar
            src={MabetSupport.src}
            className="relative aspect-square size-4"
          >
            <User />
          </Avatar>
          <div className="grow leading-normal">
            <div className="mb-0.5">
              <p className="line-clamp-1 w-full font-bold">{t("title")}</p>
              <p className="line-clamp-1 text-xs font-semibold text-[#767676]">
                {t("cta")}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default WhatsAppSupport
