import { Suspense } from "react"
import Results from "./components/results"

const Page = () => {
  return (
    <Suspense>
      <Results />
    </Suspense>
  )
}

export default Page
