import React from "react"
import { SearchParams } from "../@types/search-params"
import Mabet from "@/services"
import { SimpleGrid } from "@mantine/core"
import { SearchResultsResponse } from "../@types/results"
import UnitCard from "@/components/common/unit-card"

type Props = { searchparams: Promise<SearchParams> }

const Results = async (props: Props) => {
  const searchParams = await props.searchparams
  const results = await Mabet.get<SearchResultsResponse>(`/units`, {
    params: searchParams,
  })
  const units = results.data.data.data

  return (
    <section>
      <div className="container">
        <SimpleGrid cols={3}>
          {units.map((unit) => {
            return <UnitCard key={unit.id} {...unit} />
          })}
        </SimpleGrid>
      </div>
    </section>
  )
}

export default Results
