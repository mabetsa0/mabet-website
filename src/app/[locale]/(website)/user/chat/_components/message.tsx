import dayjs from "dayjs"
import { AlertTriangle, Loader2 } from "lucide-react"
import { cn } from "@/lib/cn"
import { useUserStore } from "../_stores/user-store-provider"
import { Message as MessageType } from "../_types/chat-response"

type MessageProps = MessageType & {
  errorMessage?: string
  isLoading?: boolean
  className?: string
}

type MessageVariant = "admin" | "user" | "other" | "error"

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
  sender_id,
  sender_type,
  content,
  created_at,
  errorMessage,
  isLoading,
  className,
}: MessageProps) => {
  const user = useUserStore((s) => s.user)
  const variant = getMessageVariant(
    sender_type,
    sender_id,
    user?.id,
    !!errorMessage
  )
  const isAdmin = variant === "admin"

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
          <MessageTime timestamp={created_at} />
          <MessageStatus isLoading={!!isLoading} hasError={!!errorMessage} />
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
