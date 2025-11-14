import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { notifications } from "@mantine/notifications"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import dayjs from "dayjs"
import { ErrorResponse } from "@/@types/error"
import { useAuthModal } from "@/hooks/use-auth-modal"
import { useRouter } from "@/lib/i18n/navigation"
import { useSession } from "@/lib/session-store"
import { getIsPrivate } from "@/utils/get-is-private"
import { useUnitData } from "../context/unit-context"
import { createBooking } from "../create-booking"
import { useQueryDates } from "./use-query-dates"

const useCreateBookingMutation = () => {
  const { isAuthenticated, session } = useSession()
  const t = useTranslations()
  const unit = useUnitData()
  const auth = useAuthModal()

  const [{ from, to }] = useQueryDates()
  const params = useParams() as { slug: string }
  const isPrivate = getIsPrivate(params.slug)
  // handle create booking
  const Router = useRouter()
  const createBookingMutation = useMutation({
    mutationFn: createBooking,

    onError(error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        notifications.show({
          title: t("generla.failer"),
          message:
            (error.response.data as ErrorResponse).message || error.message,
          color: "red",
        })
      }
    },
    onSuccess(data) {
      Router.push({
        pathname: `/units/${unit.id}/${data}`,
        query: {
          ...(isPrivate ? { private: true } : {}),
          ...(session?.user.nafath_validated ? {} : { nafath: true }),
        },
      })
    },
  })
  const handleCreateBooking = () => {
    if (!isAuthenticated) {
      return auth[1].onOpen()
    }
    createBookingMutation.mutate({
      from: dayjs(from).format("YYYY-MM-DD"),
      to: dayjs(to).format("YYYY-MM-DD"),
      unitId: unit.id,
      private: isPrivate ? "1" : undefined,
    })
  }

  return {
    handleCreateBooking,
    ...createBookingMutation,
  }
}

export default useCreateBookingMutation
