import { StaticImageData } from "next/image"

type NavItemType = {
  title: string
  link: {
    pathname: string
    query: { type: string; q: string }
  }
}

// home page

// hero section slider cards props
type heroSectionContentType = {
  image: StaticImageData
  ar: {
    link: string
    content: { size: "lg" | "sm" | "base"; title: string }[]
  }
  en: {
    link: string
    content: { size: "lg" | "sm" | "base"; title: string }[]
  }
}[]
type OptionType = {
  label: string
  id: string | number
  value: string
  slug?: string
}




export type { NavItemType, OptionType, heroSectionContentType }
