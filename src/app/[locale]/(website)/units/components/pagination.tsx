"use client"
import { Pagination as MantinePagination } from "@mantine/core"
import { parseAsInteger, useQueryState } from "nuqs"
import { useEffect } from "react"

type Props = {
  total?: number
}

const Pagination = (props: Props) => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
  useEffect(() => {
    if (props.total && Number(page) > Number(props.total)) setPage(props.total)
  }, [page, props.total, setPage])
  if (!props.total || props.total <= 1) return null
  return (
    <div className=" flex justify-center py-4">
      <MantinePagination value={page} onChange={setPage} total={props.total} />
    </div>
  )
}

export default Pagination
