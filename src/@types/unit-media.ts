export interface UnitMediaResponse {
  data: Data
  message: null
  success: boolean
}

export interface Data {
  media: Media[]
}

export interface Media {
  id: number
  type: string
  url: string
}
