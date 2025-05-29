import "./post-body.css"
import "./tailwind-unset.css"
export default function PostBody({ content }: { content: string }) {
  return (
    <div className="mx-auto max-w-2xl   ">
      <div
        className={"content unset"}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}
