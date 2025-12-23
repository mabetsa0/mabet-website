"use client"

import { useReceiveMessage } from "../_hooks/use-receive-message"
import { useReceiveMessageRead } from "../_hooks/use-receive-message-read"

type Props = {}

const ReceivedMessage = (props: Props) => {
  useReceiveMessage()
  useReceiveMessageRead()

  return null
}

export default ReceivedMessage
