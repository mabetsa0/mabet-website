export type UnitSummary = {
  data: Data
  message: null
  success: boolean
}

export type Data = {
  unit: Unit
}

export type Unit = {
  date: string,
  night_price: number
}