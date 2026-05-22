'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Canvas3D } from '@/components/3d/Canvas3D'
import { EarthCore } from '@/components/3d/EarthCore'
import { ParticleField } from '@/components/3d/ParticleField'
import { HeroImage } from '@/components/sections/HeroImage'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { ArrowDown, Layers, Mountain, Globe2, Droplets } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]" />
      
      <div className="absolute inset-0">
        <Canvas3D className="absolute inset-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <EarthCore />
          </div>
          <ParticleField count={50} color="#c9a84c" />
        </Canvas3D>
      </div>

      <div className="absolute inset-0 bg-noise opacity-20" />

      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <AnimatedSection direction="left" delay={0.3}>
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
                >
                  <Layers className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm text-earth-300">Geologist | PhD Researcher</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
                >
                  <span className="text-white">Choiti Akter</span>
                  <br />
                  <span className="text-gradient">Lima</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="text-lg md:text-xl text-earth-300 max-w-xl mb-8 leading-relaxed"
                >
                  Studying reservoir systems and subsurface geology to improve understanding of 
                  CO₂ storage, hydrocarbon reservoirs, and future energy resources.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  <Link
                    href="/research"
                    className="group px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-rust rounded-full text-white font-medium hover:shadow-lg hover:shadow-accent-gold/30 transition-all duration-300"
                  >
                    Explore Research
                    <ArrowDown className="inline-block ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" />
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border border-earth-600 rounded-full text-earth-300 hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
                  >
                    Get in Touch
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="mt-12 grid grid-cols-3 gap-6"
                >
                  {[
                    { icon: Mountain, label: 'Fieldwork', value: '7+ Expeditions' },
                    { icon: Globe2, label: 'Research', value: 'CO₂ Storage' },
                    { icon: Droplets, label: 'Industry', value: 'Chevron' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center lg:text-left">
                      <stat.icon className="w-6 h-6 text-accent-gold mx-auto lg:mx-0 mb-2" />
                      <p className="text-white font-semibold">{stat.value}</p>
                      <p className="text-earth-400 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.6}>
              <HeroImage src="/images/lima-hero.jpg" alt="Choiti Akter Lima" />
            </AnimatedSection>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Link href="/about" className="flex flex-col items-center gap-2 text-earth-400 hover:text-accent-gold transition-colors">
            <span className="text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
