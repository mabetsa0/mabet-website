import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"

export const usePaymentState = () => {
  return useQueryStates({
    method: parseAsString.withDefault("card"),
    use_wallet: parseAsStringLiteral(["1", "0"]).withDefault("0"),
    payment_option: parseAsStringLiteral(["full", "partial"]).withDefault(
      "partial"
    ),
    coupon: parseAsString.withDefault(""),
  })
}
