import { DirectionProvider, MantineProvider } from "@mantine/core"
import theme from "./theme"

export default function MyMantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </DirectionProvider>
  )
}
