'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { supabase } from '@/lib/supabase'
import type { Publication } from '@/types'
import { BookOpen, ExternalLink, Calendar, Users } from 'lucide-react'

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPublications() {
      const { data, error } = await supabase
        .from('publications')
        .select('*')
        .eq('visible', true)
        .order('year', { ascending: false })
      
      if (!error && data) setPublications(data)
      setLoading(false)
    }
    fetchPublications()
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
        <div className="max-w-5xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-16">
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase mb-4">Page 08</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Publications</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-rust mx-auto" />
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <AnimatedSection key={pub.id} delay={0.3 + index * 0.1}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="glass-card p-6 hover:bg-white/10 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {pub.image && (
                      <div className="relative w-full md:w-48 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={pub.image}
                          alt={pub.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2 text-accent-gold">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-mono">{pub.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-earth-400">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-sm">{pub.journal}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-serif text-lg text-white mb-2">{pub.title}</h3>
                      
                      <div className="flex items-center gap-2 text-earth-400 mb-4">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{pub.authors}</span>
                      </div>
                      
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-accent-gold hover:bg-white/10 transition-all text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          DOI: {pub.doi}
                        </a>
                      )}
                    </div>
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
