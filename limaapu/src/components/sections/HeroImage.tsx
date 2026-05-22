'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface HeroImageProps {
  src: string
  alt?: string
}

export function HeroImage({ src, alt = 'Choiti Akter Lima' }: HeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5])

  return (
    <motion.div
      ref={containerRef}
      style={{ y, scale, rotate }}
      className="relative"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 }}
        className="relative"
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/30 via-accent-rust/20 to-transparent rounded-full blur-3xl animate-pulse-glow" />
          
          <motion.div
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-full h-full"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent-gold/40 to-accent-rust/40 blur-xl" />
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-accent-gold/30 shadow-2xl shadow-accent-gold/20">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                <defs>
                  <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c9a84c" />
                    <stop offset="50%" stopColor="#b87333" />
                    <stop offset="100%" stopColor="#c9a84c" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="url(#orbitGrad)"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
