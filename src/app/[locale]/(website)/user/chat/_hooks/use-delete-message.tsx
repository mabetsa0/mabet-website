import { useParams } from "next/navigation"
import { notifications } from "@mantine/notifications"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMessage } from "../_services/delete-message"
import { useSessionStore } from "../_stores/session-store-provider"

export const useDeleteMessage = () => {
  const token = useSessionStore((s) => s.accessToken)
  const queryClient = useQueryClient()
  const { uuid } = useParams()
  const mutation = useMutation({
    mutationFn: ({ id }: { id: string | number }) => {
      return deleteMessage({ messageId: id, token: token! })
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", uuid],
      })
      notifications.show({
        title: "تم حذف الرسالة",
        message: "تم حذف الرسالة بنجاح",
        color: "green",
      })
    },
    onError() {
      notifications.show({
        title: "لم يتم حذف الرسالة",
        message: "لم يتم حذف الرسالة بنجاح",
        color: "red",
      })
    },
  })

  return mutation
}
