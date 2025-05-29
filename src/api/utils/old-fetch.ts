import Mabeet, { OldMabeet } from "@/api"
import type { AxiosRequestConfig } from "axios"

// a simple general fetch function
export const oldFetch = async <T>(url: string, options?: AxiosRequestConfig<any> | undefined) => {
  const response = await OldMabeet.get<T>(url, options)

  return response.data
}
