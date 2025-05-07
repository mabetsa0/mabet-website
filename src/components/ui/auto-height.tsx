import { ElementRef, useEffect, useRef, useState } from "react"
import AnimateHeight, { AnimateHeightProps, Height } from "react-animate-height"

const AutoHeight = ({
  children,
  ...props
}: { children: React.ReactNode } & Omit<AnimateHeightProps, "height">) => {
  const [height, setHeight] = useState<Height>("auto")
  const contentDiv = useRef<ElementRef<"div">>(null)

  useEffect(() => {
    const element = contentDiv.current

    const resizeObserver = new ResizeObserver(() => {
      setHeight(element!.clientHeight)
    })

    resizeObserver.observe(element!)

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <AnimateHeight
      className="!overflow-visible"
      {...props}
      height={height}
      contentRef={contentDiv}
      disableDisplayNone
    >
      {children}
    </AnimateHeight>
  )
}

export default AutoHeight
