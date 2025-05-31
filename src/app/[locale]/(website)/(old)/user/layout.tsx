import { UserProvider } from "@/context/user-context"

import ProfileHeader from "@/components/user/profile-header"
import Taps from "@/components/user/taps"
import { getServerSession } from "@/lib/get-server-session"
import { redirect } from "@/lib/i18n/navigation"

export const dynamic = "force-dynamic"
export default async function Layout({
  params,
  children,
}: {
  children: React.ReactNode
  params: Promise<{ locale: "ar" | "en" }>
}) {
  const { locale } = await params
  const isRtl = locale === "ar"
  const session = await getServerSession()
  if (!session) return redirect({ href: { pathname: "/" }, locale })

  return (
    <>
      <section className="bg-gray-100">
        <div className="container flex h-[35vh] flex-col items-center justify-center gap-3 text-center font-bold md:h-[45vh] md:gap-4">
          <h1 className="text-3xl md:text-5xl">{isRtl ? "مبيت" : "Mabet"}</h1>
          <p className="md:text-xl">
            {isRtl
              ? "اقضي افضل عطلة مع مبيت"
              : "Spend the best holiday with Mabeet"}
          </p>
        </div>
      </section>
      <section className="mt-6 bg-customWhite">
        <div className="container">
          <ProfileHeader isRtl={isRtl} {...session} />
        </div>
      </section>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="flex max-md:flex-col max-md:gap-8">
            <div className="w-full md:w-1/4">
              {" "}
              <Taps />{" "}
            </div>
            <div className="w-full lg:w-[90%]">
              <UserProvider user={session}>{children}</UserProvider>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
