"use client"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { ActionIcon, Tooltip } from "@mantine/core"
import { useSession } from "@/lib/session-store"

const GoToBookings = () => {
  const router = useRouter()
  const pathname = usePathname()

  const handleClick = () => {
    router.push("/user/bookings")
  }
  const t = useTranslations()
  const { session } = useSession()

  if (!session?.access_token) return null
  if (pathname.includes("/user")) return null

  return (
    <div className="fixed end-2 bottom-2 z-10">
      <Tooltip label={t("general.goToBookings")} offset={10} position="top">
        <div>
          <ActionIcon
            className={"p-1 duration-200 hover:-translate-y-0.5"}
            visibleFrom="sm"
            onClick={handleClick}
            size={70}
            aria-label="Go to bookings"
            radius={"90px"}
          >
            <svg
              className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="white">
                <path d="m112 18h-10v-6c0-2.2-1.8-4-4-4h-4c-2.2 0-4 1.8-4 4v6h-54v-6c0-2.2-1.8-4-4-4h-4c-2.2 0-4 1.8-4 4v6h-10c-5 0-9 4-9 9v85c0 5 4 9 9 9h98c5 0 9-4 9-9v-85c0-5-4-9-9-9zm-14-6v16h-4v-16zm-66 0v16h-4v-16zm85 100c0 2.8-2.2 5-5 5h-98c-2.8 0-5-2.2-5-5v-69h108zm0-73h-108v-12c0-2.8 2.2-5 5-5h10v6c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-6h54v6c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-6h10c2.8 0 5 2.2 5 5z" />
                <path d="m73 52h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-20c0-1.1-.9-2-2-2zm-2 20h-16v-16h16z" />
                <path d="m40 52h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-20c0-1.1-.9-2-2-2zm-2 20h-16v-16h16z" />
                <path d="m106 52h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-20c0-1.1-.9-2-2-2zm-2 20h-16v-16h16z" />
                <path d="m78.6 84.9c-.8-.8-2-.8-2.8 0l-.6.6v-.2c0-1.1-.9-2-2-2h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-14.2l3.4-3.4c.8-.8.8-2 0-2.8zm-7.4 18.4h-16v-7.9l6.4 6.5c.4.4.9.6 1.4.6s1-.2 1.4-.6l6.7-6.7v8.1zm0-13.8-8.2 8.1-5.6-5.6c-.6-.6-1.5-.7-2.2-.4v-4.2h16z" />
                <path d="m40 84h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-20c0-1.1-.9-2-2-2zm-2 20h-16v-16h16z" />
                <path d="m111.6 85.6c-.8-.8-2-.8-2.8 0l-.8.8v-.4c0-1.1-.9-2-2-2h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-14l3.6-3.6c.8-.8.8-2 0-2.8zm-7.6 18.4h-16v-8.1l6.7 6.7c.4.4.9.6 1.4.6s1-.2 1.4-.6l6.5-6.6zm0-13.6-7.9 7.9-5.7-5.6c-.7-.7-1.6-.8-2.4-.3v-4.4h16z" />
              </g>
            </svg>
          </ActionIcon>
          <ActionIcon
            className={"p-0.5 duration-200 hover:-translate-y-0.5"}
            hiddenFrom="sm"
            onClick={handleClick}
            size={50}
            aria-label="Go to bookings"
            radius={"90px"}
          >
            <svg
              className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="white">
                <path d="m112 18h-10v-6c0-2.2-1.8-4-4-4h-4c-2.2 0-4 1.8-4 4v6h-54v-6c0-2.2-1.8-4-4-4h-4c-2.2 0-4 1.8-4 4v6h-10c-5 0-9 4-9 9v85c0 5 4 9 9 9h98c5 0 9-4 9-9v-85c0-5-4-9-9-9zm-14-6v16h-4v-16zm-66 0v16h-4v-16zm85 100c0 2.8-2.2 5-5 5h-98c-2.8 0-5-2.2-5-5v-69h108zm0-73h-108v-12c0-2.8 2.2-5 5-5h10v6c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-6h54v6c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-6h10c2.8 0 5 2.2 5 5z" />
                <path d="m73 52h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-20c0-1.1-.9-2-2-2zm-2 20h-16v-16h16z" />
                <path d="m40 52h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-20c0-1.1-.9-2-2-2zm-2 20h-16v-16h16z" />
                <path d="m106 52h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-20c0-1.1-.9-2-2-2zm-2 20h-16v-16h16z" />
                <path d="m78.6 84.9c-.8-.8-2-.8-2.8 0l-.6.6v-.2c0-1.1-.9-2-2-2h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-14.2l3.4-3.4c.8-.8.8-2 0-2.8zm-7.4 18.4h-16v-7.9l6.4 6.5c.4.4.9.6 1.4.6s1-.2 1.4-.6l6.7-6.7v8.1zm0-13.8-8.2 8.1-5.6-5.6c-.6-.6-1.5-.7-2.2-.4v-4.2h16z" />
                <path d="m40 84h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-20c0-1.1-.9-2-2-2zm-2 20h-16v-16h16z" />
                <path d="m111.6 85.6c-.8-.8-2-.8-2.8 0l-.8.8v-.4c0-1.1-.9-2-2-2h-20c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2v-14l3.6-3.6c.8-.8.8-2 0-2.8zm-7.6 18.4h-16v-8.1l6.7 6.7c.4.4.9.6 1.4.6s1-.2 1.4-.6l6.5-6.6zm0-13.6-7.9 7.9-5.7-5.6c-.7-.7-1.6-.8-2.4-.3v-4.4h16z" />
              </g>
            </svg>
          </ActionIcon>
        </div>
      </Tooltip>
    </div>
  )
}

export default GoToBookings
