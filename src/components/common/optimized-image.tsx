"use client"

import { useEffect, useRef, useState, type ImgHTMLAttributes } from "react"
import { cn } from "@/lib/cn"

export interface OptimizedImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "loading" | "src" | "alt"
> {
  /**
   * Image source URL
   */
  src: string
  /**
   * Alt text for the image
   */
  alt: string
  /**
   * Whether to enable lazy loading (default: true)
   * When false, image loads immediately
   */
  lazy?: boolean
  /**
   * Whether the image should load immediately (overrides lazy)
   * Useful for above-the-fold images
   */
  priority?: boolean
  /**
   * Custom loading placeholder component or className
   * If string, will be used as className for skeleton div
   * If ReactNode, will be rendered as placeholder
   */
  placeholder?: React.ReactNode | string
  /**
   * Root margin for Intersection Observer (default: "50px")
   * Use to start loading images before they enter viewport
   */
  rootMargin?: string
  /**
   * Callback fired when image starts loading
   */
  onLoadStart?: () => void
  /**
   * Callback fired when image loads successfully
   */
  onLoadComplete?: () => void
  /**
   * Callback fired when image fails to load
   */
  onLoadError?: (error: Error) => void
  /**
   * Whether to show error state on load failure
   */
  showErrorState?: boolean
  /**
   * Custom error component or className
   */
  errorPlaceholder?: React.ReactNode | string
}

/**
 * OptimizedImage - A performant image component with lazy loading
 *
 * Features:
 * - Intersection Observer based lazy loading
 * - Automatic loading priority management
 * - Loading skeleton placeholder
 * - Error handling
 * - All standard img tag optimizations (decoding, fetchPriority, etc.)
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/image.jpg"
 *   alt="Description"
 *   className="w-full h-full object-cover"
 *   priority={index === 0}
 * />
 * ```
 */
const OptimizedImage = ({
  src,
  alt,
  lazy = true,
  priority = false,
  placeholder,
  rootMargin = "50px",
  onLoadStart,
  onLoadComplete,
  onLoadError,
  showErrorState = true,
  errorPlaceholder,
  className,
  fetchPriority,
  decoding = "async",
  draggable = false,
  sizes,
  ...props
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [shouldLoad, setShouldLoad] = useState(priority || !lazy)
  const imgRef = useRef<HTMLImageElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    // If priority or lazy is disabled, load immediately
    if (priority || !lazy || shouldLoad) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    )

    const currentContainer = containerRef.current
    if (currentContainer) {
      observer.observe(currentContainer)
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer)
      }
      observer.disconnect()
    }
  }, [lazy, priority, rootMargin, shouldLoad])

  // Handle image load
  useEffect(() => {
    if (!shouldLoad) return

    const img = imgRef.current
    if (!img) return

    // Check if image is already loaded (cached)
    if (img.complete && img.naturalHeight !== 0) {
      setIsLoaded(true)
      setIsLoading(false)
      onLoadComplete?.()
      return
    }

    setIsLoading(true)
    onLoadStart?.()

    const handleLoad = () => {
      setIsLoaded(true)
      setIsLoading(false)
      onLoadComplete?.()
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      const error = new Error(`Failed to load image: ${src}`)
      onLoadError?.(error)
    }

    img.addEventListener("load", handleLoad)
    img.addEventListener("error", handleError)

    return () => {
      img.removeEventListener("load", handleLoad)
      img.removeEventListener("error", handleError)
    }
  }, [shouldLoad, src, onLoadStart, onLoadComplete, onLoadError])

  // Determine fetch priority
  const imageFetchPriority: "high" | "auto" | "low" | undefined =
    fetchPriority || (priority ? "high" : "auto")

  // Default placeholder
  const defaultPlaceholder = (
    <div
      className={cn(
        "animate-pulse bg-gray-200",
        typeof placeholder === "string" ? placeholder : ""
      )}
    />
  )

  // Render placeholder
  const renderPlaceholder = () => {
    if (typeof placeholder === "string") {
      return (
        <div
          className={cn("h-full w-full animate-pulse bg-gray-200", placeholder)}
        />
      )
    }
    if (placeholder) {
      return <div className="h-full w-full">{placeholder}</div>
    }
    return <div className="h-full w-full">{defaultPlaceholder}</div>
  }

  // Render error state
  const renderError = () => {
    if (typeof errorPlaceholder === "string") {
      return (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-gray-100 text-gray-400",
            errorPlaceholder
          )}
        >
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )
    }
    if (errorPlaceholder) {
      return <div className="h-full w-full">{errorPlaceholder}</div>
    }
    return <div className="h-full w-full">{defaultPlaceholder}</div>
  }

  const showPlaceholder = !isLoaded && !hasError && (!shouldLoad || isLoading)

  return (
    <div ref={containerRef} className="relative">
      {/* Loading placeholder */}
      {showPlaceholder && (
        <div className={cn("absolute inset-0", className)}>
          {renderPlaceholder()}
        </div>
      )}

      {/* Error state */}
      {hasError && showErrorState && (
        <div className={cn("absolute inset-0", className)}>{renderError()}</div>
      )}

      {/* Actual image */}
      {shouldLoad && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          decoding={decoding}
          fetchPriority={imageFetchPriority}
          draggable={draggable}
          sizes={sizes}
          className={cn(
            className,
            !isLoaded && "opacity-0",
            isLoaded && "opacity-100 transition-opacity duration-300",
            hasError && "hidden"
          )}
          {...props}
        />
      )}
    </div>
  )
}

export default OptimizedImage
