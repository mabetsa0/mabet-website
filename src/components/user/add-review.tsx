"use client"

import { Button, Textarea } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import React, { useState } from "react"

import { OldMabeet } from "../../api"

import { useLocale } from "next-intl"
import UnitRating from "./rate"

type Props = {
  bookingId: string
  handleClose: () => void
}

const AddReview = ({ bookingId, handleClose }: Props) => {
  const isRtl = useLocale() === "ar"
  // form state
  const [formState, setFormState] = useState({
    cleanliness: 0,
    conformity: 0,
    service: 0,
    place_condition: 0,
    comment: "",
  })

  // handle change

  type HandleChangeType = (
    arg_0:
      | keyof typeof formState
      | "increase"
      | "decrease"
      | Omit<string, keyof typeof formState>,
    arg_1: keyof typeof formState
  ) => void

  const handleChange: HandleChangeType = (value, name) => {
    if (value === "increase") {
      setFormState((pre) => ({
        ...pre,
        [name]: (pre[name] as number) < 10 ? ++pre[name] : 10,
      }))
      return
    }

    if (value === "decrease") {
      setFormState((pre) => ({
        ...pre,
        [name]: (pre[name] as number) > 0 ? --pre[name] : 0,
      }))
      return
    }

    if (typeof value === "string") {
      setFormState((pre) => ({ ...pre, comment: value }))
      return
    }
  }

  // loading state
  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState({
    isError: false,
    message: "",
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      const response = await OldMabeet.post(
        `my/reservations/${bookingId}/add-review`,
        formState
      )

      setFormState({
        cleanliness: 0,
        conformity: 0,
        service: 0,
        place_condition: 0,
        comment: "",
      })

      setError({
        isError: false,
        message: "",
      })

      handleClose()

      notifications.show({
        title: isRtl ? "تمت العملية بنجاح" : "Process completed successfully",
        message: isRtl
          ? "تم اضافة تعليقك بنجاح"
          : "Your review have been added successfully",
      })
    } catch (error: any) {
      notifications.show({
        color: "red",
        title: isRtl ? "حصل خطا ما" : " something wrong happened",
        message: error?.message || "failed to add a comment",
      })

      setError({
        isError: true,
        message: error?.message || "failed to add a comment",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-2">
      <div>
        <form action="" onSubmit={handleSubmit} className="mx-auto max-w-lg">
          <h2 className="mb-8 font-bold md:text-xl">
            {isRtl ? "إضافة تقييم" : "Add Review"}
          </h2>

          <div>
            <UnitRating
              cleanliness={formState.cleanliness}
              conformity={formState.conformity}
              service={formState.service}
              place_condition={formState.place_condition}
              handleChange={handleChange}
            />

            <Textarea
              required
              classNames={{
                label: "mb-2",
              }}
              placeholder={isRtl ? "تعليقك" : "Your comment"}
              label={isRtl ? "تعليقك" : "Your comment"}
              value={formState.comment}
              onChange={(e) => {
                handleChange(e.target.value, "comment")
              }}
              withAsterisk
            />

            <div className="pt-5">
              <Button type="submit" loading={isLoading} className={`mx-auto`}>
                {isRtl ? "إضافة تقييم" : "Add review"}
              </Button>
            </div>

            {error.isError ? (
              <p className="py-2 text-center text-red-500">{error.message}</p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddReview
