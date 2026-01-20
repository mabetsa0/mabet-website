"use client"

import { useReceiveMessage } from "../_hooks/use-receive-message"
import { useReceiveMessageRead } from "../_hooks/use-receive-message-read"
import { useReceivePresenceUpdate } from "../_hooks/use-receive-presence-update"
import { useSession } from "@/stores/session-store"

type Props = {}

const Init = () => {
  useReceiveMessage()
  useReceiveMessageRead()
  useReceivePresenceUpdate()
  return null
}

const ReceivedMessage = (props: Props) => {
  const session = useSession()
  if (!session.isAuthenticated) return null
  return <Init />
}

export default ReceivedMessage
