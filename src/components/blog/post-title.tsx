export default function PostTitle({ children }: { children: string }) {
  return (
    <h1
      className="mb-3 text-center text-6xl font-bold leading-tight tracking-tighter md:text-right md:text-7xl md:leading-none lg:text-8xl"
      dangerouslySetInnerHTML={{ __html: children }}
    />
  )
}
