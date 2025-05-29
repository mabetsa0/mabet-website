import { Blog } from "@/types/blog-response"

import { BlogApi } from ".."

export const getRelatedBlogs = async (slug: string) => {
  if (!slug) throw new Error("no url provided to getBlogs function")

  const response = await BlogApi.get<{
    data: {
      posts: Blog[]
    }
  }>("/posts/" + slug + "/related")

  return response.data?.data.posts
}
