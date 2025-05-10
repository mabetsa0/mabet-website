"use client"
import UnitCard from "@/components/common/unit-card"
import Mabet from "@/services"
import { Loader, SimpleGrid } from "@mantine/core"

import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { SearchResultsResponse } from "../@types/results"
import Pagination from "./pagination"

const Results = () => {
  const searchParams = useSearchParams()
  const { data, status } = useQuery({
    queryKey: ["search", searchParams.toString()],
    queryFn: async () => {
      const results = await Mabet.get<SearchResultsResponse>(`/units`, {
        params: searchParams,
      })
      return results.data.data
    },
  })

  return (
    <section>
      <div className="container">
        {status === "pending" ? (
          <div className="flex items-center justify-center min-h-[100vh]">
            <Loader />
          </div>
        ) : null}
        {status === "success" ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {data.data.map((unit) => {
              return <UnitCard key={unit.id} {...unit} />
            })}
          </SimpleGrid>
        ) : null}

        <Pagination total={data?.last_page} />
      </div>
    </section>
  )
}

export default Results
