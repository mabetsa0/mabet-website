"use client"
import ErrorUI from "@/components/ui/error"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <ErrorUI
          title={"Something went wrong"}
          message={
            process.env.NODE_ENV === "development" ? error?.message : undefined
          }
          onRetry={reset}
          retryLabel="Retry"
        />
      </body>
    </html>
  )
}
