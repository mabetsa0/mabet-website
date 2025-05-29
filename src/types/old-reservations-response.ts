export interface OldReservationResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  reservations: Reservation[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: null
  previous_page_url: null
}

export interface Reservation {
  id: number
  fake_id: number
  booking_id: string
  code: string
  image_path: string
  badge: Badge | null
  unit_code: string
  unit_name: string
  unit_id: number
  total: string
  points: number
  down_payment: string
  checkin: string
  checkout: string
  from: string
  to: string
  arrival_remain: number | null
  paid: number
  remaining: null
  remaining_plain: null | string
  can_add_review: boolean
  can_view_maps: boolean
  maps_link: string
  arrival_instructions: ArrivalInstruction[] | null
}

export interface ArrivalInstruction {
  label: string
  content_type: string
  content: string
}

export interface Badge {
  text: string
  bg_color: string
  color: string
}
