import { Metadata } from "next"

import { SEOResponse } from "@/types/seo-response"
import { LocaleType } from "@/lib/i18n/types"

import { Seo } from ".."

export const getSEO = async (locale: LocaleType, url: string) => {
  const response = await Seo.get<SEOResponse<Metadata>>(url, {
    headers: {
      "Accept-Language": locale,
    },
  })

  return response.data.data.meta_data
}
