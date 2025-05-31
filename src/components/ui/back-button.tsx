import { ActionIcon } from "@mantine/core"
import { ChevronRight } from "lucide-react"
import React from "react"
import { useRouter } from "next/navigation"

type Props = {}

const BackButton = (props: Props) => {
  const Router = useRouter()
  const back = () => {
    Router.back()
  }
  return (
    <ActionIcon onClick={back} size={"lg"} color="dark" variant="subtle">
      <ChevronRight size={28} strokeWidth={1.4} className="ltr:rotate-180" />
    </ActionIcon>
  )
}

export default BackButton
