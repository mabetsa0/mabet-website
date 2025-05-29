/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { getBlogs } from "@/api/services/get-blogs"
import axios from "axios"

import Container from "@/components/blog/container"
import ErrorUi from "@/components/blog/error-ui"
import HeroPost from "@/components/blog/hero-post"
import Intro from "@/components/blog/intro"
import MoreStories from "@/components/blog/more-stories"
import Pagination from "@/components/blog/pagination"

export const dynamic = "force-dynamic"

const page = async () => {
  try {
    const response = await getBlogs()
    const blogs = response.data.posts
    if (!blogs || blogs.length === 0) {
      return (
        <Container>
          <Intro />
          <p className="py-2.5 text-center text-4xl">لا يوجد اي مقال حاليا</p>
        </Container>
      )
    }
    return (
      <Container>
        <Intro />
        <HeroPost {...blogs[0]} />
        <MoreStories posts={blogs.slice(1)} />
        <Pagination page={1} pageCount={response.data.last_page} />
      </Container>
    )
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return (
        <ErrorUi error={error.response?.data?.message || "حصلت مشكلة ما"} />
      )
    }
    if ("message" in error) {
      return <ErrorUi error={error.message} />
    }
    return <ErrorUi error={"حصلت مشكلة ما"} />
  }
}

export default page
