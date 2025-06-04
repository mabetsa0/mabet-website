import { parseAsBoolean, useQueryState } from "nuqs"

export const useUserDataModal = () => {
  const [state, setShowLogin] = useQueryState(
    "auth-user-data-modal",
    parseAsBoolean.withDefault(false)
  )

  const onClose = () => {
    setShowLogin(false)
  }
  const onOpen = () => {
    setShowLogin(true)
  }

  return [state, { onClose, onOpen }] as const
}
