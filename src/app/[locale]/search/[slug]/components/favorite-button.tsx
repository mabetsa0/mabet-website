"use client"
import { ActionIcon, Button } from "@mantine/core"
import React from "react"
import { useUnitData } from "../context/unit-context"
import useFavorite from "@/hooks/use-favorite"
import { Heart } from "lucide-react"
import { useTranslations } from "next-intl"

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
            fill={isFavorite ? "red" : "white"}
            color={isFavorite ? "red" : "white"}
          />
        }
        visibleFrom="lg"
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
        variant="outline"
        color="dark"
        className="border-[#F3F3F3]"
        size={"lg"}
        loading={isPending}
        onClick={() => mutate()}
      >
        <Heart
          fill={isFavorite ? "red" : "white"}
          color={isFavorite ? "red" : "white"}
        />
      </ActionIcon>
    </>
  )
}

export default FavoriteButton
