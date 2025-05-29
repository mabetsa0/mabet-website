import { UserResponse } from "@/types/user-response"

import Mabeet from ".."

export const getMe = async () => {
  return await Mabeet.get<UserResponse>("/account/me")
}
