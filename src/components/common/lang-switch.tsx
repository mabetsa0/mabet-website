// components/LanguageSwitcher.tsx

"use client"

import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { Box, Button, Menu, UnstyledButton } from "@mantine/core"
import { Globe } from "lucide-react"
import { LOCALES } from "@/config"
import { usePathname } from "@/lib/i18n/navigation"

const LanguageSwitcher = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = useLocale()

  const changeLanguage = (newLocale: string) => {
    const searchParams = window.location.search
    const newPath = `/${newLocale}${pathname}${searchParams}`
    router.push(newPath)
  }

  return (
    <>
      <Box visibleFrom="md">
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
      </Box>
      <Box hiddenFrom="md">
        <UnstyledButton
          onClick={() => changeLanguage("ar")}
          className={
            "px-xs py-md gap-xs flex items-center rounded-md font-medium rtl:hidden"
          }
        >
          <Globe strokeWidth={1.3} />
          {t("brows-in-arabic")}
        </UnstyledButton>
        <UnstyledButton
          onClick={() => changeLanguage("en")}
          className={
            "px-xs py-md gap-xs flex items-center rounded-md font-medium ltr:hidden"
          }
        >
          <Globe strokeWidth={1.3} />
          {t("brows-in-english")}
        </UnstyledButton>
      </Box>
    </>
  )
}

export default LanguageSwitcher
