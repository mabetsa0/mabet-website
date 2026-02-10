// src/stores/user-store.ts
import { createStore } from "zustand/vanilla"

export type UserType = "user" | "guest"

export type UserState = {
  user: {
    id: string
    name: string
    type: UserType
  } | null
}

export type UserActions = {
  setUser: (user: UserState["user"]) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  user: null,
}

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user: UserState["user"]) => set({ user }),
  }))
}
