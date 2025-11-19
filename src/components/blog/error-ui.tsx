"use client"
import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "./button"

type Props = {
  error: string
}

const ErrorUi = ({ error }: Props) => {
  const router = useRouter()
  const reset = () => {
    window.location.reload()
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1">
      <h2 className="mb-2.5 text-lg">{error}</h2>
      <div className="flex gap-1">
        <Button onClick={() => router.back()}>العودة الى الخلف</Button>
        <Button
          variant={"destructive"}
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          المحاولة مجددا
        </Button>
      </div>
    </div>
  )
}

export default ErrorUi
