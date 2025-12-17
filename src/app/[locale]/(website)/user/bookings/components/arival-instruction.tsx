import Image from "next/image"
import { Card, Group, Stack, Text } from "@mantine/core"
import { heroBackground, mabetLogo } from "@/assets"
import { Booking } from "../@types"

type Props = { instructions: Booking["arrival_instructions"] }

const ArrivalInstructions = ({ instructions }: Props) => {
  return (
    <>
      {instructions.map((instruction, index) => {
        return (
          <Card key={index} withBorder className="border-primary bg-primary/15">
            <Group wrap="nowrap">
              <div className="shrink-0">
                <Image className="w-3" src={mabetLogo} alt="logo" />
              </div>
              <Stack gap={"xs"}>
                <Text className="text-h6 font-bold">{instruction.label}</Text>
                {instruction.content_type == "image" ? (
                  <Image
                    className="max-w-[350px]"
                    alt={instruction.label}
                    src={heroBackground}
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
