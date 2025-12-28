import Mabet from "@/services"

export const ApproveBooking = async ({
  bookingCode,
}: {
  bookingCode: string
}) => {
  const response = await Mabet.post(`/payment/${bookingCode}/approve`, {})
  console.log("🚀 ~ ApproveBooking ~ response:", response)
  return "/payment?payment_status=success&id=" + bookingCode
}
