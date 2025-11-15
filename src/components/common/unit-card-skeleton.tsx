"use client"
import { Card, Divider, Group, Skeleton, Space, Stack } from "@mantine/core"
import { cn } from "@/lib/cn"

const UnitCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Card
      padding="xs"
      radius="md"
      withBorder
      className={cn(
        "w-full max-w-[95vw] border-[#F3F3F3] sm:max-w-[400px]",
        className
      )}
    >
      {/* Image carousel skeleton */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded">
        {/* Heart icon skeleton */}
        <Skeleton
          className="absolute top-2 left-2 z-[1]"
          height={36}
          width={36}
          circle
        />
        {/* Badge skeleton */}
        <Skeleton
          className="absolute top-2 right-2 z-[1]"
          height={32}
          width={80}
          radius="md"
        />
        {/* Main image skeleton */}
        <Skeleton className="h-full w-full" />
      </div>

      <Stack className="grow" gap={4}>
        {/* Title skeleton */}
        <Skeleton height={24} width="80%" mt={8} radius="md" />

        {/* Code skeleton */}
        <Group align="center" gap={4}>
          <Skeleton height={18} width={18} circle />
          <Skeleton height={16} width={100} radius="md" />
        </Group>

        {/* Location skeleton */}
        <Group align="center" gap={4}>
          <Skeleton height={18} width={18} circle />
          <Skeleton height={16} width={150} radius="md" />
        </Group>

        <Space />

        {/* Price and badge section */}
        <Group justify="space-between">
          <div>
            <Group gap={4}>
              <Skeleton height={24} width={80} radius="md" />
              <Skeleton height={16} width={40} radius="md" />
            </Group>
            <Skeleton height={14} width={100} mt={4} radius="md" />
          </div>
          <Skeleton height={40} width={120} radius="md" />
        </Group>

        <Space />
        <Divider mt={"auto"} />
        <Space />

        {/* Features section */}
        <Stack gap={"xs"}>
          <Skeleton height={16} width={60} radius="md" />
          <Group justify="space-evenly" wrap="nowrap" gap={"sm"}>
            <Group gap={4} wrap="nowrap">
              <Skeleton height={16} width={16} circle />
              <Skeleton height={14} width={60} radius="md" />
            </Group>
            <Divider orientation="vertical" />
            <Group gap={4} wrap="nowrap">
              <Skeleton height={16} width={16} circle />
              <Skeleton height={14} width={50} radius="md" />
            </Group>
            <Divider orientation="vertical" />
            <Group gap={4} wrap="nowrap">
              <Skeleton height={16} width={16} circle />
              <Skeleton height={14} width={70} radius="md" />
            </Group>
            <Divider orientation="vertical" />
            <Group gap={4} wrap="nowrap">
              <Skeleton height={16} width={16} circle />
              <Skeleton height={14} width={60} radius="md" />
            </Group>
          </Group>
        </Stack>
      </Stack>
    </Card>
  )
}

export default UnitCardSkeleton
