'use client'

import { motion } from 'framer-motion'

const layers = [
  { color: 'bg-mineral-obsidian', width: 'w-[120%]', speed: 0.3 },
  { color: 'bg-mineral-basalt', width: 'w-[110%]', speed: 0.4 },
  { color: 'bg-earth-900', width: 'w-[100%]', speed: 0.5 },
  { color: 'bg-earth-800', width: 'w-[95%]', speed: 0.6 },
  { color: 'bg-earth-700', width: 'w-[90%]', speed: 0.7 },
  { color: 'bg-earth-600', width: 'w-[85%]', speed: 0.8 },
  { color: 'bg-earth-500', width: 'w-[80%]', speed: 0.9 },
  { color: 'bg-earth-400', width: 'w-[75%]', speed: 1.0 },
]

export function StrataBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <div className="absolute inset-0 flex flex-col justify-center items-center gap-1 rotate-[-5deg]">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            className={`${layer.color} ${layer.width} h-2 md:h-3 rounded-full`}
            animate={{
              x: [0, 20, -20, 0],
              skewX: [0, 2, -2, 0],
            }}
            transition={{
              duration: 15 / layer.speed,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
