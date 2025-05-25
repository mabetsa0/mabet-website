import React from "react"
import { FullUnitData } from "../@types"
import Mabet from "@/services"
import { List, ListItem, SimpleGrid, Space, Stack } from "@mantine/core"
import { getTranslations } from "next-intl/server"

const UnitConditions = async (unit: FullUnitData) => {
  const terms = (
    await Mabet.get<{
      data: { terms: string[] }
      message: null
      success: boolean
    }>(`/units/${unit.id}/terms`)
  ).data.data.terms
  const t = await getTranslations()
  return (
    <Stack gap={"lg"}>
      <Space />
      <h3 className="text-h4 md:text-h3 font-medium">
        {t("unit.reservation-policy")}
      </h3>

      <SimpleGrid spacing={100} cols={{ base: 1, md: 2 }}>
        <Stack gap={"xs"}>
          <h5 className="text-h4 md:text-h5 font-medium">
            {t("unit.reservation-conditions")}
          </h5>
          <List className="text-[#767676] ">
            {terms.map((ele) => {
              return ele.split("\n").map((e, index) => {
                return (
                  <ListItem className="py-[2px]" key={index}>
                    {e}
                  </ListItem>
                )
              })
            })}
          </List>
        </Stack>
        <Stack gap={"xs"}>
          <h5 className="text-h4 md:text-h5 font-medium">
            {t("unit.cancellation_policy")}
          </h5>
          <List type="ordered" className="text-[#767676] list-decimal">
            {Object.values(unit.cancellation_policy).map((ele, index) => {
              return <ListItem key={index}>{ele}</ListItem>
            })}
          </List>
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}

export default UnitConditions
