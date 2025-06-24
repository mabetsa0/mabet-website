import React from "react"
import { Booking } from "../@types"
import { Card, Group, Image, Stack, Text } from "@mantine/core"
import { heroBackground, logoWithoutWindows, mabetLogo } from "@/assets"

type Props = { instructions: Booking["arrival_instructions"] }

const ArrivalInstructions = ({ instructions }: Props) => {
  return (
    <>
      {instructions.map((instruction, index) => {
        return (
          <Card key={index} withBorder className="border-primary bg-primary/15">
            <Group wrap="nowrap">
              <div className="shrink-0">
                <img className="w-3 " src={mabetLogo.src} alt="logo" />
              </div>
              <Stack gap={"xs"}>
                <Text className="text-h5 font-bold">{instruction.label}</Text>
                {instruction.content_type == "image" ? (
                  <Image
                    maw={350}
                    alt={instruction.label}
                    src={heroBackground.src}
                  />
                ) : (
                  <Text className="text-primary">{instruction.content}</Text>
                )}
              </Stack>
            </Group>
          </Card>
        )
      })}
    </>
  )
}

export default ArrivalInstructions
