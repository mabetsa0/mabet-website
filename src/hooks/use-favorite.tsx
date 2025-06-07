/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSession } from "@/lib/session-store"
import Mabet from "@/services"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useAuthModal } from "./use-auth-modal"

const addToFavorite = async (id: number) => {
  const response = await Mabet.post("/favourite/add/" + id, {})
  return response
}
const removeFromFavorite = async (id: number) => {
  const response = await Mabet.delete("/favourite/remove/" + id)
  return response
}

type Props = {
  is_favourite: null | boolean
  id: number
}

const useFavorite = ({ is_favourite, id }: Props) => {
  const t = useTranslations("general.favorite")
  const { isAuthenticated } = useSession()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, { onOpen }] = useAuthModal()

  const [isFavorite, setIsFavorite] = useState(!!is_favourite)

  const mutation = useMutation({
    async mutationFn({ is_favourite }: { is_favourite: boolean }) {
      if (isFavorite) {
        return removeFromFavorite(id)
      } else return addToFavorite(id)
    },

    onSuccess(data, vars) {
      if (!vars.is_favourite) {
        notifications.show({
          color: "green",
          title: t("success"),
          message: t("added-to-favorite"),
        })
      } else
        notifications.show({
          color: "green",
          title: t("success"),
          message: t("removed-from-favorite"),
        })
      setIsFavorite((pre) => !pre)
    },
    onError(error, vars) {
      if (vars.is_favourite) {
        notifications.show({
          color: "red",
          title: t("failer"),
          message: t("error-remove-unit"),
        })
      } else
        notifications.show({
          color: "red",
          title: t("failer"),
          message: t("error-add-unit"),
        })
    },
  })

  const mutate = () => {
    if (!isAuthenticated) {
      onOpen()
      return
    }
    mutation.mutate({ is_favourite: isFavorite })
  }
  return { isFavorite, ...mutation, mutate }
}

export default useFavorite
