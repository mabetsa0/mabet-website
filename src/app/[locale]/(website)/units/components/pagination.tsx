"use client"
import { Pagination as MantinePagination } from "@mantine/core"
import { parseAsInteger, useQueryState } from "nuqs"

type Props = {
  total?: number
}

const Pagination = (props: Props) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
  if (!props.total || props.total <= 1) return null

  return (
    <div className=" flex justify-center py-4">
      <MantinePagination value={page} onChange={setPage} total={props.total} />
    </div>
  )
}

export default Pagination
