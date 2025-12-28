"use client"
import dynamic from "next/dynamic"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
//  setting error type to axios Error
import "@tanstack/react-query"
import { AxiosError } from "axios"

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError
  }
}
// Create a client
export const queryClient = new QueryClient()

// Only load React Query Devtools in development
const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () =>
          import("@tanstack/react-query-devtools").then(
            (d) => d.ReactQueryDevtools
          ),
        { ssr: false }
      )
    : () => null

export default function MyReactQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
