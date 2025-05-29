export interface BusyDaysResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  closed_dates: ClosedDate[]
}

export interface ClosedDate {
  date: string
  type: "closed" | "available"
  min_stay: number
  message: string
}
