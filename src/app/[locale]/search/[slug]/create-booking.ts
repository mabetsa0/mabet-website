import { CreateBookingResponse } from "@/@types/booking"
import Mabet from "@/services"

export const createBooking = async (data: {
  from: string
  to: string
  unitId: string
}) => {
  const { from, to, unitId: unit } = data
  const response = await Mabet.post<CreateBookingResponse>(
    `/payment/create-booking`,
    {
      from,
      to,
      unit,
    }
  )
  const booking = response.data.data.booking
  return booking.id
}
