import { useRef } from "react"
import {
  ActionIcon,
  NumberInput,
  NumberInputHandlers,
  NumberInputProps,
} from "@mantine/core"
import { Minus, Plus } from "lucide-react"

export function CustomNumberInput(props: NumberInputProps) {
  const handlersRef = useRef<NumberInputHandlers>(null)
  return (
    <>
      <NumberInput
        size="lg"
        className="w-full"
        radius={"xl"}
        min={0}
        classNames={{
          input: "text-center",
          label: "!test-sm font-normal",
        }}
        handlersRef={handlersRef}
        {...props}
        rightSectionWidth={50}
        leftSection={
          <ActionIcon
            variant="transparent"
            onClick={() => {
              handlersRef.current?.decrement()
            }}
          >
            <Minus color="#767676" />
          </ActionIcon>
        }
        rightSection={
          <ActionIcon
            variant="transparent"
            onClick={() => {
              handlersRef.current?.increment()
            }}
          >
            <Plus color="#188078" />
          </ActionIcon>
        }
      />
    </>
  )
}
