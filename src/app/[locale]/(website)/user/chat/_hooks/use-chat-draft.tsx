"use client"

import { useEffect, useState, useCallback } from "react"

const STORAGE_KEY_PREFIX = "chat_draft_"

/**
 * Hook to manage chat input drafts per conversation UUID.
 * Drafts are persisted in localStorage and automatically restored when switching chats.
 */
export const useChatDraft = (chatUuid: string | undefined) => {
    const [draft, setDraftState] = useState<string>("")

    // Load draft from localStorage when chat UUID changes
    useEffect(() => {
        if (!chatUuid) {
            setDraftState("")
            return
        }

        const storageKey = `${STORAGE_KEY_PREFIX}${chatUuid}`
        try {
            const savedDraft = localStorage.getItem(storageKey)
            if (savedDraft) {
                setDraftState(savedDraft)
            } else {
                setDraftState("")
            }
        } catch (error) {
            console.error("Failed to load chat draft:", error)
            setDraftState("")
        }
    }, [chatUuid])

    // Update draft in state and localStorage
    const setDraft = useCallback(
        (value: string) => {
            setDraftState(value)

            if (!chatUuid) return

            const storageKey = `${STORAGE_KEY_PREFIX}${chatUuid}`
            try {
                if (value.trim()) {
                    localStorage.setItem(storageKey, value)
                } else {
                    // Remove empty drafts to keep localStorage clean
                    localStorage.removeItem(storageKey)
                }
            } catch (error) {
                console.error("Failed to save chat draft:", error)
            }
        },
        [chatUuid]
    )

    // Clear draft for current chat
    const clearDraft = useCallback(() => {
        setDraftState("")

        if (!chatUuid) return

        const storageKey = `${STORAGE_KEY_PREFIX}${chatUuid}`
        try {
            localStorage.removeItem(storageKey)
        } catch (error) {
            console.error("Failed to clear chat draft:", error)
        }
    }, [chatUuid])

    return {
        draft,
        setDraft,
        clearDraft,
    }
}

