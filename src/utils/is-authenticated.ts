import { getSession } from "./get-session"

export const isAuthenticated = () => {
  const session = getSession()
  return session?.access_token ? true : false
}
