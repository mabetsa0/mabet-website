/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { sendGTMEvent } from "@next/third-parties/google"
import { useEffect } from "react"

type Props = any

const DataLayer = (data: Props) => {
  useEffect(() => {
    sendGTMEvent({ event: "{data}", value: data })
  }, [data])
  return null
}

export default DataLayer
