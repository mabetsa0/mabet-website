import { UserProvider } from "@/context/user-context"

import ProfileHeader from "@/components/user/profile-header"
import Taps from "@/components/user/taps"
import { getServerSession } from "@/lib/get-server-session"
import { redirect } from "@/lib/i18n/navigation"
import { Session } from "@/@types/user"
import Mabet from "@/services"
import Footer from "@/components/common/footer"
import { Card, Grid, GridCol, Group, Stack, Text } from "@mantine/core"
import UserStatus from "./components/user-status"
import { dotBg } from "@/assets"
import SideBar from "./components/side-bar"

export interface UserResponse {
  data: Session
  message: null
  success: boolean
}

export default async function Layout({
  params,
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: "ar" | "en" }>
}) {
  const { locale } = await params
  const session = await getServerSession()

  if (!session) return redirect({ href: { pathname: "/" }, locale })

  return (
    <>
      <section className="bg-[linear-gradient(100.06deg,_#188078_42.47%,_#051A18_88.92%)] relative  ">
        <img
          alt="dots"
          className="w-full h-full object-cover absolute "
          src={dotBg.src}
        />
        <div className="container relative">
          <UserStatus session={session} />
        </div>
      </section>
      <section className="relative">
        <div className="container  ">
          <Grid columns={4}>
            <GridCol
              span={{ base: 4, md: 1 }}
              className="relative md:-translate-y-9"
            >
              <SideBar session={session} />
            </GridCol>
            <GridCol span={{ base: 4, md: 3 }}>
              <div className="h-screen"></div>
            </GridCol>
          </Grid>
        </div>
      </section>
      <Footer />
    </>
  )
}
