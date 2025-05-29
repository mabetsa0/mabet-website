export interface WalletResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  current_balance: string
  current_balance_text: string
  data: Datum[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: null
  previous_page_url: null
}

export interface Datum {
  id: number
  label: string
  description: null | string
  credit: string
  credit_text: string
  credit_color: string
  badge: Badge | null
  creation_date: CreationDate
}

export interface Badge {
  text: string
  color: string
  bg_color: string
}

export interface CreationDate {
  timestamp: number
  iso8601: Date
  date: string
  time: string
  text: string
}
