import { SimpleGrid, Text, Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import { getTopRatedUnits } from "../helpers/get-top-rated-units"
import UnitCard from "@/components/common/unit-card"

const TopRatedUnits = async () => {
  const topRatedUnits = await getTopRatedUnits()
  const t = await getTranslations("home.top-rated-units")
  return (
    <section>
      <div className="container py-4 mx-auto">
        <div className="text-center">
          <Text className="max-md:text-sm" c={"primary"} fw={500}>
            {t("title")}
          </Text>
          <Title className=" text-h3 md:text-h2">{t("desciption")}</Title>
        </div>
        <SimpleGrid
          spacing={"lg"}
          cols={{ base: 1, sm: 2, md: 3 }}
          className=" mt-4 md:mt-1.5"
        >
          {topRatedUnits.slice(0, 6).map((unit) => {
            return (
              <UnitCard key={unit.id} {...unit} className="sm:max-w-[unset]" />
            )
          })}
        </SimpleGrid>
      </div>
    </section>
  )
}

export default TopRatedUnits
