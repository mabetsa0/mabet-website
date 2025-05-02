/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react"
import { notifications } from "@mantine/notifications"
import Mabet from "@/services"
import { parseAsBoolean, useQueryState } from "nuqs"
import { isAuthenticated } from "@/utils/is-authenticated"
import { useMutation } from "@tanstack/react-query"
import { useTranslations } from "next-intl"

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setShowLogin] = useQueryState(
    "login",
    parseAsBoolean.withDefault(false)
  )

  const [isFavorite, setIsFavorite] = useState(!!is_favourite)

  const mutation = useMutation({
    async mutationFn({ is_favourite }: { is_favourite: boolean }) {
      if (isFavorite) {
        return removeFromFavorite(id)
      } else return addToFavorite(id)
    },

    onMutate() {
      if (!isAuthenticated()) {
        setShowLogin(true)
        return
      }
    },
    onSuccess(data, vars) {
      if (vars.is_favourite) {
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
    if (!isAuthenticated()) {
      return
    }
    mutation.mutate({ is_favourite: isFavorite })
  }
  return { isFavorite, ...mutation, mutate }
}

export default useFavorite
