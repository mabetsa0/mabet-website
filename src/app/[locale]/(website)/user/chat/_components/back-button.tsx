"use client"

import { useRouter } from "next/navigation"
import { ActionIcon } from "@mantine/core"
import { ChevronRight } from "lucide-react"

const BackButton = () => {
  const router = useRouter()
  return (
    <ActionIcon onClick={() => router.back()} title="go back">
      <ChevronRight className="text-secondaryColor w-5 shrink-0" />
    </ActionIcon>
  )
}

export default BackButton
