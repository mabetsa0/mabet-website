/* eslint-disable @next/next/no-img-element */
"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import {
  Avatar,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { reviewBorder } from "@/assets"
import Mabet from "@/services"
import { ReviewsResponse } from "../../types/reviews"
import { useUnitData } from "../context/unit-context"

const Reviews = () => {
  const unit = useUnitData()
  const { data, status } = useQuery({
    queryKey: ["reviews", unit.id],
    queryFn: async () => {
      return (await Mabet.get<ReviewsResponse>(`/units/${unit.id}/reviews`))
        .data.data
    },
  })

  const t = useTranslations()
  if (status === "pending")
    return (
      <div className="container flex items-center justify-center py-4">
        <Loader />
      </div>
    )
  if (status === "success")
    return (
      <>
        <Divider />
        <Stack>
          <Group justify="center">
            <Image
              src={reviewBorder}
              alt="reviews"
              className="ltr:scale-x-[-1]"
            />
            <Text className="text-[74.42px]" fw={700}>
              {unit.stars || "0.0"}
            </Text>
            <Image
              className="rtl:scale-x-[-1]"
              src={reviewBorder}
              alt="reviews"
            />
          </Group>
          <Text maw={360} mx={"auto"} ta={"center"} c={"#767676"}>
            {t("unit.reviews.description")}
          </Text>
          <Space />
          <SimpleGrid
            spacing={"lg"}
            className="divide-x divide-[#F3F3F3]"
            cols={{ base: 2, md: 4 }}
          >
            {data?.statics.map((ele) => {
              return (
                <Stack px={"md"} key={ele.name}>
                  <Stack gap={"4"}>
                    <Text size="lg" fw={500}>
                      {ele.name}
                    </Text>
                    <Text size="xl" fw={700}>
                      {ele.stars}
                    </Text>
                  </Stack>
                  <img className="w-2" src={ele.icon_svg} alt={ele.name} />
                </Stack>
              )
            })}
          </SimpleGrid>
          <Space />
          <Space />

          <div className="container">
            <Group gap={"lg"} align="flex-start">
              {data?.reviews.map((review) => {
                return (
                  <Stack className="w-full max-w-xs" key={review.id}>
                    <Group>
                      <Avatar name={review.name} radius="xl" />
                      <Stack gap={2}>
                        <Text>{review.name || t("unit.unknown-review")}</Text>
                        <Group>
                          <Star size={22} className="text-primary" />
                          <span className="text-primary font-bold">
                            {review.stars}
                          </span>
                        </Group>
                      </Stack>
                    </Group>
                    <Text size="sm" c={"#767676"}>
                      {review.comment}
                    </Text>
                  </Stack>
                )
              })}
            </Group>
          </div>
        </Stack>
        <Space />
      </>
    )

  return null
}

export default Reviews
