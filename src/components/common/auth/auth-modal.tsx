"use client"
import { useAuthModal } from "@/hooks/use-auth-modal"
import React, { useRef } from "react"
import ModalDrawer from "../modal-drawer"
import { SimpleGrid } from "@mantine/core"
import { Carousel } from "@mantine/carousel"
import { loginImage1, loginImage2 } from "@/assets"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import PhoneNumberForm from "./phone-number-form"

const AuthModal = () => {
  const [opened, { onClose }] = useAuthModal()
  const autoplay = useRef(Autoplay({ delay: 12000 }))
  return (
    <ModalDrawer size={"xl"} state={opened} onClose={onClose}>
      <SimpleGrid cols={2} spacing={"lg"}>
        <div className="ps-1.5 py-2">
          <PhoneNumberForm />
        </div>
        <Carousel
          visibleFrom="md"
          classNames={{
            slide: "!h-full",
            container: "!h-full",
            root: "!h-full",
            viewport: "!h-full",
          }}
          slideSize={"100%"}
          withControls={false}
          plugins={[autoplay.current]}
        >
          <Carousel.Slide className="!h-full">
            <Image
              className="w-full h-full object-cover"
              src={loginImage1}
              alt="login"
            />
          </Carousel.Slide>
          <Carousel.Slide className="!h-full">
            <Image
              className="w-full h-full object-cover"
              src={loginImage2}
              alt="login"
            />
          </Carousel.Slide>
        </Carousel>
      </SimpleGrid>
    </ModalDrawer>
  )
}

export default AuthModal
