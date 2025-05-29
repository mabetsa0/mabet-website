/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/cn"

interface Props {
  title: string
  coverImage: string
  slug?: string
}

export default function CoverImage({ title, coverImage }: Props) {
  const image = (
    <img
      alt={`Cover Image for ${title}`}
      src={coverImage}
      className={cn(
        "shadow-small",
        "hover:shadow-medium h-full w-full object-cover transition-shadow duration-200"
      )}
    />
  )
  return (
    <div className="sm:mx-0">
      <div className="aspect-[16/8] w-full">{image}</div>
    </div>
  )
}
