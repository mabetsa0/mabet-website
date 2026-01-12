import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@mantine/core"
import dayjs from "dayjs"
import {
  AlertTriangle,
  Building2,
  Calendar,
  Check,
  CheckCheck,
  Copy,
  Loader2,
  Percent,
} from "lucide-react"
import { cn } from "@/lib/cn"
import { Link } from "@/lib/i18n/navigation"
import { useChatData } from "../_contexts/chat-context"
import { useGetCoupon } from "../_hooks/use-get-coupon"
import { useUnitById } from "../_hooks/use-unit-by-id"
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
    return <Check className="me-1 size-1 text-gray-400" />
  }
  if (status === "read") {
    return <CheckCheck className="me-1 size-1 text-[#0e9fff]" />
  }
  return null
}

const CopyButton = ({
  content,
  variant,
}: {
  content: string
  variant: MessageVariant
}) => {
  const t = useTranslations("chat")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-0.5 rounded px-0.5 py-[4px] transition-colors",
        "active:scale-95"
      )}
      aria-label={t("copy.aria-label")}
    >
      <Copy className={cn("size-1")} />
      <span className={cn("text-xs font-medium", getContentStyles(variant))}>
        {copied ? t("copy.copied") : t("copy.button")}
      </span>
    </button>
  )
}

const CouponMessageContent = ({
  content,
  variant,
}: {
  content: string
  variant: MessageVariant
}) => {
  const t = useTranslations("chat")
  const couponCode = content.trim()
  const { data: coupon, isLoading, error } = useGetCoupon(couponCode)

  if (error) {
    return (
      <div className="flex flex-col gap-0.5">
        <p className={cn(getContentStyles(variant), "text-sm text-red-500")}>
          {t("coupon.load-error")}
        </p>
        <div className="flex items-center justify-between gap-0.5">
          <p className={cn(getContentStyles(variant), "text-sm font-medium")}>
            {couponCode}
          </p>
          <CopyButton content={couponCode} variant={variant} />
        </div>
      </div>
    )
  }

  if (isLoading || !coupon) {
    return (
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-0.5">
          <Loader2 className="size-1 animate-spin" />
          <p className={cn(getContentStyles(variant), "text-sm")}>
            {t("coupon.loading")}
          </p>
        </div>
      </div>
    )
  }

  const expirationDate = coupon.expires_at
    ? dayjs(coupon.expires_at)
    : coupon.dates?.[0]?.end_date
      ? dayjs(coupon.dates[0].end_date)
      : null

  return (
    <div className="flex flex-col gap-1">
      {/* Coupon Code Box */}
      <div className="flex items-center justify-center rounded-md bg-white px-2 py-1.5">
        <div className="flex items-center gap-1.5">
          <div className="bg-primary flex size-4 items-center justify-center rounded">
            <Copy className="size-2 text-white" />
          </div>
          <div className="bg-primary h-3 w-px" />
          <p className="text-primary text-sm font-bold">{coupon.coupon}</p>
        </div>
      </div>

      {/* Coupon Details */}
      <div className="flex flex-col gap-1">
        {/* Unit Name - Check if units exists and is not null */}
        {coupon.units != null && (
          <div className="flex items-center gap-1">
            <Building2 className="size-3 shrink-0" />
            <p className={cn(getContentStyles(variant), "text-xs")}>
              {typeof coupon.units === "object" &&
              coupon.units !== null &&
              "name" in coupon.units
                ? String((coupon.units as { name: string }).name)
                : String(coupon.units)}
            </p>
          </div>
        )}

        {/* Expiration Date */}
        {expirationDate && (
          <div className="flex items-center gap-1">
            <Calendar className="size-3 shrink-0" />
            <p className={cn(getContentStyles(variant), "text-xs")}>
              {t("coupon.valid-until")}: {expirationDate.format("DD MMM YYYY")}{" "}
              - {expirationDate.format("hh:mm A")}
            </p>
          </div>
        )}

        {/* Discount */}
        <div className="flex items-center gap-1">
          <Percent className="size-3 shrink-0" />
          <p className={cn(getContentStyles(variant), "text-xs font-medium")}>
            {t("coupon.discount")} {coupon.discount}%
          </p>
        </div>
      </div>

      {/* Copy Button */}
      <div className="flex items-center justify-end">
        <CopyButton content={couponCode} variant={variant} />
      </div>
    </div>
  )
}

const TextMessageContent = ({
  content,
  variant,
}: {
  content: string
  variant: MessageVariant
}) => {
  return <p className={cn(getContentStyles(variant), "text-sm")}>{content}</p>
}

const UnitMessageContent = ({
  content,
  variant,
}: {
  content: string
  variant: MessageVariant
}) => {
  const t = useTranslations("chat")

  // Parse unit ID from content
  const unitId = content.trim()

  // Fetch unit data only when in viewport
  const { data: unit, isLoading, error } = useUnitById(unitId)

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <p className={cn(getContentStyles(variant), "text-sm text-red-500")}>
          {t("unit-card.load-error")}
        </p>
      </div>
    )
  }

  if (isLoading || !unit) {
    return (
      <div className="flex items-center gap-0.5">
        <Loader2 className="size-1 animate-spin" />
        <p className={cn(getContentStyles(variant), "text-sm")}>
          {t("unit-card.loading")}
        </p>
      </div>
    )
  }

  const unitImage = unit.images?.[0]?.image_path || ""

  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-start gap-0.5">
        {unitImage && (
          <div className="size-3 shrink-0 overflow-hidden rounded-md">
            <img
              src={unitImage}
              alt={unit.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-[4px]">
          <p className={cn(getContentStyles(variant), "text-sm font-semibold")}>
            {unit.name}
          </p>
          {unit.code && (
            <p className={cn(getContentStyles(variant), "text-xs opacity-70")}>
              {unit.code}
            </p>
          )}
        </div>
      </div>
      <Button
        variant="white"
        size="xs"
        component={Link}
        href={`/units/${unit.id}`}
        fullWidth
      >
        {t("unit-card.book-now")}
      </Button>
    </div>
  )
}

const MessageContent = ({
  content,
  variant,
  messageType,
}: {
  content: string
  variant: MessageVariant
  messageType?: "text" | "coupon" | "unit"
}) => {
  if (messageType === "coupon") {
    return <CouponMessageContent content={content} variant={variant} />
  }
  if (messageType === "unit") {
    return <UnitMessageContent content={content} variant={variant} />
  }
  return <TextMessageContent content={content} variant={variant} />
}

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
  message_type,
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
          <MessageContent
            content={content}
            variant={variant}
            messageType={message_type}
          />
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
