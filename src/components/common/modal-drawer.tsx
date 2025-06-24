"use client"
import {
  Burger,
  Divider,
  Group,
  Modal,
  ModalBaseProps,
  ScrollArea,
} from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import React from "react"
import { Drawer } from "vaul"

type Props = {
  state: boolean
  onClose: () => void
  children: React.ReactNode
  size?: ModalBaseProps["size"]
  title?: string
}

const ModalDrawer = ({ state, children, onClose, size, title }: Props) => {
  const smallScreen = useMediaQuery("(max-width: 62em")

  if (smallScreen)
    return (
      <Drawer.Root
        repositionInputs={false}
        open={state}
        onClose={onClose}
        shouldScaleBackground
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed z-overlay inset-0 bg-black/40" />
          <Drawer.Content className=" z-max  max-h-[90vh] h-fit fixed bottom-0 left-0 right-0 outline-none">
            <div className="px-1 pb-1  overflow-hidden rounded-t-lg bg-white">
              <div className="flex justify-center pt-0.5">
                <div className="w-[90px] h-[4px] rounded bg-gray-300"></div>
              </div>
              <Drawer.Title className=" text-h5 font-bold">
                <Group align="center" gap={"sm"}>
                  <Drawer.Close>
                    <Burger component={"span"} opened size={"md"} />
                  </Drawer.Close>
                  {title}
                </Group>
              </Drawer.Title>
              <Divider />
              <ScrollArea className="h-[calc(100vh-130px)]">
                {children}
              </ScrollArea>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    )

  return (
    <Modal
      opened={state}
      onClose={onClose}
      size={size || "xl"}
      centered
      title={title}
      classNames={{
        title: "grow w-full text-h5 font-bold  text-center ",
        header: "px-2",
      }}
      radius={14}
      padding={0}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      {children}
    </Modal>
  )
}

export default ModalDrawer
