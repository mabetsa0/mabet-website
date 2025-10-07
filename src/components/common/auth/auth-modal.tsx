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
import { parseAsString, useQueryStates } from "nuqs"
import VerifyOtp from "./verify-otp"
import { useTranslations } from "next-intl"

const AuthModal = () => {
  const [opened, { onClose }] = useAuthModal()
  const autoplay = useRef(Autoplay({ delay: 12000 }))
  const [phoneNumber] = useQueryStates({
    phonenumber: parseAsString.withDefault(""),
    country_code: parseAsString.withDefault(""),
  })
  const t = useTranslations("auth")
  return (
    <ModalDrawer
      title={t("title")}
      size={"992"}
      state={opened}
      onClose={onClose}
    >
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={"xl"}>
        <div className="md:rtl:pr-1.5 md:ltr:pl-1.5 py-2">
          {!phoneNumber.phonenumber ? <PhoneNumberForm /> : null}
          {phoneNumber.phonenumber ? <VerifyOtp /> : null}
        </div>
        <Carousel
          visibleFrom="md"
          classNames={{
            slide: "!h-full",
            container: "!h-full",
            root: " max-h-[70vh]",
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
