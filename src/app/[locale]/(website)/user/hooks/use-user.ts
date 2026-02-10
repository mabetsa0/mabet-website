"use client"
import { useQuery } from "@tanstack/react-query"
import { UserData, UserResponse } from "@/@types/user"
import Mabet from "@/services"
import { useSession } from "@/stores/session-store"

const useUser = (initialData?: UserResponse["data"]["user"]) => {
  const session = useSession()
  const { data: user, ...useQueryReturn } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await Mabet.get<UserResponse>(`/account/me`)
      return response.data.data.user
    },
    initialData: (initialData || session.session?.user) as UserData,
    staleTime: Infinity,
  })

  return {
    user: user || {},
    ...useQueryReturn,
  }
}

export default useUser
