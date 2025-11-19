/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from "react"
import { sendGTMEvent } from "@next/third-parties/google"

type Props = any

const DataLayer = (data: Props) => {
  useEffect(() => {
    sendGTMEvent({ event: "{data}", value: data })
  }, [data])
  return null
}

export default DataLayer
