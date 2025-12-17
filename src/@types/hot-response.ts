import { Unit } from "."

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
