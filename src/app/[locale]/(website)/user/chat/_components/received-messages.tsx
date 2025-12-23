"use client"
import { useReceiveMessage } from "../_hooks/use-receive-message"

type Props = {}

const ReceivedMessage = (props: Props) => {
  useReceiveMessage()

  return null
}

export default ReceivedMessage
