"use client"
import { Button, createTheme, rem } from "@mantine/core"

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
  black: "#020A0A",
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
  headings: {
    fontFamily: "var(--font)",
    sizes: {
      h1: {
        fontSize: rem(52),
        lineHeight: "110%",
      },
      h2: {
        fontSize: rem(40),
        lineHeight: "110%",
      },
      h3: {
        fontSize: rem(28),
        lineHeight: "110%",
      },
      h4: {
        fontSize: rem(24),
        lineHeight: "150%",
      },
      h5: {
        fontSize: rem(24),
        lineHeight: "150%",
      },
    },
  },
})

export default theme
