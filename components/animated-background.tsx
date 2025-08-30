"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export function AnimatedBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  const isDark = resolvedTheme === 'dark'
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient overlay */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
            : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
        }`} 
      />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0">
        {/* Large floating circles */}
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl transition-all duration-1000 ${
            isDark 
              ? 'opacity-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' 
              : 'opacity-35 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
          }`}
          style={{
            animation: reducedMotion ? 'none' : 'float-slow 6s ease-in-out infinite alternate',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        />
        
        <div
          className={`absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl transition-all duration-1000 ${
            isDark 
              ? 'opacity-18 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500' 
              : 'opacity-30 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400'
          }`}
          style={{
            animation: reducedMotion ? 'none' : 'float-slow 8s ease-in-out infinite alternate-reverse',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        />

        {/* Medium geometric shapes */}
        {/* Hexagon */}
        <div
          className={`absolute top-1/2 left-3/4 w-64 h-64 blur-2xl transition-all duration-1000 ${
            isDark 
              ? 'opacity-12 bg-gradient-to-r from-amber-500 to-orange-500' 
              : 'opacity-22 bg-gradient-to-r from-amber-400 to-orange-400'
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            animation: reducedMotion ? 'none' : 'float-medium 7s ease-in-out infinite alternate',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        />

        {/* Triangle */}
        <div
          className={`absolute top-1/6 right-1/3 w-52 h-52 blur-2xl transition-all duration-1000 ${
            isDark 
              ? 'opacity-11 bg-gradient-to-r from-rose-500 to-pink-500' 
              : 'opacity-20 bg-gradient-to-r from-rose-400 to-pink-400'
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animation: reducedMotion ? 'none' : 'float-medium 9s ease-in-out infinite alternate-reverse',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        />

        {/* Diamond */}
        <div
          className={`absolute bottom-1/4 left-1/6 w-48 h-48 blur-xl transition-all duration-1000 ${
            isDark 
              ? 'opacity-13 bg-gradient-to-r from-indigo-500 to-purple-500' 
              : 'opacity-24 bg-gradient-to-r from-indigo-400 to-purple-400'
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            animation: reducedMotion ? 'none' : 'float-medium 6s ease-in-out infinite alternate',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        />

        {/* Star/Cross shape */}
        <div
          className={`absolute top-2/3 left-1/2 w-40 h-40 blur-xl transition-all duration-1000 ${
            isDark 
              ? 'opacity-10 bg-gradient-to-r from-teal-500 to-cyan-500' 
              : 'opacity-19 bg-gradient-to-r from-teal-400 to-cyan-400'
          }`}
          style={{
            clipPath: 'polygon(40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%, 60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%, 0% 40%, 40% 40%)',
            animation: reducedMotion ? 'none' : 'float-medium 8s ease-in-out infinite alternate-reverse',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        />

        {/* Pentagon */}
        <div
          className={`absolute top-1/8 left-1/8 w-56 h-56 blur-2xl transition-all duration-1000 ${
            isDark 
              ? 'opacity-9 bg-gradient-to-r from-violet-500 to-purple-500' 
              : 'opacity-18 bg-gradient-to-r from-violet-400 to-purple-400'
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            animation: reducedMotion ? 'none' : 'float-medium 10s ease-in-out infinite alternate',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        />

        {/* Rhombus */}
        <div
          className={`absolute bottom-1/6 right-1/8 w-44 h-44 blur-xl transition-all duration-1000 ${
            isDark 
              ? 'opacity-8 bg-gradient-to-r from-lime-500 to-emerald-500' 
              : 'opacity-17 bg-gradient-to-r from-lime-400 to-emerald-400'
          }`}
          style={{
            clipPath: 'polygon(50% 0%, 90% 50%, 50% 100%, 10% 50%)',
            animation: reducedMotion ? 'none' : 'float-medium 11s ease-in-out infinite alternate-reverse',
            willChange: reducedMotion ? 'auto' : 'transform',
          }}
        />

        {/* Small accent shapes with fixed positions */}
        {Array.from({ length: 8 }).map((_, i) => {
          const shapes = [
            '50%', // circle
            '20px', // rounded square
            'polygon(50% 0%, 0% 100%, 100% 100%)', // triangle
            'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', // diamond
            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', // octagon
          ]
          const shapeIndex = i % shapes.length
          const selectedShape = shapes[shapeIndex]
          
          // Fixed positions and sizes to avoid hydration mismatch
          const positions = [
            { width: 60, height: 60, left: '15%', top: '20%', rotate: 45 },
            { width: 80, height: 80, left: '85%', top: '30%', rotate: 120 },
            { width: 70, height: 70, left: '25%', top: '80%', rotate: 210 },
            { width: 50, height: 50, left: '75%', top: '70%', rotate: 300 },
            { width: 65, height: 65, left: '5%', top: '60%', rotate: 90 },
            { width: 75, height: 75, left: '95%', top: '10%', rotate: 180 },
            { width: 55, height: 55, left: '45%', top: '15%', rotate: 270 },
            { width: 85, height: 85, left: '60%', top: '85%', rotate: 30 }
          ]
          
          const pos = positions[i]
          
          return (
            <div
              key={i}
              className={`absolute blur-lg transition-all duration-1000 ${
                isDark 
                  ? 'opacity-8 bg-gradient-to-r from-violet-500 to-purple-500' 
                  : 'opacity-16 bg-gradient-to-r from-violet-400 to-purple-400'
              }`}
              style={{
                width: pos.width + 'px',
                height: pos.height + 'px',
                left: pos.left,
                top: pos.top,
                borderRadius: selectedShape.includes('polygon') ? '0' : selectedShape,
                clipPath: selectedShape.includes('polygon') ? selectedShape : 'none',
                transform: `rotate(${pos.rotate}deg)`,
                animation: reducedMotion ? 'none' : `float-small-${i % 6} ${4 + (i % 3)}s ease-in-out infinite alternate`,
                willChange: reducedMotion ? 'auto' : 'transform',
              }}
            />
          )
        })}
      </div>
      
      {/* Subtle pattern overlay for texture */}
      <div 
        className={`absolute inset-0 opacity-5 transition-opacity duration-500 ${
          isDark ? 'opacity-3' : 'opacity-5'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${isDark ? '#3b82f6' : '#60a5fa'} 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, ${isDark ? '#8b5cf6' : '#a78bfa'} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }}
      />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(40px, -30px) rotate(8deg) scale(1.08); }
          50% { transform: translate(-20px, 40px) rotate(-5deg) scale(0.92); }
          75% { transform: translate(-30px, -15px) rotate(12deg) scale(1.05); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          25% { transform: translate(-35px, 25px) rotate(18deg) scale(1.1); }
          50% { transform: translate(30px, -20px) rotate(-12deg) scale(0.9); }
          75% { transform: translate(15px, 30px) rotate(25deg) scale(1.05); }
        }
        
        @keyframes float-small-0 {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(20px, -20px) rotate(45deg); }
        }
        @keyframes float-small-1 {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(-15px, 25px) rotate(-30deg); }
        }
        @keyframes float-small-2 {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(30px, 15px) rotate(60deg); }
        }
        @keyframes float-small-3 {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(-20px, -18px) rotate(-45deg); }
        }
        @keyframes float-small-4 {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(25px, 22px) rotate(30deg); }
        }
        @keyframes float-small-5 {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(-18px, 28px) rotate(-60deg); }
        }
      `}</style>
    </div>
  )
}