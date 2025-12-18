"use client"
import { Button, Group, Stack, Text, Title } from "@mantine/core"
import { AlertTriangle } from "lucide-react"

type ErrorUIProps = {
  title?: string
  message?: string
  onRetry?: () => void
  retryLabel?: string
}

const ErrorUI = ({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
}: ErrorUIProps) => {
  const reload =
    onRetry ??
    (() => {
      window.location.reload()
    })
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center px-4">
      <Stack gap={12} align="center" className="max-w-xl text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-4 w-4" strokeWidth={1.25} aria-hidden />
        </div>
        <Title order={2}>{title}</Title>
        {message && (
          <Text c="dimmed" size="sm">
            {message}
          </Text>
        )}
        <Group gap={8} mt={8}>
          <Button onClick={reload} variant="filled" color="red">
            {retryLabel}
          </Button>
          <Button component="a" href="/" variant="light" color="gray">
            Go to homepage
          </Button>
        </Group>
      </Stack>
    </div>
  )
}

export default ErrorUI
