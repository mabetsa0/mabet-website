import { createStore } from "zustand/vanilla"
import { type Conversation } from "../_types/chats-response"

export type ChatsListState = {
  conversations: Conversation[]
  isLoading: boolean
  isFetchingNextPage: boolean
  hasMore: boolean
  error: string | null
}

export type ChatsListActions = {
  setConversations: (conversations: Conversation[]) => void
  appendConversations: (conversations: Conversation[]) => void
  setIsLoading: (isLoading: boolean) => void
  setIsFetchingNextPage: (isFetchingNextPage: boolean) => void
  setHasMore: (hasMore: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
  /**
   * Replace an existing conversation (matched by uuid) with a new one.
   * If the conversation does not exist, it will be appended.
   */
  upsertConversation: (conversation: Conversation) => void
}

export type ChatsListStore = ChatsListState & ChatsListActions

export const defaultInitState: ChatsListState = {
  conversations: [],
  isLoading: true,
  isFetchingNextPage: false,
  hasMore: true,
  error: null,
}

export const createChatsListStore = (
  initState: Partial<ChatsListState> = {}
) => {
  return createStore<ChatsListStore>()((set) => ({
    ...defaultInitState,
    ...initState,
    setConversations: (conversations: Conversation[]) => set({ conversations }),
    appendConversations: (conversations: Conversation[]) =>
      set((state) => ({
        conversations: [...state.conversations, ...conversations],
      })),
    setIsLoading: (isLoading: boolean) => set({ isLoading }),
    setIsFetchingNextPage: (isFetchingNextPage: boolean) =>
      set({ isFetchingNextPage }),
    setHasMore: (hasMore: boolean) => set({ hasMore }),
    setError: (error: string | null) => set({ error }),
    reset: () => set(() => ({ ...defaultInitState })),
    upsertConversation: (conversation: Conversation) =>
      set((state) => {
        const exists = state.conversations.some(
          (c) => c.uuid === conversation.uuid
        )

        // Always move the updated conversation to the top of the list
        const remaining = state.conversations.filter(
          (c) => c.uuid !== conversation.uuid
        )

        return {
          conversations: [conversation, ...remaining],
        }
      }),
  }))
}
