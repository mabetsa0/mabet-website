import { formateDate } from "@/utils/date-formatter"

import { type Blog } from "@/types/blog-response"

import Avatar from "./avatar"
import CoverImage from "./cover-image"
import { getLocale } from "next-intl/server"
import { Link } from "@/lib/i18n/navigation"

type Props = Blog
export default async function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  const locale = await getLocale()
  return (
    <div className="mb-5 md:break-inside-avoid lg:mb-8">
      <div className="mb-1">
        <CoverImage title={title} coverImage={coverImage} slug={slug} />
      </div>
      <h3 className="mb-[12px] text-3xl leading-snug">
        <Link
          href={`/blog/${slug}`}
          className="duration-200 hover:text-primary hover:underline"
          dangerouslySetInnerHTML={{ __html: title }}
        ></Link>
      </h3>
      <div className="mb-1 text-lg">
        <time>{formateDate(date, locale)}</time>
      </div>

      <div
        className="mb-1 text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <Avatar {...author} />
    </div>
  )
}
