import { Session } from "@/@types/user"
import { dotBg } from "@/assets"
import Footer from "@/components/common/footer"
import { getServerSession } from "@/lib/get-server-session"
import { redirect } from "@/lib/i18n/navigation"
import { Grid, GridCol } from "@mantine/core"
import SideBar from "./components/side-bar"
import UserStatus from "./components/user-status"

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
          <Grid columns={4} className="md:-translate-y-9 ">
            <GridCol span={{ base: 4, md: "content" }} className="relative ">
              <SideBar session={session} />
            </GridCol>
            <GridCol
              className="md:mt-[9.5rem]  break md:max-w-[calc(62em-350px)] lg:max-w-[calc(75em-350px)] xl:max-w-[calc(88em-350px)]"
              span={{ base: 4, md: "auto" }}
              p={{ base: "sm", md: "xl" }}
            >
              {children}
            </GridCol>
          </Grid>
        </div>
      </section>
      <Footer />
    </>
  )
}
