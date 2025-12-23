import { Message } from "../_types/chat-response"
import { Conversation } from "../_types/chats-response"

// Send events
export const WS_SEND_EVENTS = {
  AUTHENTICATE: "authenticate",
  TYPING_START: "typing_start",
  SEND_MESSAGE: "send_message",
  READ_MESSAGE: "read_messages",
  GET_CONVERSATIONS_PAGE: "get_conversations_page",
} as const

export type WS_SEND_EVENTS_PAYLOADS = {
  AUTHENTICATE: {
    token: string
    first_conversations_page_size: number
  }
  SEND_MESSAGE: {
    conversation_uuid: string
    type: "text"
    content: string
  }
  READ_MESSAGE: {
    conversation_uuid: string
    message_id: string
  }
  GET_CONVERSATIONS_PAGE: {
    oldest_conversation_uuid?: string | null
    conversations_page_size: number
  }
  TYPING_START: string
  TYPING_STOP: string
}

export type WS_SEND_EVENTS_KEYS = keyof typeof WS_SEND_EVENTS
export type WSSendEvents = (typeof WS_SEND_EVENTS)[WS_SEND_EVENTS_KEYS]
export type WSSendEventsPayloads =
  WS_SEND_EVENTS_PAYLOADS[keyof WS_SEND_EVENTS_PAYLOADS]

// Map event *names* (the runtime string values) to their payloads
type WS_SendEventNameToKey = {
  [K in keyof typeof WS_SEND_EVENTS as (typeof WS_SEND_EVENTS)[K]]: K
}

export type WSSendEventPayloadByEvent = {
  [E in WSSendEvents]: WS_SEND_EVENTS_PAYLOADS[WS_SendEventNameToKey[E]]
}

// On events
export const WS_ON_EVENTS = {
  AUTHENTICATED: "authenticated",
  ERROR: "error",
  MESSAGE_SENT: "message_sent",
  MESSAGE_READ: "message_read",
  MESSAGE_RECEIVED: "message_received",
  TYPING_UPDATE: "typing_update",
  PRESENCE_UPDATE: "presence_update",
  UNREAD_CONVERSATIONS_COUNT_UPDATE: "unread_conversations_count_update",
  UNREAD_MESSAGES_COUNT_UPDATE: "unread_messages_count_update",
  MESSAGE_DELETED: "message_deleted",
  CONVERSATIONS_PAGE: "conversations_page",
} as const

// content of the on events
export type WS_ON_EVENTS_CONTENT = {
  AUTHENTICATED: {
    user_id: number
    user_type: string
    user_name: string
    unread_conversations_count: number
    first_conversations_page: Conversation[]
  }
  ERROR: {
    code: string
    message: string
  }
  MESSAGE_SENT: Message
  MESSAGE_READ: {
    conversation_uuid: string
    user_id: number
    user_type: string
    user_name: string
    message_id: string
    timestamp: string
  }
  MESSAGE_RECEIVED: Message
  TYPING_UPDATE: {
    conversation_uuid: string
    user_id: number
    user_type: string
    user_name: string
    is_typing: boolean
  }
  typing_started: {}
  PRESENCE_UPDATE: {
    user_id: number
    user_type: string
    user_name: string
    is_online: boolean
  }
  UNREAD_CONVERSATIONS_COUNT_UPDATE: {
    count: number
  }
  UNREAD_MESSAGES_COUNT_UPDATE: {
    count: 7
  }
  MESSAGE_DELETED: {
    conversation_uuid: string
    message_id: string
  }
  CONVERSATIONS_PAGE: {
    conversations_page: Conversation[]
    has_more: boolean
  }
}

// keys of the on events
export type WS_ON_KEYS = keyof typeof WS_ON_EVENTS

// actual name of the on events (the runtime string values)
export type WSOnEvents = (typeof WS_ON_EVENTS)[WS_ON_KEYS]
export type WSOnEventsContent = WS_ON_EVENTS_CONTENT[keyof WS_ON_EVENTS_CONTENT]
// Map event *names* (the runtime string values) to their payloads
type WS_OnEventNameToKey = {
  [K in keyof typeof WS_ON_EVENTS as (typeof WS_ON_EVENTS)[K]]: K
}

export type WSOnEventContentByEvent = {
  [T in WSOnEvents]: WS_ON_EVENTS_CONTENT[WS_OnEventNameToKey[T]]
}
