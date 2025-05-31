import React, { useState } from "react"
import { useParams } from "next/navigation"
import type { AxiosRequestConfig } from "axios"
import useSWR from "swr"

import Mabeet, { OldMabeet } from "../api"

const fetcher = async <T,>(
  url: string,
  options?: AxiosRequestConfig<any> | undefined
) => {
  const response = await Mabeet.get<{
    data: any
    message: any
    success: boolean
  }>(url, options)
  if (!response.data.success) throw new Error("fail to fetch: " + url)

  return response.data as T
}
const OldFetcher = async <T,>(
  url: string,
  options?: AxiosRequestConfig<any> | undefined
) => {
  const response = await OldMabeet.get<{
    data: any
    message: any
    success: boolean
  }>(url, options)

  console.log(response)
  if (!response.data.success) throw new Error("fail to fetch: " + url)

  return response.data as T
}

/**
 * a custom hook for simple fetch
 */
type Props<T> = {
  reqKey?: string | string[] | null
  url: string
  options?: AxiosRequestConfig<any> | undefined
  onSuccess?: (data: T, key: string) => void
  old?: true
}
const usePaginationFetcher = <T extends { data: { last_page: number } }>({
  url,
  options = {},
  onSuccess = () => {},
  old,
}: Props<T>) => {
  const [totalPages, setTotalPages] = useState(0)

  const [pageIndex, setPageIndex] = useState(1)

  url += pageIndex

  const { locale } = useParams() as { locale: "ar" | "en" }

  options.headers = { ...options.headers, "Accept-Language": locale }

  const swrRes = useSWR<T>(
    url,
    async () =>
      old ? await OldFetcher<T>(url, options) : await fetcher<T>(url, options),
    {
      revalidateOnFocus: false,

      onSuccess: (data, key) => {
        onSuccess(data, key)
        setTotalPages(data.data.last_page)
        if (data.data.last_page < pageIndex) {
          setPageIndex(data.data.last_page)
        }
      },
    }
  )

  return { ...swrRes, setPageIndex, pageIndex, totalPages }
}

export default usePaginationFetcher
