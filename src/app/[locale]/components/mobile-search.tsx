"use client"
import { Button } from "@mantine/core"
import { Drawer } from "vaul"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import React from "react"

const MobileSearch = () => {
  const t = useTranslations("general")
  return (
    <>
      <div className="flex justify-center py-1.5 px-1">
        <Drawer.Root>
          <Drawer.Trigger>
            <Button
              component="div"
              leftSection={
                <Search className="text-primary" strokeWidth={1.25} />
              }
              size="lg"
              variant="outline"
              className="text-[12px] border-[1.5] [box-shadow:_0px_16px_40px_0px_#0000001A]  font-normal rounded-[50px] h-[76px] text-[#767676]"
            >
              {t("mobile-search")}
            </Button>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
              <div className="p-4 bg-white">{/* Content */}</div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </>
  )
}

export default MobileSearch
