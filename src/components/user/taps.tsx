"use client"

import Mabeet from "@/api"
import {
  CalendarCheck,
  Headset,
  Heart,
  LogOut,
  User,
  Wallet,
} from "lucide-react"
import { useRouter } from "next/navigation"

import { Link, usePathname } from "@/lib/i18n/navigation"
import { useSession } from "@/lib/session-store"
import axios from "axios"

const userTapsContent = [
  {
    label: (
      <>
        <User className="w-5 lg:w-6" />
        <span className="max-md:hidden ltr:hidden">الملف الشخصي</span>
        <span className="max-md:hidden rtl:hidden">User Profile</span>
      </>
    ),
    href: "/user/profile",
  },
  {
    label: (
      <>
        <CalendarCheck className="w-5 lg:w-6" />
        <span className="max-md:hidden ltr:hidden"> حجوزاتي</span>
        <span className="max-md:hidden rtl:hidden">My Reservations</span>
      </>
    ),
    href: "/user/reservations",
  },

  {
    label: (
      <>
        <Wallet className="w-5 lg:w-6" />
        <span className="max-md:hidden ltr:hidden"> محفظتي</span>
        <span className="max-md:hidden rtl:hidden"> My Wallet</span>
      </>
    ),
    href: "/user/wallet",
  },
  {
    label: (
      <>
        <Heart className="w-5 lg:w-6" />
        <span className="max-md:hidden ltr:hidden"> المفضلة</span>
        <span className="max-md:hidden rtl:hidden"> Favorite</span>
      </>
    ),
    href: "/user/favourite",
  },
  {
    label: (
      <>
        <Headset className="w-5 lg:w-6" />
        <span className="max-md:hidden ltr:hidden">تواصل معنا</span>
        <span className="max-md:hidden rtl:hidden"> Contact us</span>
      </>
    ),
    href: "/user/contact",
  },
  {
    label: (
      <>
        <LogOut className="w-5 text-red-600 lg:w-6" />
        <span className="max-md:hidden ltr:hidden">تسجيل الخروج</span>
        <span className="max-md:hidden rtl:hidden"> Log out</span>
      </>
    ),
    href: "/user/logOut",
  },
]
const Taps = () => {
  const Router = useRouter()
  const { updateSession } = useSession()

  const handleLogout = async () => {
    await Mabeet.post("logout", {})
    await axios.post("/api/logout")
    updateSession(null)
    Router.push("/")
  }

  const pathName = usePathname()

  return (
    <div className="flex gap-2 overflow-hidden rounded-xl border-2 border-gray-500 bg-gray-150 md:flex-col md:gap-3">
      {userTapsContent.map((e) => {
        if (e.href === "/user/logOut") {
          return (
            <button
              type="button"
              onClick={handleLogout}
              key={e.href}
              className={`grow  cursor-pointer items-center justify-center bg-white py-5 duration-300 max-md:flex md:p-5`}
            >
              <div className="flex items-center gap-2">{e.label}</div>
            </button>
          )
        }
        return (
          <Link
            href={e.href}
            key={e.href}
            className={`grow items-center justify-center bg-white py-5 duration-300 max-md:flex md:p-5 ${
              pathName === e.href ? "!bg-[#efefef] !text-primary" : ""
            }`}
          >
            <div className="flex items-center gap-2">{e.label}</div>
          </Link>
        )
      })}
    </div>
  )
}

export default Taps
