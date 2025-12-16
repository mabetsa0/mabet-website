/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import { Grid, GridCol } from "@mantine/core"
import { dotBg } from "@/assets"
import Footer from "@/components/common/footer"
import { getServerSession } from "@/lib/get-server-session"
import { redirect } from "@/lib/i18n/navigation"
import SideBar from "./components/side-bar"
import UserStatus from "./components/user-status"

export default async function Layout({
  params,
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: "ar" | "en" }

  const session = await getServerSession()

  if (!session) return redirect({ href: { pathname: "/" }, locale })

  return (
    <>
      <section className="relative bg-[linear-gradient(100.06deg,#188078_42.47%,#051A18_88.92%)]">
        <Image
          alt="dots"
          className="absolute h-full w-full object-cover"
          src={dotBg}
          loading="lazy"
        />
        <div className="relative container">
          <UserStatus />
        </div>
      </section>
      <section className="relative">
        <div className="container">
          <Grid columns={4} className="md:-translate-y-9">
            <GridCol span={{ base: 4, md: "content" }} className="relative">
              <SideBar />
            </GridCol>
            <GridCol
              className="break md:mt-[9.5rem] md:max-w-[calc(62em-300px)] lg:max-w-[calc(75em-300px)] xl:max-w-[calc(88em-300px)]"
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
