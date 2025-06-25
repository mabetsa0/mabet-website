import dynamic from "next/dynamic"
import { notFound } from "next/navigation"

import axios from "axios"
import { ArrowLeft, MapPin, Tag } from "lucide-react"
import { GetBooking } from "./helpers/get-booking"
import { GetUnit } from "../../../units/[slug]/get-unit"
import { RiyalIcon } from "@/components/icons"
import { Button, Divider } from "@mantine/core"
import ImageGallery from "../../../units/[slug]/components/image-gallery"
import ImageSlider from "../../../units/[slug]/components/image-slider"
import { UnitContextProvider } from "../../../units/[slug]/context/unit-context"

type Props = {
  params: Promise<{
    booking_id: string
  }>
}

const page = async (props: Props) => {
  try {
    const params = await props.params
    const booking = await GetBooking(params.booking_id)
    const unit = await GetUnit({ slug: booking.unit.id + "" })
    return (
      <UnitContextProvider value={unit}>
        <ImageGallery />
        <ImageSlider />
        <section className="relative z-10 bg-white max-lg:-mt-1 max-lg:rounded-large">
          <div className="container">
            <div className="flex gap-1 max-lg:flex-col">
              <div className="py-2 lg:w-2/3">
                <div className="space-y-1.5">
                  <h1 className="text-2xl">
                    تفاصيل الحجز رقم #{params.booking_id}
                  </h1>
                  <div className="flex gap-1">
                    <div className="w-1/2 rounded bg-green-300/15 p-[12px]">
                      <p className="text-sm font-medium text-default-600">
                        وقت الوصول
                      </p>
                      <span>{unit.checkin}</span>
                    </div>
                    <div className="w-1/2 rounded bg-orange-300/15 p-[12px]">
                      <p className="text-sm font-medium text-default-600">
                        وقت المغادرة
                      </p>
                      <span>{unit.checkout}</span>
                    </div>
                  </div>
                  <Divider />

                  <div className="space-y-0.5">
                    <p className="text-2xl">شروط الحجز</p>
                    <ul className="list-inside list-disc ps-1">
                      {booking.unit.terms.map((term, index) => (
                        <li key={index}>{term}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-2xl">سياسة الإلغاء والاسترجاع</p>
                    <ul className="list-inside list-disc ps-1">
                      <li>{booking.cancellation_text}</li>
                    </ul>
                  </div>
                  <Divider />
                  <div className="space-y-0.5">
                    <p className="text-2xl">عنوان العقار</p>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="size-1" />
                      <p>{booking.unit.location}</p>
                    </div>
                    <Button
                      fullWidth
                      className="max-w-sm"
                      component={"a"}
                      href={booking.maps_link}
                      target="_blank"
                    >
                      موقع العقار على الخريطة
                    </Button>
                  </div>
                  <Divider />
                  <div className="space-y-0.5">
                    <p className="text-2xl">تعلميات الوصول</p>
                    <ul className="list-inside list-disc ps-1">
                      {booking.arrival_instructions.map((term, index) => (
                        <li key={index}>
                          {term.label}{" "}
                          {term.content_type === "phone" && (
                            <a href={`tel:+966${term.content}`}>
                              {term.content}
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-2xl">بيانات المضيف</p>
                    <p className="ms-1">اسم المضيف : {booking.partner.name}</p>
                    <p className="ms-1">
                      رقم المضيف:{" "}
                      <a href={`tel:+966${booking.partner.phone}`}>
                        {booking.partner.phone}
                      </a>
                    </p>
                  </div>
                  <Divider />
                  <div className="space-y-[12px]">
                    <p className="text-2xl">ملخص الحجز</p>

                    <div className="flex items-center justify-between gap-1">
                      <p>صافي إجمالي السعر في الليلة</p>
                      <span className="font-bold">
                        {booking.night_price} <RiyalIcon />
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-1 text-sm text-foreground-500">
                      <p>عدد الليالي</p>
                      <span>{booking.duration}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1 text-sm text-foreground-500">
                      <p>رسوم الخدمة </p>
                      <span>{booking.customer_fees_text}</span>
                    </div>
                    <Divider />
                    <div className="flex items-center justify-between py-1 text-lg font-bold">
                      <p>إجمالي السعر</p>
                      <span>{booking.full_payment_text}</span>
                    </div>
                    <div>
                      <Button
                        component={"a"}
                        download
                        href={booking.pdf_link}
                        leftSection={<Tag strokeWidth={1.2} />}
                        variant="light"
                      >
                        عرض فاتورة الحجز
                      </Button>
                    </div>
                  </div>
                  <Divider />
                  <div className="space-y-0.5">
                    <p className="text-2xl">الدعم وحماية حقوقك</p>
                    <p className="ms-1">{booking.support.label}</p>
                    <ul className="list-inside list-disc ps-1">
                      {booking.support.links.map((link, index) => (
                        <li key={index} className="flex items-center underline">
                          <a
                            target="_blank"
                            href={link.link}
                            className="flex items-center gap-2"
                          >
                            <img
                              className="size-1"
                              src={link.icon_svg}
                              alt=""
                            />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3"></div>
            </div>
          </div>
        </section>
      </UnitContextProvider>
    )
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log("🚀 ~ page ~ error:", error.response.data)
      notFound()
    }
    return <div>ERROR</div>
  }
}

export default page
