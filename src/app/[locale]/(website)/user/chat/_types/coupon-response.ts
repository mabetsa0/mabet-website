export interface CouponResponse {
  data: Data
}

export interface Data {
  id: number
  coupon: string
  discount: number
  type: string
  discount_text: string
  uses: number
  units: Unit[]
  show_on_app: boolean
  min_duration: null
  max_use: number
  min_total: null
  dates: any[]
  expires_at: string
  status: Status
}

export interface Status {
  is_active: boolean
  status: string
  text: string
  bg_color: string
  text_color: string
}

export interface Unit {
  id: number
  name: string
  code: string
  image: string
  unit_image: string
}
