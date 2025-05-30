export interface UserResponse {
  data: Session
  message: null
  success: boolean
}

export interface Session {
  access_token: string
  user: UserData
  token_type: string
  expires_in: null
}

export interface UserData {
  id: string
  name: string
  email: string
  phonenumber: string
  user_type: string | null
  nationality_id: string | null
  citizenship_number: string | null
  resident_number: string | null
  passport_number: string | null
  date_of_birth: string | null
  points: string | null
  nafath_validated: boolean
  is_contract_signed: boolean
  down_payment_percent: number
  avatar: string
  wallet_balance: string
  wallet_balance_text: string
  sales_total: string
  units_count: number
  bookings_count: number
  review_total: number
  arrival_instructions_complete: boolean
  terms_and_conditions_complete: boolean
  tabby_enabled: boolean
  licenses_completed: boolean
  cancellation_policy: null
  has_draft: boolean
  last_draft_step: null
}
