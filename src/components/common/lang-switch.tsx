// components/LanguageSwitcher.tsx

"use client"

import { LOCALES } from "@/config"
import { usePathname } from "@/lib/i18n/navigation"
import { Button, Menu } from "@mantine/core"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import { Globe } from "lucide-react"

const LanguageSwitcher = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = useLocale()

  const changeLanguage = useCallback(
    (newLocale: string) => {
      const searchParams = window.location.search
      const newPath = `/${newLocale}${pathname}${searchParams}`
      router.push(newPath)
    },
    [router, pathname]
  )

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button
            size="sm"
            className="max-md:px-0.5"
            variant="subtle"
            color="black"
            leftSection={<Globe strokeWidth={1.3} />}
          >
            {t(`general.locales.${currentLocale}`)}
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          {LOCALES.map((element) => {
            return (
              <Menu.Item
                onClick={() => changeLanguage(element)}
                disabled={element === currentLocale}
                key={element}
              >
                {t(`general.locales.${element}`)}
              </Menu.Item>
            )
          })}
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default LanguageSwitcher
