import { BlogResponse } from "@/@types/blog-response"
import { BlogApi } from "../services"

export const getBlogs = async (params?: { page: number | string }) => {
  const response = await BlogApi.get<BlogResponse>("/posts", {
    params,
  })

  return response.data
}
