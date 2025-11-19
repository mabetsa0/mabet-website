import { useSearchParams } from "next/navigation"
import { useForm } from "../search-contexts"
import { getInitialFormValues, transformFormValues } from "../utils"

/**
 * Custom hook for managing mobile search form state
 */
export const useMobileSearchForm = () => {
  const searchParams = useSearchParams()

  const form = useForm({
    mode: "controlled",
    initialValues: getInitialFormValues(searchParams),
    transformValues: transformFormValues,
  })

  return form
}
