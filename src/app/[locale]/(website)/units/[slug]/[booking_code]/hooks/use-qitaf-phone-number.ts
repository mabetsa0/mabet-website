import { parseAsString, useQueryState } from "nuqs"

export const useQitafPhoneNumber = () => {
  return useQueryState("qitaf_phone_number", parseAsString.withDefault(""))
}
