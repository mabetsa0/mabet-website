import { UnitTypeIcons } from "@/assets"
import { Link } from "@/lib/i18n/navigation"
import { getUnitTypes } from "@/services/lists"
import { Image, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { getTranslations } from "next-intl/server"
import React from "react"

const UnitTypes = async () => {
  const unitTypes = await getUnitTypes()
  const t = await getTranslations("home.unit-types")
  return (
    <section>
      <div className="container py-4 mx-auto">
        <div className="text-center">
          <Text className="max-md:text-sm" c={"primary"} fw={500}>
            {t("title")}
          </Text>
          <Title className=" text-h3 md:text-h2">{t("desciption")}</Title>
        </div>
        <SimpleGrid cols={{ base: 2, md: 4 }} className=" mt-4 md:mt-1.5">
          {unitTypes.map((type) => {
            return (
              <Link key={type.id} href={`/search?unit_type=${type.id}`}>
                <Stack gap={"xs"} ta={"center"}>
                  <Image
                    h={40}
                    w={40}
                    mx={"auto"}
                    src={
                      UnitTypeIcons[
                        (type.id + "") as keyof typeof UnitTypeIcons
                      ]
                    }
                    alt={type.name}
                  />
                  <Text fz={"sm"} fw={700} className="">
                    {type.name}
                  </Text>
                  <Text ta={"center"} size="sm" c={"gray"}>
                    {type.units_count_text}
                  </Text>
                </Stack>
              </Link>
            )
          })}
        </SimpleGrid>
      </div>
    </section>
  )
}

export default UnitTypes
