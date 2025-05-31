import { oldFetch } from "@/api/utils/old-fetch"
import { simpleFetch } from "@/api/utils/simpleFetch"
import type { AxiosRequestConfig } from "axios"
import useSWR from "swr"

/**
 * a custom hook for simple fetch
 */
type Props<T> = {
  reqKey?: string | string[] | null
  url: string
  options?: AxiosRequestConfig<any> | undefined
  onSuccess?: (data: T, key: string) => void
  shouldRetryOnError?: boolean
  old?: boolean
}
const useFetcher = <T,>({
  reqKey,
  url,
  options,
  shouldRetryOnError = true,
  onSuccess = () => {},
  old,
}: Props<T>) => {
  if (typeof reqKey === "undefined") reqKey = url

  const swrRes = useSWR<T>(
    reqKey,
    async () => {
      if (old) {
        return await oldFetch<T>(url, options)
      } else {
        return await simpleFetch<T>(url, options)
      }
    },

    {
      revalidateOnFocus: false,
      onSuccess,
      shouldRetryOnError: shouldRetryOnError,
    }
  )

  return swrRes
}

export default useFetcher
