"use client"
import React from "react"
import { parseAsString, useQueryState } from "nuqs"
import useMdScreen from "@/hooks/use-md-screen"

type Props = {
  tab: "Reviews" | "Terms" | "Default" | "Map"
  children: React.ReactNode
}

const TabConditionRender = (props: Props) => {
  const [tab] = useQueryState("tab", parseAsString.withDefault("Default"))
  const matches = useMdScreen()
  if (matches && tab != props.tab) return null
  return props.children
}

export default TabConditionRender
