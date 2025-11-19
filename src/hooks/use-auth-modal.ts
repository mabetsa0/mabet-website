import { parseAsBoolean, useQueryState } from "nuqs"

export const useAuthModal = () => {
  const [state, setShowLogin] = useQueryState(
    "auth-modal",
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
