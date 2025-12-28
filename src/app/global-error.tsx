"use client"

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
    <div className="flex min-h-[60vh] w-full items-center justify-center px-1">
      <div className="flex max-w-xl flex-col items-center space-y-1 text-center">
        <div className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-1 w-1" strokeWidth={1.25} aria-hidden />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
          {title}
        </h2>
        {message && <p className="text-sm text-gray-500">{message}</p>}
        <div className="mt-0.5 flex items-center gap-0.5">
          <button
            type="button"
            onClick={reload}
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-1 py-0.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            {retryLabel}
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-1 py-0.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          >
            Go to homepage
          </a>
        </div>
      </div>
    </div>
  )
}

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
