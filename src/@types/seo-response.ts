export interface SEOResponse<T> {
  data: Data<T>
  message: null
  success: boolean
}

export interface Data<T> {
  meta_data: T
}
