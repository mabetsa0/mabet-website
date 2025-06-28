export interface WalletResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  current_balance: string
  current_balance_text: string
  data: WalletRecord[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: string
  previous_page_url: null
}

export interface WalletRecord {
  id: number
  label: string
  description: null | string
  credit: string
  credit_text: string
  credit_color: string
  badge: null
  creation_date: CreationDate
}

export interface CreationDate {
  timestamp: number
  iso8601: string
  date: string
  time: string
  text: string
}
