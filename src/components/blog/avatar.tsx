/* eslint-disable @next/next/no-img-element */
type Props = {
  src: string
  name: string
}
export default function Avatar({ src, name }: Props) {
  return (
    <div className="flex items-center">
      <div className="relative ml-[12px] h-4 w-4 overflow-hidden rounded-full p-[4px]">
        <img src={src} className="h-full w-full object-cover" alt={name} />
      </div>
      <div className="text-lg font-bold">{name}</div>
    </div>
  )
}
