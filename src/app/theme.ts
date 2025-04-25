"use client"
import { Button, createTheme } from "@mantine/core"

const theme = createTheme({
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },
  colors: {
    primary: [
      "#eefcfb",
      "#def6f4",
      "#b7ede9",
      "#8ee4dd",
      "#6fddd3",
      "#5dd8cd",
      "#188078",
      "#42bdb2",
      "#35a89e",
      "#1b9289",
    ],
  },
  primaryColor: "primary",
  defaultRadius: "8px",
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "primary",
        size: "md",
      },
    }),
  },
})

export default theme
