import { OldMabeet } from "@/api"
import { Eye } from "lucide-react"

import { RiyalIcon } from "@/components/icons"
import BackButton from "@/components/ui/back-button"
import { SingleBookingResponse } from "@/types/single-booking-response"
import { Button } from "@mantine/core"

const Page = async ({
  params,
}: {
  params: Promise<{ locale: "ar" | "en"; reservation_id: string }>
}) => {
  const { locale, reservation_id } = await params
  const isRtl = locale === "ar"
  // const response = await Mabeet.get<SingleBookingResponse>(`/account/bookings/${params.reservation_id}`)
  const response = await OldMabeet.get<SingleBookingResponse>(
    `/my/reservations/${reservation_id}`
  )
  const data = response.data.data.bookings

  return (
    <>
      <section className="px-6">
        <BackButton />
        <div>
          <h3 className="mb-10 text-center text-xl font-bold text-customBlack lg:text-3xl">
            {isRtl ? `الحجز رقم` : ` Reservation No. `} {data?.id}
          </h3>

          <div className="flex gap-10 max-md:flex-col">
            <div className="w-full md:w-1/2">
              <div className="rounded-xl border px-4 py-6 shadow">
                <h2 className="mb-4 text-lg font-bold">
                  {isRtl ? "تفاصيل الحجز" : "Reservation details"}
                </h2>

                <div>
                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "العقار" : "Unit name"}
                    </p>
                    <p className="text-textGray">{data?.unit_name}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "كود العقار" : "Unit code"}
                    </p>
                    <p className="text-textGray">{data?.unit_code}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">{isRtl ? "المدينة" : "City"}</p>
                    <p className="text-textGray">{data?.city_name}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "المنطقة" : "province"}
                    </p>
                    <p className="text-textGray">{data?.province_name}</p>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-medium">
                      {isRtl ? "صفحة العقار" : "Unit page"}
                    </p>
                    <Button
                      color="gray"
                      variant="light"
                      component="a"
                      href={data ? data.unit_link : ""}
                    >
                      <span className="flex items-center gap-2 font-medium">
                        {isRtl ? "عرض العقار" : "Show unit"}

                        <Eye />
                      </span>
                    </Button>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "تاريخ الوصول" : "Arrival date"}
                    </p>
                    <p className="text-textGray">
                      {data?.from_date}
                      <span className="mt-1 block">
                        {data?.from_date_hijri}
                      </span>
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "وقت الوصول" : "Arrival time"}
                    </p>
                    <p className="text-textGray">{data?.from_time}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? " تاريخ المغادرة" : "Leaving date"}
                    </p>
                    <p className="text-textGray">
                      {data?.to_date}
                      <span className="mt-1 block">{data?.to_date_hijri}</span>
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? " وقت المغادرة" : "Leaving time"}
                    </p>
                    <p className="text-textGray">{data?.to_time}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "عدد الليالي" : "NO. of nights"}
                    </p>
                    <p className="text-textGray">{data?.nights}</p>
                  </div>

                  <div className="flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "سعر الليلة" : "Night price"}
                    </p>
                    <p className="text-textGray">
                      {data?.night_price}{" "}
                      {isRtl ? (
                        <RiyalIcon className="fill-textGray" width={13} />
                      ) : (
                        "SAR"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <div className="mb-4 rounded-xl border px-4 py-6 shadow">
                <h2 className="mb-4 text-lg font-bold">
                  {isRtl ? "بيانات المضيف" : "Host data"}
                </h2>

                <div>
                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">{isRtl ? "الاسم" : "Name"}</p>
                    <p className="text-textGray">{data?.partner_name}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">{isRtl ? "الايميل" : "Email"}</p>
                    <p className="text-textGray">{data?.partner_email}</p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "رقم الجوال" : "Phone NO."}
                    </p>
                    <p className="text-textGray">{data?.partner_phone}</p>
                  </div>
                </div>
              </div>
              <div className="mb-4 rounded-xl border px-4 py-6 shadow">
                <h2 className="mb-4 text-lg font-bold">
                  {isRtl ? "ملخص الحجز" : "Reservation summar"}
                </h2>

                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <p className="font-medium">{isRtl ? "الفاتورة" : "Bill"}</p>
                    <Button
                      color="gray"
                      variant="light"
                      component="a"
                      href={data ? data.unit_link : ""}
                    >
                      <span className="flex items-center gap-2 font-medium">
                        {isRtl ? "عرض الفاتورة" : "Show bill"}

                        <Eye />
                      </span>
                    </Button>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "التأمين" : "insurance"}
                    </p>
                    <p className="text-textGray">
                      {data?.insurance} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "رسوم الخدمة" : "Service fee"}
                    </p>
                    <p className="text-textGray">
                      {data?.profit} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "الإجمالي" : "Total"}
                    </p>
                    <p className="text-textGray">
                      {data?.total} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-4 rounded-xl border px-4 py-6 shadow">
                <h2 className="mb-4 text-lg font-bold">
                  {isRtl ? "بيانات الدفع" : "Payment details"}
                </h2>

                <div>
                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "طريقة الدفع" : "Payment method"}
                    </p>
                    <p className="text-textGray">{data?.payment_method} </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">{isRtl ? "المدفوع" : "Paid"}</p>
                    <p className="text-textGray">
                      {data?.paid} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>

                  <div className="mb-4 flex justify-between">
                    <p className="font-medium">
                      {isRtl ? "المتبقي" : "Remainder"}
                    </p>
                    <p className="text-textGray">
                      {data?.remainder} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>

                  <div className=" mt-3 flex justify-between border-t">
                    <p className="font-bold">{isRtl ? "الإجمالي" : "Total"}</p>
                    <p className="text-textGray">
                      {data?.total} {isRtl ? <RiyalIcon /> : "SAR"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Page
