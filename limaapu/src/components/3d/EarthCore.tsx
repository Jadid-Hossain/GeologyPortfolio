'use client'

import { motion } from 'framer-motion'

export function EarthCore() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <div className="w-full h-full rounded-full border border-accent-gold/20" />
      </motion.div>
      
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4"
      >
        <div className="w-full h-full rounded-full border border-accent-rust/20" />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8"
      >
        <div className="w-full h-full rounded-full border border-teal-500/20" />
      </motion.div>

      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-teal-900/50 via-earth-900/50 to-obsidian/50 backdrop-blur-sm border border-white/10" />

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-accent-gold/10 blur-3xl"
      />
    </div>
  )
}
