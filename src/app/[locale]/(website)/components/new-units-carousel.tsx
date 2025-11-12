"use client"

import { useCallback, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Carousel } from "@mantine/carousel"
import { ActionIcon, Group, Text, Title } from "@mantine/core"
import { EmblaCarouselType } from "embla-carousel"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Unit } from "@/@types"
import UnitCard from "@/components/common/unit-card"

type Props = {
  data: Unit[]
}

const NewUnitsCarousel = ({ data }: Props) => {
  const t = useTranslations("home.new-units")
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null)
  const scrollPrev = useCallback(() => {
    if (!embla) return
    embla.scrollPrev()
  }, [embla])

  const scrollNext = useCallback(() => {
    if (!embla) return
    embla.scrollNext()
  }, [embla])

  const autoplay = useRef(Autoplay({ delay: 10000 }))

  return (
    <section className="bg-[#fafafa] py-3">
      <div className="container mx-auto">
        <Group justify="space-between" align="center" wrap="nowrap">
          <div className="mb-1.5">
            <Text mb={"xs"} className="max-md:text-sm" c={"primary"} fw={500}>
              {t("title")}
            </Text>
            <Title className="text-h3 md:text-h2">{t("desciption")}</Title>
          </div>
          <Group justify="center" wrap="nowrap">
            <ActionIcon
              radius={"50%"}
              variant="outline"
              onClick={scrollPrev}
              size={"xl"}
            >
              <ChevronLeft className="rtl:rotate-180" />
            </ActionIcon>
            <ActionIcon
              radius={"50%"}
              variant="outline"
              onClick={scrollNext}
              size={"xl"}
            >
              <ChevronRight className="rtl:rotate-180" />
            </ActionIcon>
          </Group>
        </Group>
        <div
          style={{
            overflow: "hidden",
            maxWidth: "100%",
            minWidth: 250,
          }}
          className="w-full"
        >
          <Carousel
            getEmblaApi={setEmbla}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            // type="container"
            type="media"
            slideSize={{ base: "100%", sm: "400" }}
            slideGap={{ base: "lg" }}
            withControls={false}
            // draggable={false}
            emblaOptions={{ loop: true, align: "start" }}
          >
            {data.map((unit) => (
              <Carousel.Slide key={unit.id}>
                <UnitCard {...unit} />
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default NewUnitsCarousel
