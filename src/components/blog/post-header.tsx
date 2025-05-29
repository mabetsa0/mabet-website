import { formateDate } from "@/utils/date-formatter"

import { type Blog } from "@/@types/blog-response"

import Avatar from "./avatar"
import CoverImage from "./cover-image"
import PostTitle from "./post-title"

type Props = Blog & {
  categories: string[]
}
export default function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-3 md:block">
        <Avatar {...author} />
      </div>
      <div className="mb-2 sm:mx-0 md:mb-4">
        <CoverImage title={title} coverImage={coverImage} />
      </div>
      <div className="mx-auto max-w-2xl">
        <div className="mb-1.5 block md:hidden">
          <Avatar {...author} />
        </div>
        <div className="mb-1.5 text-lg">
          نشر <time>{formateDate(date)}</time>
        </div>
      </div>
    </>
  )
}
