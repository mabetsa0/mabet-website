"use client"

import { useChatsListStore } from "../_stores/chats-list-store-provider"
import { type Conversation } from "../_types/chats-response"
import { WS_ON_EVENTS } from "../_ws/events"
import { type WsEventHandler } from "../_ws/events-handler"
import { useWsEvent } from "./use-ws-event"

export const useReceivePresenceUpdate = () => {
  const { conversations, updateConversationInPlace } = useChatsListStore(
    (state) => state
  )

  const handlePresenceUpdate: WsEventHandler<
    typeof WS_ON_EVENTS.PRESENCE_UPDATE
  > = (data) => {
    const { user_id, user_type, user_name, is_online } = data

    // Update only conversations where this user is actually a participant
    conversations.forEach((conversation) => {
      // Check if user is a participant in this conversation
      const isInitiator =
        conversation.initiator_id === user_id &&
        conversation.initiator_type === user_type

      const isInReadPositions = conversation.read_positions.some(
        (readPosition) =>
          readPosition.user_id === user_id &&
          readPosition.user_type === user_type
      )

      const isInLastMessage =
        conversation.last_message?.sender_id === user_id &&
        conversation.last_message?.sender_type === user_type

      const participantIndex = conversation.online_participants.findIndex(
        (participant) =>
          participant.id === user_id && participant.type === user_type
      )

      const hasParticipant = participantIndex !== -1

      // Only process if user is actually a participant in this conversation
      const isParticipant =
        isInitiator || isInReadPositions || isInLastMessage || hasParticipant

      if (!isParticipant) {
        return
      }

      // Skip if user is offline and not in the list (no update needed)
      if (!is_online && !hasParticipant) {
        return
      }

      let updatedConversation: Conversation | null = null

      if (is_online && !hasParticipant) {
        // User is online and not in the list, add them
        updatedConversation = {
          ...conversation,
          online_participants: [
            ...conversation.online_participants,
            {
              id: user_id,
              type: user_type,
              name: user_name,
            },
          ],
        }
      } else if (!is_online && hasParticipant) {
        // User is offline and in the list, remove them
        updatedConversation = {
          ...conversation,
          online_participants: conversation.online_participants.filter(
            (participant) =>
              !(participant.id === user_id && participant.type === user_type)
          ),
        }
      } else if (is_online && hasParticipant) {
        // User is online and already in the list, update their name if it changed
        const currentParticipant =
          conversation.online_participants[participantIndex]
        if (currentParticipant.name !== user_name) {
          updatedConversation = {
            ...conversation,
            online_participants: conversation.online_participants.map(
              (participant) =>
                participant.id === user_id && participant.type === user_type
                  ? { ...participant, name: user_name }
                  : participant
            ),
          }
        }
      }

      if (updatedConversation) {
        updateConversationInPlace(updatedConversation)
      }
    })
  }

  useWsEvent(WS_ON_EVENTS.PRESENCE_UPDATE, handlePresenceUpdate)
}
