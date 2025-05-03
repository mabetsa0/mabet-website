export type BlogResponse = {
  data: Data
  message: null
  success: boolean
}

export type Data = {
  posts: Blog[]
  from: number
  to: number
  total: number
  per_page: number
  current_page: number
  last_page: number
  next_page_url: null
  previous_page_url: null
}

export type Blog = {
  id: number
  slug: string
  title: string
  coverImage: string
  date: Date
  excerpt: string
  body: string
  author: Author
  categories: string[]
}

export type Author = {
  src: string
  name: string
}
