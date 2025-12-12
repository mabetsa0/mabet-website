"use client"
import React from "react"
import ChatList from "./chat-list"

type Props = {
  children: React.ReactNode
}

const Wrapper = ({ children }: Props) => {
  return (
    <main className="h-[calc(100vh-73px)]">
      <div className="flex h-full">
        <div className="min-w-[320px] border-e border-e-gray-100 lg:min-w-[390px] xl:min-w-[360px]">
          <ChatList />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </main>
  )
}

export default Wrapper
