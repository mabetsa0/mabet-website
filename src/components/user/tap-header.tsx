import React from "react"

type Props = {
  children?: React.ReactNode
  title: string
  des: string
}

const UserTapHeader = ({ children, title, des }: Props) => {
  return (
    <div className="mb-6 flex items-center">
      <div className="grow">
        <h2 className="mb-2 text-xl font-bold text-customBlack md:text-2xl">
          {title}
        </h2>
        <p className="md:text-lg">{des}</p>
      </div>
      {children}
    </div>
  )
}

export default UserTapHeader
