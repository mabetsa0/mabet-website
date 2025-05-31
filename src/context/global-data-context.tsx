"use client"
import { City } from "@/@types/cities"
import { UnitType } from "@/@types/unit-types"
import { createContext, useContext } from "react"

const GlobalDataContext = createContext<null | {
  cities: City[]
  unitTypes: UnitType[]
}>(null)

export default function GlobalDataContextProvider({
  children,
  cities,
  unitTypes,
}: {
  children: React.ReactNode
  cities: City[]
  unitTypes: UnitType[]
}) {
  const value = { cities, unitTypes }
  return (
    <GlobalDataContext.Provider value={value}>
      {children}
    </GlobalDataContext.Provider>
  )
}

export const useUnitTypes = () => {
  const value = useContext(GlobalDataContext)
  if (!value)
    throw new Error(
      "use unit types should be used in GlobalDataContextProvider"
    )
  return value.unitTypes
}
export const useCities = () => {
  const value = useContext(GlobalDataContext)
  if (!value)
    throw new Error("useCities should be used in GlobalDataContextProvider")
  return value.cities
}
