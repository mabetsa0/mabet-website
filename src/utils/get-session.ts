import { useSession } from "@/lib/session-store"

export const getSession = () => {
  if (typeof window === "undefined") return null
  const user = useSession.getState().session
  return user
}
