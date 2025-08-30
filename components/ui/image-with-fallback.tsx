"use client"

import { useState } from "react"
import Image from "next/image"
import { Logo } from "@/components/logo"

interface ImageWithFallbackProps {
  src: string | null | undefined
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  fallbackWidth?: number
  fallbackHeight?: number
  fallbackClassName?: string
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill = true,
  className = "",
  sizes,
  priority = false,
  fallbackWidth = 120,
  fallbackHeight = 120,
  fallbackClassName = "opacity-30"
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Show fallback if no src or error occurred
  if (!src || hasError) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background to-muted ${className}`}>
        <Logo 
          width={fallbackWidth} 
          height={fallbackHeight} 
          className={fallbackClassName} 
        />
      </div>
    )
  }

  return (
    <>
      {/* Loading placeholder */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 animate-pulse">
          <Logo 
            width={fallbackWidth} 
            height={fallbackHeight} 
            className="opacity-20" 
          />
        </div>
      )}
      
      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={className}
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
        style={{ 
          display: isLoading ? 'none' : 'block'
        }}
      />
    </>
  )
}