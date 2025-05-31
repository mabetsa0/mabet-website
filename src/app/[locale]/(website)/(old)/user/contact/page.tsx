"use client"

import Mabeet from "@/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Textarea, TextInput } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Phone } from "lucide-react"
import { useParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import axios from "axios"

const Page = () => {
  const params = useParams()
  const isRtl = params.locale === "ar"
  const schema = z.object({
    subject: z
      .string()
      .min(1, { message: isRtl ? "هذا الحقل مطلوب" : "Required" }),
    message: z
      .string()
      .min(1, { message: isRtl ? "هذا الحقل مطلوب" : "Required" }),
  })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      message: "",
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await Mabeet.post("/contact-us", data)
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: isRtl ? "حصل خطا ما" : "something wrong happened",
        message: axios.isAxiosError(error)
          ? error.response?.data.message
          : error?.message || "something wrong happened!",
      })
      form.setError("root", {
        message: axios.isAxiosError(error)
          ? error.response?.data.message
          : error?.message || "something wrong happened!",
      })
    }
  })

  return (
    <section className="md:px-5">
      <div>
        <h2 className="text-lg font-bold md:text-2xl">
          {isRtl ? "معلومات التواصل" : "Contact information"}
        </h2>
        <div className="border-b border-b-[#ccc] pb-4 pt-8">
          <p className="pb-3 md:text-xl">
            <Phone className="inline-block" color="#49bfb6" />
            <span className="px-1 font-semibold">
              {isRtl ? "خدمة العملاء:" : "customers service:"}
            </span>
          </p>
          <div className="md:text-lg">
            <div dir="ltr" className="rtl:text-right">
              <p className="py-2"> +966-567570014</p>
              <a className=" " href={`mailto:help@mabet.com.sa`}>
                help@mabet.com.sa
              </a>
            </div>
            <p className="mt-2">
              {isRtl
                ? '"من ٩:٣٠ صباحاً إلى ١:٠٠ ليلاً"'
                : "from 9:30 AM to 1:00 AM"}
            </p>
          </div>
        </div>
      </div>
      <p className="md:text-2lx py-8 text-lg font-semibold">
        {isRtl ? "نموذج التواصل" : "Contact form"}
      </p>

      <form
        onSubmit={onSubmit}
        noValidate
        className="max-w-xl space-y-3 py-3 md:py-6"
      >
        <Controller
          control={form.control}
          name="subject"
          render={({ field }) => (
            <TextInput
              radius={"lg"}
              {...field}
              label={isRtl ? "الموضوع" : "Subject"}
              placeholder={isRtl ? "موضوع الرسالة" : "Subject"}
              required
              error={form.formState.errors.subject?.message}
            />
          )}
        />
        <Controller
          control={form.control}
          name="message"
          render={({ field }) => (
            <Textarea
              rows={6}
              label={isRtl ? "الرسالة" : "Message"}
              {...field}
              placeholder={isRtl ? "الرسالة" : "Message"}
              required
              error={form.formState.errors.message?.message}
              radius={"lg"}
            />
          )}
        />

        <div className="flex justify-center pt-3">
          <Button type="submit" loading={form.formState.isSubmitting}>
            {isRtl ? "إرسال الرسالة" : "Send message"}
          </Button>
        </div>

        {form.formState.errors.root?.message ? (
          <p className="py-3 text-center text-red-500">
            {isRtl
              ? "عذرا حصلت مشكلة ما, ولم نتمكن من ارسال رسالتك"
              : "Sorry, something wrong happened and we could not send your message."}
          </p>
        ) : null}
      </form>
    </section>
  )
}

export default Page
