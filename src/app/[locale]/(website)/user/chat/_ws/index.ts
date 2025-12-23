import { v4 as uuidv4 } from "uuid"
import { getChatSessionStore } from "../_stores/session-store-provider"
import { getUserStore } from "../_stores/user-store-provider"
import {
  WSOnEvents,
  WSSendEvents,
  WSSendEventPayloadByEvent,
  WS_SEND_EVENTS,
  WS_ON_EVENTS,
  WSOnEventContentByEvent,
} from "./events"
import { emitEvent, onEvent } from "./events-handler"

const wsUrl = "wss://chat-experimental.mabet-app.com/api/v1/ws?lang=ar"

// Singleton WebSocket instance with auto‑reconnect
let socket: WebSocket | null = null
let reconnectAttempts = 0
let reconnectTimer: number | null = null
let manuallyClosed = false
let lastAuthEventId: string | null = null

const MAX_RECONNECT_DELAY = 30_000 // 30s cap

function getReconnectDelay() {
  // Exponential backoff: 1s, 2s, 4s, ... up to MAX_RECONNECT_DELAY
  const base = 1_000
  const delay = base * 2 ** reconnectAttempts
  return Math.min(delay, MAX_RECONNECT_DELAY)
}

function scheduleReconnect() {
  if (manuallyClosed) return

  if (reconnectTimer) {
    window.clearTimeout(reconnectTimer)
    reconnectTimer = null
  }

  const delay = getReconnectDelay()
  reconnectAttempts += 1

  console.log(
    `[WS] scheduling reconnect in ${delay}ms (attempt ${reconnectAttempts})`
  )

  reconnectTimer = window.setTimeout(() => {
    reconnectTimer = null
    createWebSocket()
  }, delay)
}

function handleAuthenticated(
  data: WSOnEventContentByEvent[typeof WS_ON_EVENTS.AUTHENTICATED],
  id: string
) {
  // Only handle authentication response if it matches our last auth request
  if (id !== lastAuthEventId) {
    return
  }

  const userStore = getUserStore()
  if (!userStore) {
    console.warn("[WS] User store not initialized, cannot set user data")
    return
  }

  console.log("[WS] Authentication successful, setting user data")
  userStore.getState().setUser({
    id: data.user_id.toString(),
    name: data.user_name,
    type: data.user_type as "user" | "guest",
  })
}

// Register the authenticated event handler once
let authenticatedHandlerRegistered = false
function registerAuthenticatedHandler() {
  if (authenticatedHandlerRegistered) return
  authenticatedHandlerRegistered = true
  onEvent(WS_ON_EVENTS.AUTHENTICATED, handleAuthenticated)
}

function authenticateWebSocket() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    return
  }

  const store = getChatSessionStore()
  if (!store) {
    console.warn("[WS] Session store not initialized, skipping authentication")
    return
  }

  const accessToken = store.getState().accessToken
  if (!accessToken) {
    console.warn("[WS] No access token available, skipping authentication")
    return
  }

  // Register the handler if not already registered
  registerAuthenticatedHandler()

  const authId = uuidv4()
  lastAuthEventId = authId
  console.log("[WS] Authenticating with token...")

  wsSendEvent(
    WS_SEND_EVENTS.AUTHENTICATE,
    {
      token: accessToken,
      first_conversations_page_size: 0,
    },
    authId
  )
}

function createWebSocket() {
  manuallyClosed = false

  socket = new WebSocket(wsUrl)

  socket.onopen = () => {
    console.log("[WS] connected")
    reconnectAttempts = 0
    // Authenticate after connection or reconnection
    authenticateWebSocket()
  }

  socket.onclose = (event) => {
    console.log("[WS] closed", event.code, event.reason)
    socket = null
    if (!manuallyClosed) {
      scheduleReconnect()
    }
  }

  socket.onerror = (err) => {
    console.error("[WS] error", err)
    // Let onclose handle the reconnect logic
  }

  socket.onmessage = (msg) => {
    try {
      const { type, contents, id } = JSON.parse(msg.data) as {
        type: WSOnEvents
        contents: unknown
        id: string
      }
      emitEvent(type, contents, id) // ⬅ central routing
    } catch (e) {
      console.error("Invalid WS message:", msg.data)
    }
  }

  return socket
}

export function getOrInitWebSocket() {
  if (typeof window === "undefined") return null

  // If an open/connecting socket already exists, reuse it
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return socket
  }
  return createWebSocket()
}

export function closeSocket() {
  manuallyClosed = true

  if (reconnectTimer) {
    window.clearTimeout(reconnectTimer)
    reconnectTimer = null
  }

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close()
  }

  socket = null
}

export function wsSendEvent<T extends WSSendEvents>(
  event: T,
  payload: WSSendEventPayloadByEvent[T],
  id: string
) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return null
  socket.send(JSON.stringify({ type: event, contents: payload, id }))
  return id
}
