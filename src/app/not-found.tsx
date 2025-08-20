"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "@/assets"

import "./globals.css"
import { cn } from "@/lib/cn"

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-white">
        <main>
          <div className="container flex h-[100vh] items-center justify-center py-10">
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
                    ` block px-2 bg-[#35a89e] py-0.5 rounded-[50px] whitespace-nowrap text-white hover:bg-white hover:text-[#35a89e] duration-150 hover:shadow-md  border border-[#35a89e]  mx-auto w-fit   `
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
