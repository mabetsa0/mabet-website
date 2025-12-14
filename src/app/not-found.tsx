"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "@/assets"
import { cn } from "@/lib/cn"
import "./globals.css"

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-white">
        <main>
          <div className="container flex h-screen items-center justify-center py-10">
            <div>
              <Image
                src={notFound}
                alt="not found"
                className="mx-auto h-[60vh]"
              />
              <div className="pt-2 text-center">
                <h1 className="mb-1 text-3xl font-bold">
                  404 - Page Not Found
                </h1>
                <p>The page you are looking for does not exist.</p>
              </div>

              <div className="mt-1">
                <Link
                  href="/ar"
                  className={cn(
                    `mx-auto block w-fit rounded-[50px] border border-[#35a89e] bg-[#35a89e] px-2 py-0.5 whitespace-nowrap text-white duration-150 hover:bg-white hover:text-[#35a89e] hover:shadow-md`
                  )}
                >
                  Back to home page
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
