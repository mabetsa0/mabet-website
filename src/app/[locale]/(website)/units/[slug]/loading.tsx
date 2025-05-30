"use client"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    console.log("🚀 ~ useEffect ~ window.scrollTo:", "scroll to top")
  }, [])

  return (
    <div className="flex items-center justify-center h-[100vh] md:h-[10vh]">
      <Loader2 className="w-2.5 h-2.5 text-primary animate-spin" />
    </div>
  )
}

export default Loading
