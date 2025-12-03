export interface HostResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  host: Host
}

export interface Host {
  id: number
  name: string
  email: string
  phonenumber: string
  avatar: string
  cover: string
  link: string
  bio_info: BioInfo
  units: Unit[]
}

export interface BioInfo {
  stars: Stars
  since: ReplyAverage
  units: ReplyAverage
  reply_average: ReplyAverage
}

export interface ReplyAverage {
  label: string
  text: string
  icon: string
}

export interface Stars {
  total: string
  user_counts: number
  icon: string
}

export interface Unit {
  id: number
  slug: string
  code: string
  name: string
  views: number
  link: string
  description: string
  stars: string
  reviews_count: number
  reviews_count_text: string
  province: string
  city: string
  region: string
  area: string
  location: string
  unit_for_sentence: string
  unit_for: Badge[]
  unit_content: UnitContent[]
  unit_type: null
  is_favourite: boolean
  label: null
  dates_suggestions: any[]
  badge: Badge
  weekly_monthly_badge: WeeklyMonthlyBadge
  prices: null
  tabby_enabled: boolean
  madfu_enabled: boolean
  images: Image[]
}

export interface Badge {
  text: string
  color: string
  bg_color: string
  border_color?: string
  icon: string
  icon_svg: string
}

export interface Image {
  image_path: string
  caption: string
  alt: string
}

export interface UnitContent {
  key: string
  count: string
  icon: string
  icon_svg: string
}

export interface WeeklyMonthlyBadge {
  type: string
  text: string
  amount: string
  amount_text: string
}
