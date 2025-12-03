/* eslint-disable @next/next/no-img-element */
"use client"
import { useTranslations } from "next-intl"
import {
  Avatar,
  Divider,
  Group,
  Loader,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { Star } from "lucide-react"
import { ReviewsResponse } from "@/app/[locale]/(website)/units/types/reviews"
import Mabet from "@/services"

const Reviews = ({ unitId }: { unitId: string }) => {
  const { data, status } = useQuery({
    queryKey: ["host-reviews", unitId],
    queryFn: async () => {
      return (await Mabet.get<ReviewsResponse>(`/units/host/${unitId}/reviews`))
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
      <section>
        <div className="container">
          <Divider />
          <Stack className="py-2">
            <div>
              <Text mb={"xs"} className="max-md:text-sm" c={"primary"} fw={500}>
                {t("host-page.reviews-title")}
              </Text>
              <Title className="text-h3 md:text-h2">
                {t("host-page.reviews-description")}
              </Title>
            </div>
            {/* <SimpleGrid
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
          </SimpleGrid> */}
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
        </div>
      </section>
    )

  return null
}

export default Reviews
