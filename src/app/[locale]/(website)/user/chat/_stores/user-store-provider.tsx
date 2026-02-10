// src/providers/user-store-provider.tsx
"use client"

import { type ReactNode, createContext, useRef, useContext } from "react"
import { useStore } from "zustand"
import { type UserStore, createUserStore } from "../_stores/user-store"

export type UserStoreApi = ReturnType<typeof createUserStore>

// Store instance that can be accessed outside React
let storeInstance: UserStoreApi | null = null

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
)
export interface UserStoreProviderProps {
  children: ReactNode
  user: UserStore["user"]
}

export const UserStoreProvider = ({
  children,
  user,
}: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createUserStore({ user })
    // Store the instance globally so it can be accessed outside React
    storeInstance = storeRef.current
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  )
}

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext)

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`)
  }

  return useStore(userStoreContext, selector)
}

/**
 * Get the user store instance for use outside React components.
 * Returns null if the store hasn't been initialized yet.
 *
 * @example
 * ```ts
 * // In a utility function
 * const store = getUserStore()
 * if (store) {
 *   const user = store.getState().user
 *   store.getState().setUser({ id: '1', name: 'John', type: 'user' })
 * }
 * ```
 */
export const getUserStore = (): UserStoreApi | null => {
  return storeInstance
}
