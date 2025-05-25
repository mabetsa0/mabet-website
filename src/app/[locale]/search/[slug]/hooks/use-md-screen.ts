import { useMediaQuery } from "@mantine/hooks"

const useMdScreen = () => {
  const matches = useMediaQuery("(max-width: 62em)")
  return matches
}

export default useMdScreen
