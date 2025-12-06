"use client"
import { useTranslations } from "next-intl"
import ReactPlayer from "react-player"

type Props = {
  src: string
}

const VideoPlayer = ({ src }: Props) => {
  const t = useTranslations("video")

  // Handle empty or invalid URLs
  if (!src || src.trim() === "") {
    return (
      <div className="flex h-full items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-400">
            {t("invalid-url-title")}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {t("invalid-url-message")}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-900">
      <ReactPlayer
        width="100%"
        height="100%"
        style={{
          padding: "0 20px",
        }}
        controls
        src={src}
        onError={(error) => {
          console.error("Video player error:", error)
        }}
      />
    </div>
  )
}

export default VideoPlayer
