import { LOCALSTORAGE_SESSION_KEY } from "@/config"
import { z } from "zod"

const UserSchema = z.object({
  access_token: z.string().min(1),
  id: z.coerce.string(),
})
export const getSession = () => {
  if (typeof window === "undefined") return null
  const rawUser = localStorage?.getItem(LOCALSTORAGE_SESSION_KEY)
  if (!rawUser) return null
  const parsedUser = JSON.parse(rawUser)
  const user = UserSchema.safeParse(parsedUser)
  return user.success ? user.data : null
}
