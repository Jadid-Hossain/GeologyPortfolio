'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { supabase } from '@/lib/supabase'
import type { Award } from '@/types'
import { Award as AwardIcon, Calendar, Building } from 'lucide-react'

export default function AwardsPage() {
  const [awards, setAwards] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAwards() {
      const { data, error } = await supabase
        .from('awards')
        .select('*')
        .eq('visible', true)
        .order('order_index', { ascending: true })
      
      if (!error && data) setAwards(data)
      setLoading(false)
    }
    fetchAwards()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-noise opacity-20" />

      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-16">
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase mb-4">Page 06</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Awards</span>
                <span className="text-white"> & Achievements</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-rust mx-auto" />
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {awards.map((award, index) => (
              <AnimatedSection key={award.id} delay={0.3 + index * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`flex flex-col lg:flex-row gap-6 items-start ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {award.image ? (
                    <div className="w-full lg:w-1/3">
                      <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
                        <Image
                          src={award.image}
                          alt={award.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 to-transparent" />
                      </div>
                    </div>
                  ) : (
                    <div className="hidden lg:block lg:w-1/3" />
                  )}
                  
                  <div className={`glass-card p-6 flex-1 hover:bg-white/10 transition-all duration-500 ${
                    award.image ? 'lg:w-2/3' : 'w-full'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center">
                        <AwardIcon className="w-5 h-5 text-accent-gold" />
                      </div>
                      <div className="flex items-center gap-2 text-accent-gold">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-mono">{award.year}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-serif text-xl text-white mb-2">{award.title}</h3>
                    
                    <div className="flex items-center gap-2 text-earth-400 mb-3">
                      <Building className="w-4 h-4" />
                      <span className="text-sm">{award.organization}</span>
                    </div>
                    
                    {award.description && (
                      <div 
                        className="text-earth-300 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: award.description }}
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
