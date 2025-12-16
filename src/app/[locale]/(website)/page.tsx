import { Suspense } from "react"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Loader } from "@mantine/core"
import { SEO } from "@/services/get-seo"
import Hero from "./components/hero"
import NewUnits from "./components/new-units"
import SpecialUnits from "./components/special-units"
import TopRatedUnits from "./components/top-rated-units"
import UnitTypes from "./components/unit-types"

// Lazy load non-critical components to reduce initial bundle size
// Using ssr: false for client-only components and proper loading states
const Blogs = dynamic(async () => import("./components/blogs"), {
  loading: () => null,
})
const Footer = dynamic(() => import("@/components/common/footer"), {
  loading: () => null,
})
const AddYourUnit = dynamic(() => import("./components/add-your-unit"), {
  loading: () => null,
})
const DownLoadApp = dynamic(() => import("./components/download-app"), {
  loading: () => null,
})

const WhyMabet = dynamic(() => import("./components/why-mabet"), {
  loading: () => null,
})

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
