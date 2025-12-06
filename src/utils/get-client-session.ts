import { useSession } from "@/stores/session-store"

export const getClientSession = () => {
  if (typeof window === "undefined") return null
  const user = useSession.getState().session
  return user
}
