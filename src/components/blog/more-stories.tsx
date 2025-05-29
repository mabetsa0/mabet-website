import { type Blog } from "@/@types/blog-response"

import PostPreview from "./post-preview"

export default function MoreStories({ posts }: { posts: Blog[] }) {
  return (
    <section>
      <h2 className="mb-2 text-5xl font-bold leading-tight tracking-tighter text-primary md:text-6xl">
        مقالات اخرى
      </h2>

      <div className="mb-8 columns-1 gap-y-5 [column-fill:_balance] md:columns-2 md:gap-x-4 md:gap-y-8 lg:gap-x-8">
        {posts.map((blog, index) => (
          <PostPreview key={index} {...blog} />
        ))}
      </div>
    </section>
  )
}
