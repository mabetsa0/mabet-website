import { Button, Group, SimpleGrid, Text, Title } from "@mantine/core"
import { getLocale, getTranslations } from "next-intl/server"
import { getBlogs } from "../helpers/get-blogs"
import BlogCard from "./blog-card"
import Link from "next/link"

const Blogs = async () => {
  try {
    const locale = await getLocale()
    if (locale === "en") return null
    const t = await getTranslations("home.blogs")
    const blogs = (await getBlogs()).data.posts
    return (
      <section>
        <div className="container py-4.5 mx-auto">
          <div className="text-center flex flex-col gap-[4px] mb-1.5">
            <Text className="max-md:text-sm" c={"primary"} fw={500}>
              {t("title")}
            </Text>
            <Title className=" text-h3 md:text-h2">{t("desciption")}</Title>
            <Text c={"#767676"} mx={"auto"} maw={425}>
              {t("sub-description")}
            </Text>
          </div>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
            {blogs.slice(0, 3).map((blog) => {
              return <BlogCard key={blog.id} {...blog} />
            })}
          </SimpleGrid>
          <Group justify="center" className="mt-3">
            <Link href={"/blog"}>
              <Button className="px-5">{t("go-to-blog")}</Button>
            </Link>
          </Group>
        </div>
      </section>
    )
  } catch (error) {
    console.log("🚀 ~ Blogs ~ error:", error)
    return null
  }
}

export default Blogs
