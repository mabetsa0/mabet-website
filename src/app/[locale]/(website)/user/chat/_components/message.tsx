import dayjs from "dayjs"
import { AlertTriangle, Check, CheckCheck, Loader2 } from "lucide-react"
import { cn } from "@/lib/cn"
import { useChatData } from "../_contexts/chat-context"
import { useChatsListStore } from "../_stores/chats-list-store-provider"
import { useUserStore } from "../_stores/user-store-provider"
import { Message as MessageType } from "../_types/chat-response"
import { Conversation } from "../_types/chats-response"

type MessageProps = MessageType & {
  errorMessage?: string
  isLoading?: boolean
  className?: string
}

type MessageVariant = "admin" | "user" | "other" | "error"
type MessageDeliveryStatus = "none" | "sent" | "read"

// Constants
const MESSAGE_BASE_STYLES = "rounded-md px-[12px] py-[8px] transition-colors"
const TIME_FORMAT = "hh:mm A"

// Helper functions
const getMessageVariant = (
  senderType: string,
  senderId: number,
  userId: string | undefined,
  hasError: boolean
): MessageVariant => {
  if (hasError) return "error"
  if (senderType === "admin") return "admin"
  if (userId === senderId.toString()) return "user"
  return "other"
}

const getAlignmentClass = (variant: MessageVariant): string => {
  switch (variant) {
    case "admin":
      return "justify-center"
    case "user":
      return "justify-start"
    case "other":
    case "error":
      return "justify-end"
  }
}

const getMessageStyles = (variant: MessageVariant): string => {
  switch (variant) {
    case "error":
      return cn(
        MESSAGE_BASE_STYLES,
        "bg-red-500 text-white border-2 border-red-600"
      )
    case "admin":
      return cn(
        MESSAGE_BASE_STYLES,
        "text-primary border-2 border-primary rounded-md"
      )
    case "user":
      return cn(
        MESSAGE_BASE_STYLES,
        "bg-[#F6F4F8] text-black",
        "rounded-t-md rounded-e-md rtl:rounded-br-none ltr:rounded-bl-none"
      )
    case "other":
      return cn(
        MESSAGE_BASE_STYLES,
        "bg-primary text-white",
        "rounded-tr-md ltr:rounded-br-none rtl:rounded-bl-none rounded-bl-md rounded-br-md"
      )
  }
}

const getContentStyles = (variant: MessageVariant): string => {
  switch (variant) {
    case "error":
      return "text-white"
    case "admin":
      return "text-primary font-semibold"
    case "user":
      return "text-primary-foreground"
    case "other":
      return "text-foreground"
  }
}

// Sub-components
const MessageTime = ({ timestamp }: { timestamp: Date }) => (
  <span className="text-[10px]">{dayjs(timestamp).format(TIME_FORMAT)}</span>
)

const MessageStatusIcon = ({ status }: { status: MessageDeliveryStatus }) => {
  if (status === "sent") {
    return <Check className="ml-1 size-1 text-gray-400" />
  }
  if (status === "read") {
    return <CheckCheck className="ml-1 size-1 text-[#0e9fff]" />
  }
  return null
}

const MessageContent = ({
  content,
  variant,
}: {
  content: string
  variant: MessageVariant
}) => <p className={cn(getContentStyles(variant), "text-sm")}>{content}</p>

const MessageStatus = ({
  isLoading,
  hasError,
}: {
  isLoading: boolean
  hasError: boolean
}) => {
  if (isLoading) {
    return <Loader2 className="size-1 animate-spin" />
  }
  if (hasError) {
    return <AlertTriangle className="size-5" />
  }
  return null
}

const Message = ({
  id,
  sender_id,
  sender_type,
  conversation_uuid,
  content,
  created_at,
  errorMessage,
  isLoading,
  className,
}: MessageProps) => {
  const user = useUserStore((s) => s.user)
  const chatData = useChatData()
  const conversationFromStore = useChatsListStore<Conversation | undefined>(
    (state) =>
      state.conversations.find(
        (c: Conversation) => c.uuid === conversation_uuid
      )
  )
  const variant = getMessageVariant(
    sender_type,
    sender_id,
    user?.id,
    !!errorMessage
  )
  const isAdmin = variant === "admin"
  const isOwnMessage =
    !!user && sender_id === Number(user.id) && sender_type === user.type

  let deliveryStatus: MessageDeliveryStatus = "none"

  // WhatsApp-like ticks only for the current user's non-admin messages
  if (isOwnMessage && !isAdmin && !errorMessage && !isLoading) {
    const currentUserIdNum = Number(user.id)
    const currentUserType = user.type

    const effectiveConversation = conversationFromStore ?? chatData

    const othersReadPositions =
      effectiveConversation.read_positions?.filter(
        (pos) =>
          !(
            pos.user_id === currentUserIdNum &&
            pos.user_type === currentUserType
          )
      ) ?? []

    const messageTimestamp = created_at
      ? new Date(created_at).getTime()
      : Number.NaN

    const hasBeenReadBySomeoneElse = othersReadPositions.some((pos) => {
      const readTs = new Date(pos.timestamp).getTime()
      if (Number.isNaN(readTs) || Number.isNaN(messageTimestamp)) return false
      return readTs >= messageTimestamp
    })

    // Two blue ticks if at least one other participant has a read timestamp
    // that is at or after this message; otherwise single gray tick.
    deliveryStatus = hasBeenReadBySomeoneElse ? "read" : "sent"
  }

  return (
    <div
      className={cn(
        "my-0.5 flex px-1 select-none",
        getAlignmentClass(variant),
        className
      )}
    >
      <div className={getMessageStyles(variant)}>
        <div
          className={cn("flex flex-col gap-[4px]", isAdmin && "items-center")}
        >
          <MessageContent content={content} variant={variant} />
          <div className="flex items-center justify-end gap-1">
            {isOwnMessage && !isAdmin && !isLoading && !errorMessage ? (
              <MessageStatusIcon status={deliveryStatus} />
            ) : null}
            <MessageTime timestamp={created_at} />
            {isOwnMessage && !isAdmin ? (
              <MessageStatus
                isLoading={!!isLoading}
                hasError={!!errorMessage}
              />
            ) : null}
          </div>
        </div>

        {errorMessage && (
          <span className="mt-1 block text-[10px] text-red-200">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  )
}

export default Message
