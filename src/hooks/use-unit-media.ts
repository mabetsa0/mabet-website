import { useQuery } from "@tanstack/react-query"
import { UnitMediaResponse } from "@/@types/unit-media"
import Mabet from "@/services"

type Props = {
  unitId: number
  type: "videos" | "images"
}

const useUnitMedia = ({ unitId, type }: Props) => {
  const query = useQuery({
    queryKey: ["video", unitId],
    enabled: !!unitId,
    queryFn: async () => {
      const response = await Mabet.get<UnitMediaResponse>(
        `/units/${unitId}/media`,
        {
          params: {
            type,
          },
        }
      )
      return response.data.data.media
    },
  })

  return query
}

export default useUnitMedia
