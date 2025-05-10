export type SearchParams = {
  city_id?: string
  region_id?: string
  direction_id?: string
  unit_query?: string
  unit_type_id?: string[]
  unit_for?: string
  priceFrom?: string
  priceTo?: string
  load_offers?: "1" | null
  last_hour_offer?: "1" | null
  rating?: string[]
  facilities?: string[]
  amenities?: string[]
  show_only_available?: "1" | null
  offer_id?: string
  mabet_selection?: string[]
  single_beds_count?: string
  master_beds_count?: string
  receptions_count?: string
  main_receptions_count?: string
  additional_receptions_count?: string
  toilets_count?: string
  external_receptions_count?: string
  pools_count?: string
  kitchens_count?: string
  table_seats_count?: string
  areaFrom?: string
  areaTo?: string
  hour_in_before?: string
  hour_out_after?: string
  no_insurance?: string
  free_cancellation?: string
  page?: string
  rooms_count?: string
  result_type?: string
  from?: string // ISO date string: 'YYYY-MM-DD'
  to?: string // ISO date string: 'YYYY-MM-DD'
}
