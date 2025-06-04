import { useMediaQuery } from "@mantine/hooks"

const useMdScreen = () => {
  const matches = useMediaQuery("(max-width: 62em)")
  return matches || false
}

export default useMdScreen
