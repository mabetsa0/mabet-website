import React from "react"
import { getTranslations } from "next-intl/server"
import { Image, SimpleGrid, Stack, Text, Title } from "@mantine/core"
import { UnitTypeIcons } from "@/assets"
import { Link } from "@/lib/i18n/navigation"
import { getUnitTypes } from "@/services/lists"

const UnitTypes = async () => {
  const unitTypes = await getUnitTypes()
  const t = await getTranslations("home.unit-types")
  return (
    <section>
      <div className="container mx-auto py-4">
        <div className="text-center">
          <Text mb={"xs"} className="max-md:text-sm" c={"primary"} fw={500}>
            {t("title")}
          </Text>
          <Title className="text-h3 md:text-h2">{t("desciption")}</Title>
        </div>
        <SimpleGrid
          cols={{ base: 2, md: 4 }}
          className="mx-auto mt-4 max-w-4xl md:mt-1.5"
        >
          {unitTypes.map((type) => {
            return (
              <Link
                className="rounded-md border border-[#F3F3F3]"
                key={type.id}
                href={`/units?unit_type=${type.id}`}
              >
                <Stack gap={"xs"} ta={"center"} py={"xl"}>
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
