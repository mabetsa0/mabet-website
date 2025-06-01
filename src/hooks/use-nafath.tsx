import { parseAsBoolean, useQueryState } from "nuqs"

export const useNafath = () => {
  const [state, setShowLogin] = useQueryState(
    "nafath",
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
