"use client"

import { useEffect, useState } from "react"
import { ActionIcon, Badge, Popover } from "@mantine/core"
import { Wifi, WifiOff } from "lucide-react"
import { closeSocket, getConnectionStatus, openSocket } from "../_ws"

type ConnectionStatus = "connecting" | "open" | "closed" | "disconnected"

export function WsConnectionButton() {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected")
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    // Update status on mount
    setStatus(getConnectionStatus())

    // Poll for status changes
    const interval = setInterval(() => {
      setStatus(getConnectionStatus())
    }, 500) // Check every 500ms

    return () => clearInterval(interval)
  }, [])

  const handleToggle = () => {
    if (status === "open" || status === "connecting") {
      closeSocket()
      setStatus("disconnected")
    } else {
      openSocket()
      setStatus("connecting")
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "open":
        return "green"
      case "connecting":
        return "yellow"
      case "closed":
        return "orange"
      case "disconnected":
        return "red"
      default:
        return "gray"
    }
  }

  const getStatusLabel = () => {
    switch (status) {
      case "open":
        return "Connected"
      case "connecting":
        return "Connecting..."
      case "closed":
        return "Closed"
      case "disconnected":
        return "Disconnected"
      default:
        return "Unknown"
    }
  }

  const getIcon = () => {
    if (status === "open") {
      return <Wifi size={18} />
    }
    return <WifiOff size={18} />
  }

  return (
    <div className="fixed right-4 bottom-2 z-50 sm:bottom-4">
      <Popover
        opened={opened}
        onChange={setOpened}
        position="left"
        withArrow
        shadow="md"
      >
        <Popover.Target>
          <ActionIcon
            variant="light"
            color={status === "open" ? "green" : "red"}
            onClick={() => setOpened((o) => !o)}
            size="md"
          >
            {getIcon()}
          </ActionIcon>
        </Popover.Target>

        <Popover.Dropdown>
          <div className="flex flex-col gap-1 p-0.5">
            <div className="flex items-center gap-0.5">
              <Badge color={getStatusColor()} size="sm" variant="light">
                {getStatusLabel()}
              </Badge>
            </div>
            <ActionIcon
              variant="light"
              color={status === "open" ? "red" : "green"}
              onClick={handleToggle}
              size="lg"
              title={status === "open" ? "Disconnect" : "Connect"}
            >
              {getIcon()}
            </ActionIcon>
          </div>
        </Popover.Dropdown>
      </Popover>
    </div>
  )
}
