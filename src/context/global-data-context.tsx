"use client"
import { createContext, useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { City } from "@/@types/cities"
import { UnitType } from "@/@types/unit-types"
import { getCities, getUnitTypes } from "@/services/lists"

const GlobalDataContext = createContext<null | {
  cities: City[]
  unitTypes: UnitType[]
}>(null)

export default function GlobalDataContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = useQuery({
    queryKey: ["cities", "unitTypes"],
    queryFn: () => Promise.all([getCities(), getUnitTypes()]),
    staleTime: Infinity,
  })

  const [cities, unitTypes] = data || [[], []]

  return (
    <GlobalDataContext value={{ cities, unitTypes }}>
      {children}
    </GlobalDataContext>
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
