"use client"
import React, { useRef } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Carousel } from "@mantine/carousel"
import { SimpleGrid } from "@mantine/core"
import Autoplay from "embla-carousel-autoplay"
import { parseAsString, useQueryStates } from "nuqs"
import { loginImage1, loginImage2 } from "@/assets"
import { useAuthModal } from "@/hooks/use-auth-modal"
import ModalDrawer from "../modal-drawer"
import PhoneNumberForm from "./phone-number-form"
import VerifyOtp from "./verify-otp"

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
        <div className="py-2 md:ltr:pl-1.5 md:rtl:pr-1.5">
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
              className="h-full w-full object-cover"
              src={loginImage1}
              alt="login"
            />
          </Carousel.Slide>
          <Carousel.Slide className="!h-full">
            <Image
              className="h-full w-full object-cover"
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
