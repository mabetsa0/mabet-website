/* eslint-disable @next/next/no-img-element */
type Props = {
  src: string
  name: string
}
export default function Avatar({ src, name }: Props) {
  return (
    <div className="flex items-center">
      <div className="w-4 h-4 rounded-full overflow-hidden relative ml-[12px] p-[4px]  ">
        <img src={src} className=" w-full h-full object-cover" alt={name} />
      </div>
      <div className="text-lg font-bold">{name}</div>
    </div>
  )
}
