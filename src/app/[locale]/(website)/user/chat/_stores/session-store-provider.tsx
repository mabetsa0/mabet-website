// src/providers/counter-store-provider.tsx
"use client"

import { type ReactNode, createContext, useRef, useContext } from "react"
import { useStore } from "zustand"
import { type SessionStore, createSessionStore } from "../_stores/session-store"

export type SessionStoreApi = ReturnType<typeof createSessionStore>

// Store instance that can be accessed outside React
let storeInstance: SessionStoreApi | null = null

export const SessionStoreContext = createContext<SessionStoreApi | undefined>(
  undefined
)
export interface SessionStoreProviderProps {
  children: ReactNode
  accessToken: string | null
}

export const SessionStoreProvider = ({
  children,
  accessToken,
}: SessionStoreProviderProps) => {
  const storeRef = useRef<SessionStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createSessionStore({ accessToken })
    // Store the instance globally so it can be accessed outside React
    storeInstance = storeRef.current
  }

  return (
    <SessionStoreContext.Provider value={storeRef.current}>
      {children}
    </SessionStoreContext.Provider>
  )
}

export const useSessionStore = <T,>(
  selector: (store: SessionStore) => T
): T => {
  const sessionStoreContext = useContext(SessionStoreContext)

  if (!sessionStoreContext) {
    throw new Error(`useSessionStore must be used within SessionStoreProvider`)
  }

  return useStore(sessionStoreContext, selector)
}

/**
 * Get the session store instance for use outside React components.
 * Returns null if the store hasn't been initialized yet.
 *
 * @example
 * ```ts
 * // In a utility function
 * const store = getChatSessionStore()
 * if (store) {
 *   const accessToken = store.getState().accessToken
 *   store.setState({ accessToken: 'new-token' })
 * }
 * ```
 */
export const getChatSessionStore = (): SessionStoreApi | null => {
  return storeInstance
}
