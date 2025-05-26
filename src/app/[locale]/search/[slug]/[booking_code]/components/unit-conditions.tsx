import Mabet from "@/services"
import { List, ListItem, Space, Stack } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useUnitData } from "../../context/unit-context"
import { FileSpreadsheet, MessageSquareX } from "lucide-react"

const UnitConditions = () => {
  const unit = useUnitData()
  const { data: terms } = useQuery({
    queryKey: [unit.id, "terms"],
    queryFn: async () => {
      return (
        await Mabet.get<{
          data: { terms: string[] }
          message: null
          success: boolean
        }>(`/units/${unit.id}/terms`)
      ).data.data.terms
    },
  })
  const t = useTranslations()
  return (
    <Stack gap={"lg"}>
      <Space />
      <h3 className="text-h4 md:text-h3 font-bold">
        {t("unit.reservation-policy")}
      </h3>

      <Stack gap="xl">
        <Stack gap={"xs"}>
          <h5 className="text-h4 md:text-h5 font-medium">
            <FileSpreadsheet
              className="inline-block me-0.5"
              strokeWidth={1.25}
            />
            {t("unit.reservation-conditions")}
          </h5>
          <List className="text-[#767676] ">
            {terms?.map((ele) => {
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
            <MessageSquareX
              className="inline-block me-0.5"
              strokeWidth={1.25}
            />
            {t("unit.cancellation_policy")}
          </h5>
          <List type="ordered" className="text-[#767676] list-decimal">
            {Object.values(unit.cancellation_summary.data).map((ele, index) => {
              return <ListItem key={index}>{ele.title}</ListItem>
            })}
          </List>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default UnitConditions
