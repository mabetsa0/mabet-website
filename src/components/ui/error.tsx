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
    <div className="w-full min-h-[60vh] flex items-center justify-center px-4">
      <Stack gap={12} align="center" className="text-center max-w-xl">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="w-4 h-4" strokeWidth={1.25} aria-hidden />
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
