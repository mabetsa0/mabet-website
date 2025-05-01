"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

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
