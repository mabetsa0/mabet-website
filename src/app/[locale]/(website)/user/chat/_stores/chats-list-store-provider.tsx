"use client"

import { type ReactNode, createContext, useContext, useRef } from "react"
import { useStore } from "zustand"
import { useShallow } from "zustand/react/shallow"
import {
  type ChatsListStore,
  type ChatsListState,
  createChatsListStore,
} from "../_stores/chats-list-store"

export type ChatsListStoreApi = ReturnType<typeof createChatsListStore>

// Store instance that can be accessed outside React
let storeInstance: ChatsListStoreApi | null = null

export const ChatsListStoreContext = createContext<
  ChatsListStoreApi | undefined
>(undefined)

export interface ChatsListStoreProviderProps {
  children: ReactNode
  /**
   * Optional initial state for the chats list.
   * If omitted, the default initial state is used.
   */
  initialState?: Partial<ChatsListState>
}

export const ChatsListStoreProvider = ({
  children,
  initialState,
}: ChatsListStoreProviderProps) => {
  const storeRef = useRef<ChatsListStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createChatsListStore(initialState)
    // Store the instance globally so it can be accessed outside React
    storeInstance = storeRef.current
  }

  return (
    <ChatsListStoreContext.Provider value={storeRef.current}>
      {children}
    </ChatsListStoreContext.Provider>
  )
}

export const useChatsListStore = <T,>(
  selector: (store: ChatsListStore) => T
): T => {
  const chatsListStoreContext = useContext(ChatsListStoreContext)

  if (!chatsListStoreContext) {
    throw new Error(
      `useChatsListStore must be used within ChatsListStoreProvider`
    )
  }

  return useStore(chatsListStoreContext, useShallow(selector))
}

/**
 * Get the chats list store instance for use outside React components.
 * Returns null if the store hasn't been initialized yet.
 */
export const getChatsListStore = (): ChatsListStoreApi | null => {
  return storeInstance
}
