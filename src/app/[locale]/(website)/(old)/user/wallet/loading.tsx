import { Loader } from "@mantine/core"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
  )
}
