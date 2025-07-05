import Mabet from "@/services"
import { DetailedBookingResponse } from "../@types"

export const GetBooking = async (booking_code: string) => {
  const response = await Mabet.get<DetailedBookingResponse>(
    `/account/bookings/${booking_code}`
  )
  return response.data.data.bookings
}
