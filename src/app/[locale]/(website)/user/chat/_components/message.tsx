import { Loader2 } from "lucide-react"
import { cn } from "@/lib/cn"
import { useDeleteMessage } from "../_hooks/use-delete-message"
import { useUserStore } from "../_stores/user-store-provider"
import { Message as MessageType } from "../_types/chat-response"

type MessageProps = MessageType & {
  errorMessage?: string
  isLoading?: boolean
  className?: string
}

const Message = ({
  id,
  sender_id,
  sender_type,
  sender_name,
  conversation_uuid,
  content,
  created_at,
  errorMessage,
  isLoading,
  className,
}: MessageProps) => {
  const user = useUserStore((s) => s.user)
  const { mutate: deleteMessage, isPending } = useDeleteMessage()

  // Determine message type
  const isAdminMessage = sender_type === "admin"
  const isUserMessage = user?.id === sender_id.toString()
  const isOtherMessage = !isUserMessage && !isAdminMessage

  // Determine alignment based on message type
  const getAlignment = () => {
    if (isAdminMessage) return "justify-center"
    if (isUserMessage) return "justify-start"
    return "justify-end"
  }

  // Get message style classes based on type
  const getMessageStyles = () => {
    const baseStyles = "rounded-md px-[12px] py-[8px] transition-colors"

    if (errorMessage) {
      return cn(baseStyles, "bg-red-500 text-white border-2 border-red-600")
    }

    if (isAdminMessage) {
      return cn(
        baseStyles,
        "text-primary border-2 border-primary",
        "rounded-md"
      )
    }

    if (isUserMessage) {
      return cn(
        baseStyles,
        "bg-[#F6F4F8] text-black",
        "rounded-t-md rounded-e-md rtl:rounded-br-none ltr:rounded-bl-none"
      )
    }
    // Other message (other side)
    return cn(
      baseStyles,
      "bg-gray-200 text-foreground",
      "rounded-tr-md ltr:rounded-br-none rtl:rounded-bl-none rounded-bl-md rounded-br-md"
    )
  }

  // Get content styles based on message type
  const getContentStyles = () => {
    if (errorMessage) {
      return "text-white"
    }
    if (isAdminMessage) {
      return "text-primary font-semibold"
    }
    if (isUserMessage) {
      return "text-primary-foreground"
    }
    return "text-foreground"
  }

  const alignment = getAlignment()

  return (
    <div className={cn("my-0.5 flex px-1 select-none", alignment, className)}>
      <div className={getMessageStyles()}>
        {/* Message Content */}
        <div className="mt-0.5 flex items-center gap-[4px]">
          {isLoading || isPending ? (
            <Loader2 className="size-1 animate-spin" />
          ) : null}
          {errorMessage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-triangle-alert"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          ) : null}
          <p className={getContentStyles()}>{content}</p>
        </div>

        {/* Error Message */}
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
