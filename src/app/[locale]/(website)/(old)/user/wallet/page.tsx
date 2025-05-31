"use client"

import { Loader, Pagination } from "@mantine/core"

import usePaginationFetcher from "@/hooks/use-paginated-fetcher"
import { WalletResponse } from "@/types/wallet-response"
import ErrorUI from "@/components/ui/error"
import { useLocale } from "next-intl"
import { RiyalIcon } from "@/components/icons"

// const AddBalanceForm = () => {
//   const params = useParams()
//   const isRtl = params.locale === "ar"

//   const [value, setValue] = useState("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   // const handleAddBalance: React.FormEventHandler<HTMLFormElement> = async (e) => {
//   //   e.preventDefault()
//   //   setIsSubmitting(true)
//   //   try {
//   //     const data = new FormData()
//   //     console.log(value)

//   //     data.append("value", value.trim() + "")

//   //     const response = await Mabeet.post("/wallet/add-balance", data)

//   //     if (!response.data.data.link) throw new Error("something wrong happened")

//   //     openInNewTab(response.data.data.link)
//   //   } catch (error) {
//   //     console.log(error)

//   //     notifications.show({
//   //       color: "red",
//   //       title: isRtl ? "حصلت مشكلة ما!" : "Something wrong happened",
//   //       message: isRtl ? "فشل عملية التحويل الى بوابة الدفع" : "Faild to redirect to Payment gate ",
//   //     })
//   //   } finally {
//   //     setIsSubmitting(false)
//   //   }
//   // }
//   return (
//     <form onSubmit={handleAddBalance}>
//       <TextInput
//         label={isRtl ? "المبلغ المراد اضافته" : "The amount to be added"}
//         placeholder={isRtl ? "المبلغ بالريال" : "The amount in the riyal"}
//         data-autofocus
//         value={value}
//         onChange={(e) => {
//           setValue(e.target.value)
//         }}
//         type="number"
//         required
//         classNames={{
//           input: "focus:!border-primary",
//         }}
//       />

//       <MainBtn type="submit" isLoading={isSubmitting}>
//         {isRtl ? "اضف" : "Add"}
//       </MainBtn>
//     </form>
//   )
// }
const UserWallet = () => {
  const isRtl = useLocale() === "ar"

  const url = `/account/wallet?type=all&page=`
  const { isLoading, error, data, setPageIndex, pageIndex, totalPages } =
    usePaginationFetcher<WalletResponse>({
      url,
    })

  if (error) return <ErrorUI />
  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    )

  return (
    <div className="md:px-5">
      <div>
        <div className="mb-6 flex items-center">
          <div className="grow">
            <h2 className="mb-2 text-xl font-bold text-customBlack md:text-2xl">
              {isRtl ? "معلومات محفظتك" : "Your Wallet information"}
            </h2>
            <p className="md:text-lg">
              {isRtl
                ? `الرصيد المتاح في محفظتك  ${data?.data.current_balance}`
                : `Available balance in your wallet : ${data?.data.current_balance}`}{" "}
              {isRtl ? <RiyalIcon /> : "SAR"}
            </p>
          </div>
        </div>

        {data?.data.data.length ? (
          <div>
            {data?.data.data.map((walletRecord) => {
              return (
                <div
                  key={walletRecord.id}
                  className="mb-3 flex justify-between gap-2 rounded-xl bg-customWhite px-3 py-4 shadow-sm md:mb-4 md:px-6"
                >
                  <div>
                    <p className="mb-2 font-medium md:text-lg">
                      {walletRecord.label}
                    </p>
                    <p className="mb-1 text-textGray  text-sm">
                      {walletRecord.description}
                    </p>
                    <p>{walletRecord.creation_date.text}</p>
                  </div>
                  <div>
                    <p
                      className="text-lg font-semibold md:text-xl"
                      style={{
                        color: walletRecord.credit_color,
                      }}
                    >
                      {walletRecord.credit} {isRtl ? "ر.س" : "SAR"}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <>
            <p className="mb-3 text-lg font-semibold">
              {isRtl
                ? "لا يوجد رصيد في المحفظة حاليا"
                : "There is currently no balance in the wallet"}
            </p>
            <p className="text-textGray max-md:text-sm">
              {isRtl
                ? "رصيد المحفظة يحتوي على المبالغ المستردة من الحجوزات الملغاة والكاش باك التي نقدمها لعملاءنا"
                : "Wallet balance contains refunds from canceled reservations and cashbacks that we offer to our customers"}
            </p>
          </>
        )}
      </div>

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

export default UserWallet
