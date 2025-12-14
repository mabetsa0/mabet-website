import { Suspense } from "react"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Loader } from "@mantine/core"
import Footer from "@/components/common/footer"
import { SEO } from "@/services/get-seo"
import AddYourUnit from "./components/add-your-unit"
import DownLoadApp from "./components/download-app"
import Hero from "./components/hero"
import NewUnits from "./components/new-units"
import SpecialUnits from "./components/special-units"
import TopRatedUnits from "./components/top-rated-units"
import UnitTypes from "./components/unit-types"
import WhyMabet from "./components/why-mabet"

const Blogs = dynamic(async () => import("./components/blogs"))

export async function generateMetadata(): Promise<Metadata> {
  return await SEO("/home")
}

export default async function Page() {
  return (
    <>
      <Hero />
      <UnitTypes />
      <Suspense
        fallback={
          <div className="flex min-h-svh items-center justify-center">
            <Loader />
          </div>
        }
      >
        <SpecialUnits />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex min-h-svh items-center justify-center">
            <Loader />
          </div>
        }
      >
        <NewUnits />
      </Suspense>

      <WhyMabet />
      <AddYourUnit />
      <Suspense
        fallback={
          <div className="flex min-h-svh items-center justify-center">
            <Loader />
          </div>
        }
      >
        <TopRatedUnits />
      </Suspense>

      <DownLoadApp />
      <Blogs />
      <Footer />
    </>
  )
}
