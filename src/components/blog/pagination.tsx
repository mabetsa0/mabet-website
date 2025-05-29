"use client"

import { useRouter } from "@/lib/i18n/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ReactPaginate from "react-paginate"

type Props = {
  page: number
  url?: string
  pageCount: number
}

const Pagination = ({ page, url = `/blog/`, pageCount }: Props) => {
  const router = useRouter()
  const handlePageClick = (event: { selected: number }) => {
    router.push(`${url}${event.selected + 1}`)
  }
  return (
    <div className="py-2.5">
      {pageCount === 1 ? null : (
        <ReactPaginate
          forcePage={page - 1}
          className="flex select-none items-center justify-center gap-[12px]"
          pageLinkClassName="block size-2 rounded border border-gray-100 bg-white text-center  text-gray-900 select-none "
          activeLinkClassName="block size-2 rounded border-primary !bg-primary text-center  !text-white"
          breakLabel="..."
          nextLabel={<ChevronLeft />}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel={<ChevronRight />}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  )
}

export default Pagination
