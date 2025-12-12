import { getTranslations } from "next-intl/server"
import { MessageSquare } from "lucide-react"

export default async function Page() {
  const t = await getTranslations("chat.empty-state")

  return (
    <div className="hidden h-full w-full items-center justify-center sm:flex">
      <div className="flex flex-col items-center justify-center gap-1.5 text-center">
        <div className="relative">
          <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-2xl" />
          <MessageSquare className="relative size-2 text-gray-600" />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold">{t("title")}</h2>
          <p className="max-w-md text-sm text-gray-600">{t("description")}</p>
        </div>
      </div>
    </div>
  )
}
