import { Blog, BlogResponse } from "@/types/blog-response"

import { BlogApi } from ".."

export const getBlog = async (slug: string) => {
  if (!slug) throw new Error("no url provided to getBlogs function")

  const response = await BlogApi.get<{
    data: {
      post: Blog
    }
  }>("/posts/" + slug)

  return response.data?.data.post
}
