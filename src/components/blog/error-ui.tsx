"use client"
import React from "react"
import { Button } from "./button"
import { useRouter } from "next/navigation"

type Props = {
  error: string
}

const ErrorUi = ({ error }: Props) => {
  const router = useRouter()
  const reset = () => {
    window.location.reload()
  }
  return (
    <div className="flex h-screen flex-col items-center  justify-center gap-1">
      <h2 className="text-lg mb-2.5">{error}</h2>
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
