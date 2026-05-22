'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { supabase } from '@/lib/supabase'
import type { Research } from '@/types'
import { FlaskConical, Microscope, ChevronDown, ChevronUp, MapPin, Layers } from 'lucide-react'

export default function ResearchPage() {
  const [research, setResearch] = useState<Research[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [expandedImages, setExpandedImages] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResearch() {
      const { data, error } = await supabase
        .from('research')
        .select('*')
        .eq('visible', true)
        .order('order_index', { ascending: true })
      
      if (!error && data) setResearch(data)
      setLoading(false)
    }
    fetchResearch()
  }, [])

  const currentResearch = research.filter(r => r.category === 'current')
  const previousResearch = research.filter(r => r.category === 'previous')

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
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase mb-4">Page 04</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Research</span>
                <span className="text-white"> & Discovery</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-rust mx-auto" />
              <p className="text-earth-400 mt-6 max-w-2xl mx-auto">
                Advancing our understanding of CO₂ storage and reservoir characterization through 
                integrated geological modeling and analysis.
              </p>
            </div>
          </AnimatedSection>

          {currentResearch.length > 0 && (
            <section className="mb-20">
              <AnimatedSection delay={0.3}>
                <div className="flex items-center gap-3 mb-12">
                  <FlaskConical className="w-6 h-6 text-accent-gold" />
                  <h2 className="font-serif text-2xl md:text-3xl text-white">Current Research</h2>
                </div>
              </AnimatedSection>

              <div className="space-y-16">
                {currentResearch.map((item, index) => (
                  <AnimatedSection key={item.id} delay={0.4 + index * 0.1}>
                    <div className={`flex flex-col lg:flex-row gap-8 items-start ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}>
                      {item.images && item.images.length > 0 ? (
                        <div className="w-full lg:w-1/2">
                          <div className="relative">
                            <div
                              className="relative h-64 md:h-80 rounded-2xl overflow-hidden cursor-pointer group"
                              onClick={() => setExpandedImages(expandedImages === item.id ? null : item.id)}
                            >
                              <Image
                                src={item.images[0]}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
                              {item.images.length > 1 && (
                                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/60 rounded-full text-xs text-white">
                                  {item.images.length} photos
                                </div>
                              )}
                            </div>

                            {expandedImages === item.id && item.images.length > 1 && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex gap-2 mt-3 overflow-x-auto pb-2"
                              >
                                {item.images.map((img, i) => (
                                  <div key={i} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                                    <Image src={img} alt="" fill className="object-cover" />
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="hidden lg:block lg:w-1/2" />
                      )}

                      <div className="w-full lg:w-1/2">
                        <div className="glass-card p-6 md:p-8">
                          <h3 className="font-serif text-xl md:text-2xl text-white mb-4">{item.title}</h3>
                          
                          <div 
                            className="text-earth-300 leading-relaxed mb-6"
                            dangerouslySetInnerHTML={{ __html: item.abstract }}
                          />

                          {item.formations && item.formations.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Layers className="w-4 h-4 text-accent-gold" />
                                <span className="text-white text-sm font-medium">Target Formations</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {item.formations.map((f, i) => (
                                  <span key={i} className="px-3 py-1 bg-accent-gold/10 rounded-full text-xs text-accent-gold border border-accent-gold/20">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <button
                            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                            className="flex items-center gap-2 text-accent-gold hover:text-accent-rust transition-colors mt-2"
                          >
                            {expandedId === item.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            <span className="text-sm font-medium">
                              {expandedId === item.id ? 'Hide Methods' : 'View Methods & Approach'}
                            </span>
                          </button>

                          <AnimatePresence>
                            {expandedId === item.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-4 mt-4 border-t border-earth-800">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Microscope className="w-4 h-4 text-accent-gold" />
                                    <span className="text-white font-medium">Methods</span>
                                  </div>
                                  <div 
                                    className="text-earth-400 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: item.methods }}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </section>
          )}

          {previousResearch.length > 0 && (
            <section>
              <AnimatedSection delay={0.5}>
                <div className="flex items-center gap-3 mb-12">
                  <Microscope className="w-6 h-6 text-earth-500" />
                  <h2 className="font-serif text-2xl md:text-3xl text-earth-400">Previous Research</h2>
                </div>
              </AnimatedSection>

              <div className="space-y-8">
                {previousResearch.map((item, index) => (
                  <AnimatedSection key={item.id} delay={0.6 + index * 0.1}>
                    <div className={`flex flex-col lg:flex-row gap-8 items-start ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}>
                      {item.images && item.images.length > 0 ? (
                        <div className="w-full lg:w-2/5">
                          <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden">
                            <Image
                              src={item.images[0]}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/40 to-transparent" />
                          </div>
                        </div>
                      ) : (
                        <div className="hidden lg:block lg:w-2/5" />
                      )}
                      
                      <div className="w-full lg:w-3/5">
                        <div className="glass-card p-6 hover:bg-white/10 transition-all duration-500">
                          <h3 className="font-serif text-xl text-white mb-3">{item.title}</h3>
                          <div 
                            className="text-earth-400 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item.abstract }}
                          />
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expandedImages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setExpandedImages(null)}
          >
            <button className="absolute top-6 right-6 text-white hover:text-accent-gold">
              <ChevronUp className="w-8 h-8 rotate-45" />
            </button>
            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {currentResearch.find(r => r.id === expandedImages)?.images.map((img, i) => (
                <div key={i} className="mb-4">
                  <Image src={img} alt="" width={1200} height={800} className="w-full h-auto rounded-lg" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
