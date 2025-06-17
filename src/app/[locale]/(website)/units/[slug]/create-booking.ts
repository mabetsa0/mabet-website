import { CreateBookingResponse } from "@/@types/booking"
import Mabet from "@/services"

export const createBooking = async (data: {
  from: string
  to: string
  unitId: string | number
  private: "1" | undefined
}) => {
  const { from, to, unitId: unit, private: isPrivate } = data
  const response = await Mabet.post<CreateBookingResponse>(
    `/payment/create-booking`,
    {
      from,
      to,
      unit,
      private: isPrivate,
    }
  )
  const booking = response.data.data.booking
  return booking.code
}
