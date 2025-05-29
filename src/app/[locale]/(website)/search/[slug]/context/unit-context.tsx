"use client"

import { createContext, useContext } from "react"
import { FullUnitData } from "../@types"

const UnitStoreContext = createContext<FullUnitData | null>(null)

export const UnitContextProvider = ({
  children,
  value,
}: {
  children: React.ReactNode
  value: FullUnitData
}) => {
  return (
    <UnitStoreContext.Provider value={value}>
      {children}
    </UnitStoreContext.Provider>
  )
}

export const useUnitData = () => {
  const value = useContext(UnitStoreContext)

  if (!value) {
    throw new Error(`useUnitData must be use within unitStoreProvider`)
  }

  return value
}
