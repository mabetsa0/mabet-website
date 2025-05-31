"use client"

import Mabeet from "@/api"
import { useUser } from "@/context/user-context"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, TextInput } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

import { useSession } from "@/app/session-provider"
import axios from "axios"
import { useLocale } from "next-intl"
const Page = () => {
  const isRtl = useLocale() === "ar"
  const user = useUser()
  const schema = z.object({
    email: z
      .string()
      .email({ message: isRtl ? "أيميل غير صالح" : "invalid email" }),
  })
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
  } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      email: user.user.email,
    },
  })

  const { session } = useSession()

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    try {
      const response = await Mabeet.post("/user/update", data)
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: isRtl ? "حصل خطأ!" : "something wrong happened!",
        message: isRtl
          ? "لم نتمكن من تحديث الايميل الخاص بك"
          : "sorry, we could not updated your email",
      })
      setError("root", {
        message: axios.isAxiosError(error)
          ? error.response?.data.message
          : error.message || "something wrong happened!",
      })
    }
  }
  return (
    <div className="md:px-5">
      <h2 className="mb-2 text-xl font-bold text-customBlack md:text-2xl">
        {isRtl ? "معلومات الملف الشخصي" : "Profile information"}
      </h2>
      <p className="md:text-lg">
        {isRtl
          ? "لايمكنك تعديل معلومات الملف الشخصي باستثناء البريد الالكتروني"
          : "You can't modify profile information except for email"}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 max-w-lg">
        <div className="mb-3">
          <TextInput
            label={isRtl ? "الاسم:" : "Name:"}
            readOnly
            defaultValue={user.user.name}
            radius={"40px"}
          />
        </div>
        <div className="mb-3">
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <TextInput
                {...field}
                label={isRtl ? "الايميل:" : "Email"}
                type="email"
                required
                error={errors.email?.message}
                radius={"40px"}
              />
            )}
          />
        </div>

        <div className="mb-3">
          <TextInput
            label={isRtl ? "رقم الجوال:" : "Phone Number:"}
            defaultValue={user.user.phonenumber}
            readOnly
            radius={"40px"}
          />
        </div>

        <div>
          <p className="py-5 text-textGray md:py-8">
            {isRtl
              ? " لإستقبال : كود تسجيل الدخول، رسائل الحجز المبدئى، رسائل تأكيد الحجز، رسائل انتهاء صلاحية الحجز."
              : "To receive: login code, initial reservation messages, reservation confirmation messages, reservation expiration messages."}
          </p>
        </div>

        <Button loading={isSubmitting} type="submit" className="w-full">
          {isRtl ? "حفظ" : "Save"}
        </Button>
        {errors.root ? (
          <p className="py-3 text-center text-sm text-red-600">
            {errors.root.message}
          </p>
        ) : null}
      </form>
    </div>
  )
}

export default Page
