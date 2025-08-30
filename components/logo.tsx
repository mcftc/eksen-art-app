"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export function Logo({ width = 120, height = 120, className = "" }: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return (
      <div 
        className={`${className}`}
        style={{ width, height }}
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <div className={`${className}`} style={{ width, height }}>
      <svg 
        version="1.2" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1080 1080" 
        width={width} 
        height={height}
        className="transition-colors duration-300"
      >
        {/* Define styles based on theme */}
        <style jsx>{`
          .logo-primary {
            fill: ${isDark ? '#f1f5f9' : '#1e293b'};
            transition: fill 0.3s ease;
          }
          .logo-secondary {
            fill: ${isDark ? '#ffffff' : '#334155'};
            transition: fill 0.3s ease;
          }
        `}</style>
        
        {/* Main logo paths with theme-aware colors */}
        <path 
          fillRule="evenodd" 
          className="logo-primary" 
          d="m418.2 564.9h-81.4q0.6 13.1 5.3 21.4 4.7 8.4 13.3 13.5 8.7 5.1 18.4 5.1 13.9 0 23.9-9.1 4.4-3.9 9.6-12.7l7.9 4.7q-14.5 25.7-42 25.7-22.3 0-35.4-16.5-11-13.6-11-32.8 0-21.3 13.2-35.9 12.7-14 33-14 20 0 32.4 13.9 12.3 13.8 12.8 36.7zm-10.6-8.8q-2-10.7-6.9-17.8-4.8-7.1-12.3-11.2-7.6-4.2-15.7-4.2-13.2 0-23.1 9.3-9.9 9.4-12.1 23.9z"
        />
        <path 
          className="logo-primary" 
          d="m444.1 441.8v114.6l38.6-40.1h12.4l-39.9 41 53.1 53.7h-12.8l-46.5-46.9-4.9 4.9v42h-9.3v-169.2z"
        />
        <path 
          className="logo-primary" 
          d="m565.5 529.7l-7.9 3.9q-5.8-10.7-16.2-10.7-6.7 0-11.5 4.5-4.8 4.4-4.8 10.7 0 6.2 5.2 10.2 4 3 13.2 6.5 13.4 5.1 18.2 8.6 9.3 7.1 9.3 20.1 0 14.7-10.3 23.1-8.5 6.9-20.4 6.9-12 0-20.5-6.5-8.4-6.5-12-18.5l8.9-2.9q6.8 19.3 23.3 19.3 10.5 0 16.5-7.5 4.8-5.9 4.8-13.5 0-7.2-3.9-11.4-3.9-4.1-14.2-7.8-15.5-5.7-21.6-11.5-6.1-5.7-6.1-14.7 0-11.4 8.7-18.3 7.5-5.9 16.7-5.9 8 0 14.3 3.9 6.2 3.9 10.3 11.5z"
        />
        <path 
          fillRule="evenodd" 
          className="logo-primary" 
          d="m670.6 564.9h-81.3q0.6 13.1 5.2 21.4 4.8 8.4 13.4 13.5 8.7 5.1 18.3 5.1 14 0 23.9-9.1 4.4-3.9 9.7-12.7l7.9 4.7q-14.5 25.7-42 25.7-22.3 0-35.5-16.5-11-13.6-11-32.8 0-21.3 13.3-35.9 12.7-14 32.9-14 20.1 0 32.4 13.9 12.4 13.8 12.8 36.7zm-10.5-8.8q-2-10.7-6.9-17.8-4.9-7.1-12.4-11.2-7.5-4.2-15.6-4.2-13.2 0-23.1 9.3-10 9.4-12.1 23.9z"
        />
        <path 
          className="logo-primary" 
          d="m688.3 516.3h9.3v14.7q4.4-6.8 8.5-9.9 8.5-6.8 20.3-6.8 11.4 0 19.9 6.3 6 4.5 8.5 11.5 2.5 6.9 2.5 19.2v59.7h-9.3v-59.7q0-13.5-3.4-19.2-5.4-9.2-19.4-9.2-15.3 0-22.6 12.9-2.9 5-3.9 10.6-1.1 5.6-1.1 15.3v49.3h-9.3z"
        />
        <path 
          fillRule="evenodd" 
          className="logo-primary" 
          d="m854 513.4h22.6v97.6h-22.6v-10.2q-5.5 5.2-9.7 7.7-8.8 5.4-20.2 5.4-21.4 0-35-16.4-11.6-14-11.6-35.5 0-23.8 14.6-38.2 13.3-13 31.4-13 13.8 0 24.2 8 2.6 2 6.3 6zm-26.4 17.7q-12.4 0-19.9 9.5-7.2 9.1-7.2 21.4 0 15.3 9.1 24.6 7.2 7.1 17.8 7.1 13.6 0 21.5-10.1 6.5-8.2 6.5-21.2 0-14.9-8.6-23.5-7.7-7.8-19.2-7.8z"
        />
        <path 
          className="logo-primary" 
          d="m895.7 513.4h22.6v8.7q5.7-6 9.7-8.3 5.7-3.1 12.9-3.1 8.8 0 18.6 5.8l-10.4 20.7q-6.5-4.7-12.4-4.7-8.9 0-13.7 6.5-4.7 6.3-4.7 21.5v50.5h-22.6z"
        />
        <path 
          className="logo-primary" 
          d="m993.7 534.4v76.6h-22.5v-76.6h-9.7v-21h9.7v-35.7h22.5v35.7h17.4v21z"
        />
        
        {/* Logo symbol/icon with enhanced theme colors */}
        <path 
          fillRule="evenodd" 
          className="logo-secondary" 
          d="m68.9 637.9c10.4-14.1 20.3-27.4 30.1-40.8-27.9-28.9-25.1-68.5-6.9-93.1 17.3-23.4 53.7-39.1 90.8-20.4q7-9.4 14-18.9c4.1-5.5 8.6-10.8 12.2-16.6 2.8-4.5 6.2-5.2 10.9-4.1 0 64.5 0 129 0 193.7-6.6 0-13.1 0-20 0 0-13.4 0-26.9 0-41.1-25.8 22.9-53.7 26.8-84.6 12.8-5.2 6.9-10.8 13.6-15.5 21-3.7 6-8.1 8.5-15.1 7.6-4.9-0.6-10.1-0.1-15.9-0.1zm131-141.4q-0.5-0.2-0.9-0.3c-23.6 32-47.3 64-71.1 96.2 6.7 3.2 13.3 4.7 20.1 4.8 27.7 0.5 50.6-21 51.7-48.7 0.3-6.8 0.2-13.6 0.2-20.3q0-15.9 0-31.7zm-88.2 83.5c19.5-26.4 39-52.8 58.6-79.2-18.7-9.8-46.5-5.4-62 15.8-15.5 21.2-11 49 3.4 63.4z"
        />
      </svg>
    </div>
  )
}