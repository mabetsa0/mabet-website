import { useTranslations } from "next-intl"
import { Card, SimpleGrid, Space, Stack, Text } from "@mantine/core"
import { Clock, Mail, Smartphone } from "lucide-react"
import ContactForm from "./components/contact-form"

const Page = () => {
  const t = useTranslations()

  const contactInfo = [
    {
      icon: Smartphone,
      content: "+966-567570014",
      type: "phone",
    },
    {
      icon: Mail,
      content: "help@mabet.com.sa",
      type: "mail",
    },
    {
      icon: Clock,
      content: t("general.working-time"),
    },
  ]

  return (
    <Stack>
      <Stack>
        <Text className="text-h3 md:text-h2 font-bold">
          {t("user.contact.title")}
        </Text>
        <Text className="md:text-lg">{t("user.contact.description")}</Text>
      </Stack>

      <Space />

      <Stack>
        <Text className="text-h4 font-bold">
          {t("user.contact.customer-services")}
        </Text>
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {contactInfo.map((ele, index) => {
            return (
              <Card
                p={"xs"}
                key={index}
                withBorder
                className="border-[#F3F3F3]"
              >
                <div className="text-primary bg-primary/15 mb-0.5 flex aspect-square w-3.5 shrink-0 items-center justify-center rounded-lg">
                  <ele.icon size={28} strokeWidth={1.2} />
                </div>

                {ele.type === "phone" ? (
                  <Text
                    component="a"
                    href={`tel:${ele.content}`}
                    dir="ltr"
                    className="text-h5 font-medium rtl:text-right"
                  >
                    {ele.content}
                  </Text>
                ) : ele.type === "mail" ? (
                  <Text
                    component="a"
                    href={`mail:${ele.content}`}
                    dir="ltr"
                    className="text-h5 font-medium rtl:text-right"
                  >
                    {ele.content}
                  </Text>
                ) : (
                  <Text
                    dir="ltr"
                    className="text-h5 font-medium rtl:text-right"
                  >
                    {ele.content}
                  </Text>
                )}
              </Card>
            )
          })}
        </SimpleGrid>
      </Stack>
      <Space />
      <ContactForm />
    </Stack>
  )
}

export default Page
