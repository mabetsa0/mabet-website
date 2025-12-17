import { getTranslations } from "next-intl/server"
import { SimpleGrid, Text, Title } from "@mantine/core"
import { Unit } from "@/@types"
import UnitCard from "@/components/common/unit-card"

type Props = {
  units: Unit[]
}

export default async function Units({ units }: Props) {
  const t = await getTranslations("host-page")

  if (!units || units.length === 0) {
    return null
  }

  return (
    <section>
      <div className="container mx-auto py-4">
        <div className="text-center">
          <Text mb={"xs"} className="max-md:text-sm" c={"primary"} fw={500}>
            {t("units-title")}
          </Text>
          <Title className="text-h3 md:text-h2">{t("units-description")}</Title>
        </div>
        <SimpleGrid
          spacing={"lg"}
          cols={{ base: 1, sm: 2, md: 3 }}
          className="mt-4 md:mt-1.5"
        >
          {units.map((unit) => {
            return (
              <UnitCard key={unit.id} {...unit} className="sm:max-w-[unset]" />
            )
          })}
        </SimpleGrid>
      </div>
    </section>
  )
}
