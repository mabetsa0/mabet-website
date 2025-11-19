import messages from "@/content/en.json"
import formats from "@/lib/i18n/request"
import { routing } from "@/lib/i18n/routing"

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
    Formats: typeof formats
  }
}
