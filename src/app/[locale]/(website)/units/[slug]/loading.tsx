"use client"
import { Loader } from "@mantine/core"
import { useEffect } from "react"

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    console.log("🚀 ~ useEffect ~ window.scrollTo:", "scroll to top")
  }, [])

  return (
    <div className="flex items-center justify-center h-[100vh] md:h-[10vh]">
      <Loader />
    </div>
  )
}

export default Loading
