import { Metadata } from "next"
import dynamic from "next/dynamic"
import { SEO } from "@/services/get-seo"
import GoToBookings from "./components/go-to-bookings"
import Navbar from "./components/navbar"

const AuthModal = dynamic(
  () => import("@/components/common/auth/auth-modal"),
  {}
)
const Nafath = dynamic(() => import("@/components/common/auth/nafath"))
const UserDataModal = dynamic(
  () => import("@/components/common/auth/user-data-modal")
)
export async function generateMetadata(): Promise<Metadata> {
  return await SEO("/home")
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar>{children}</Navbar>
      <AuthModal />
      <Nafath />
      <UserDataModal />
      <GoToBookings />
    </>
  )
}
