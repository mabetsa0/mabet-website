import Link from "next/link"
import { formateDate } from "@/utils/date-formatter"

import { type Blog } from "@/@types/blog-response"

import Avatar from "./avatar"
import CoverImage from "./cover-image"

type Props = Blog
export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-2 md:mb-4">
        <CoverImage title={title} coverImage={coverImage} slug={slug} />
      </div>
      <div className="mb-5 md:mb-7 md:grid md:grid-cols-2 md:gap-x-4 lg:gap-x-2">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link
              href={`/blog/${slug}`}
              className="hover:underline"
              dangerouslySetInnerHTML={{ __html: title }}
            ></Link>
          </h3>
          <div className="mb-1 text-lg md:mb-0">
            <time>{formateDate(date)}</time>
          </div>
        </div>
        <div>
          <div
            id="blog-preview"
            className="mb-1 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
          <Avatar {...author} />
        </div>
      </div>
    </section>
  )
}
