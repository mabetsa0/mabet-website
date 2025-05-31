"use client"

import { Loader, Pagination } from "@mantine/core"
import { useParams } from "next/navigation"

import usePaginationFetcher from "@/hooks/use-paginated-fetcher"
import { FavouriteResponse } from "@/types/favourite-response"

import { Unit } from "@/@types"
import UnitCard from "@/components/common/unit-card"
import ErrorUI from "@/components/ui/error"
import UserTapHeader from "@/components/user/tap-header"

type Props = {}

const UserFavourite = () => {
  const params = useParams()
  const isRtl = params.locale === "ar"
  const url = `/account/favourites?page=`

  const { isLoading, error, data, setPageIndex, pageIndex, totalPages } =
    usePaginationFetcher<FavouriteResponse>({
      url,
    })

  if (error) return <ErrorUI />
  return (
    <div className="md:px-2">
      {isLoading ? (
        <div className="min-h-[70vh] py-20">
          <Loader />
        </div>
      ) : (
        <div>
          {!data?.data.favourites.length ? (
            <>
              <p className="mb-3 text-lg font-semibold">
                {isRtl ? "لا يوجد مفضلة حتى الان" : "There is no favorite yet"}
              </p>
              <p className="text-textGray max-md:text-sm">
                {isRtl
                  ? "يمكنك تصفح اماكن الإقامة وحفظها في مفضلتك"
                  : "You can browse the accommodations and save them on your favorites"}
              </p>
            </>
          ) : (
            <div>
              <UserTapHeader
                title={isRtl ? "مفضلتك" : "Your Favorite"}
                des={
                  isRtl
                    ? "يمكنك تصفح اماكن الإقامة وحفظها في مفضلتك"
                    : "You can browse the accommodations and save them on your favorites"
                }
              />

              <div className="min-h-[50vh] gap-4 py-5 grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 md:max-md:grid">
                {data.data.favourites.map((e, i) => {
                  return <UnitCard key={i} {...(e as unknown as Unit)} />
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {totalPages > 1 ? (
        <div className="mt-auto py-4 md:py-8">
          <div dir="ltr" className="mx-auto w-fit">
            <Pagination
              className="![direction:ltr]"
              value={pageIndex}
              onChange={setPageIndex}
              total={totalPages}
              classNames={{
                control: "data-[active]:!bg-primary hover:bg-primary",
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default UserFavourite
