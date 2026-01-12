"use client"

import { useReceiveMessage } from "../_hooks/use-receive-message"
import { useReceiveMessageRead } from "../_hooks/use-receive-message-read"
import { useReceivePresenceUpdate } from "../_hooks/use-receive-presence-update"

type Props = {}

const ReceivedMessage = (props: Props) => {
  useReceiveMessage()
  useReceiveMessageRead()
  useReceivePresenceUpdate()

  return null
}

export default ReceivedMessage
