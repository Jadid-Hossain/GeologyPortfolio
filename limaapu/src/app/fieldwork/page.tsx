'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { supabase } from '@/lib/supabase'
import type { Fieldwork } from '@/types'
import { MapPin, Calendar, Mountain } from 'lucide-react'

export default function FieldworkPage() {
  const [fieldwork, setFieldwork] = useState<Fieldwork[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFieldwork() {
      const { data, error } = await supabase
        .from('fieldwork')
        .select('*')
        .eq('visible', true)
        .order('order_index', { ascending: true })
      
      if (!error && data) setFieldwork(data)
      setLoading(false)
    }
    fetchFieldwork()
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
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase mb-4">Page 07</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Fieldwork</span>
                <span className="text-white"> Expeditions</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-rust mx-auto" />
              <p className="text-earth-400 mt-6 max-w-2xl mx-auto">
                From the Bengal Basin to the Arbuckle Mountains, exploring geological formations firsthand.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fieldwork.map((fw, index) => (
              <AnimatedSection key={fw.id} delay={0.3 + index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="glass-card overflow-hidden hover:bg-white/10 transition-all duration-500"
                >
                  {fw.photos?.[0] && (
                    <div className="relative h-56">
                      <Image
                        src={fw.photos[0]}
                        alt={fw.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center gap-2 text-accent-gold">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-mono">{fw.year}</span>
                      </div>
                      <div className="flex items-center gap-2 text-earth-400">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{fw.location}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-serif text-xl text-white mb-3">{fw.title}</h3>
                    
                    {fw.description && (
                      <div 
                        className="text-earth-300 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: fw.description }}
                      />
                    )}

                    {fw.photos && fw.photos.length > 1 && (
                      <div className="flex gap-2 mt-4">
                        {fw.photos.slice(1, 4).map((photo, i) => (
                          <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image src={photo} alt="" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
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
