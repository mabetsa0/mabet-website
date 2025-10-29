/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next"
import { getBlog } from "@/services/get-blog"
import { getBlogs } from "@/services/get-blogs"
import { getRelatedBlogs } from "@/services/get-related-blogs"
import { SEO } from "@/services/get-seo"
import axios from "axios"

import Container from "@/components/blog/container"
import ErrorUi from "@/components/blog/error-ui"
import Header from "@/components/blog/header"
import HeroPost from "@/components/blog/hero-post"
import Intro from "@/components/blog/intro"
import MoreStories from "@/components/blog/more-stories"
import Pagination from "@/components/blog/pagination"
import PostBody from "@/components/blog/post-body"
import PostHeader from "@/components/blog/post-header"
import SectionSeparator from "@/components/blog/section-separator"
import { ErrorResponse } from "@/@types/error"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = (await params).slug
  const isANumber = Number(slug)
  if (isNaN(isANumber)) {
    return await SEO("/blog/" + slug)
  }
  return {
    title: "المقالات",
  }
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  try {
    const slug = (await params).slug
    const isANumber = Number(slug)
    if (isNaN(isANumber)) {
      const [blog, moreBlogs] = await Promise.all([
        getBlog(slug),
        getRelatedBlogs(slug),
      ])
      return (
        <Container>
          <Header />
          <article>
            <PostHeader {...blog} />
            <PostBody content={blog.body} />
          </article>
          <SectionSeparator />
          <MoreStories posts={moreBlogs} />
        </Container>
      )
    }

    const response = await getBlogs({ page: parseInt(slug) })
    const blogs = response.data.posts
    if (!blogs || blogs.length === 0) {
      return (
        <Container>
          <Intro />
          <p className="py-2.5 text-center text-4xl">لا يوجد اي مقال حاليا</p>
          <Pagination pageCount={response.data.last_page} page={Number(slug)} />
        </Container>
      )
    }

    return (
      <Container>
        <Intro />
        <HeroPost {...blogs[0]} />
        <MoreStories posts={blogs.slice(1)} />
        <Pagination pageCount={response.data.last_page} page={Number(slug)} />
      </Container>
    )
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return (
        <ErrorUi
          error={
            (error.response?.data as ErrorResponse).errors?.[0] ||
            "حصلت مشكلة ما"
          }
        />
      )
    }
    if ("message" in error) {
      return <ErrorUi error={error.message} />
    }
    return <ErrorUi error={"حصلت مشكلة ما"} />
  }
}
