import { Metadata } from "next"

import { SEOResponse } from "@/@types/seo-response"
import { Seo } from "."

export const SEO = async (
  url: string,
  params?: URLSearchParams | Record<string, unknown>
) => {
  const response = await Seo.get<SEOResponse<Metadata>>(url, { params })

  return response.data.data.meta_data
}
