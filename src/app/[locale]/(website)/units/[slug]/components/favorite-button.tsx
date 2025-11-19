"use client"
import React from "react"
import { useTranslations } from "next-intl"
import { ActionIcon, Button } from "@mantine/core"
import { Heart } from "lucide-react"
import useFavorite from "@/hooks/use-favorite"
import { useUnitData } from "../context/unit-context"

const FavoriteButton = () => {
  const unit = useUnitData()
  const { mutate, isPending, isFavorite } = useFavorite({
    is_favourite: unit.is_favourite,
    id: unit.id,
  })
  const t = useTranslations()

  return (
    <>
      <Button
        leftSection={
          <Heart
            strokeWidth={1.25}
            fill={isFavorite ? "red" : "white"}
            color={isFavorite ? "red" : "black"}
          />
        }
        visibleFrom="md"
        variant="outline"
        color="dark"
        className="border-[#F3F3F3]"
        loading={isPending}
        onClick={() => {
          mutate()
        }}
      >
        {t("general.favorite.button")}
      </Button>
      <ActionIcon
        hiddenFrom="md"
        color="white"
        c={"dark"}
        size={"xl"}
        radius={"xl"}
        className="hover:bg-white/70"
        loading={isPending}
        onClick={() => mutate()}
      >
        <Heart
          size={28}
          strokeWidth={1.25}
          fill={isFavorite ? "red" : "transparent"}
          color={isFavorite ? "red" : "black"}
        />
      </ActionIcon>
    </>
  )
}

export default FavoriteButton
