import Mabeet from "@/api"
import type { AxiosRequestConfig } from "axios"

// a simple general fetch function
export const simpleFetch = async <T>(url: string, options?: AxiosRequestConfig<any> | undefined) => {
  const response = await Mabeet.get<T>(url, options)

  return response.data
}
