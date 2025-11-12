export default function PostTitle({ children }: { children: string }) {
  return (
    <h1
      className="mb-3 text-center text-6xl leading-tight font-bold tracking-tighter md:text-right md:text-7xl md:leading-none lg:text-8xl"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
