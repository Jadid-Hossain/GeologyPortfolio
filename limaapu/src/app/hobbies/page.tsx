'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { supabase } from '@/lib/supabase'
import type { Hobby, HobbyUpdate } from '@/types'
import { Camera, Palette, Plane, ChevronDown, ChevronUp, X } from 'lucide-react'

const categoryConfig = {
  Photography: { icon: Camera, color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
  Painting: { icon: Palette, color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20' },
  Travel: { icon: Plane, color: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/20' },
}

export default function HobbiesPage() {
  const [hobbies, setHobbies] = useState<(Hobby & { updates: HobbyUpdate[] })[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedHobby, setSelectedHobby] = useState<(Hobby & { updates: HobbyUpdate[] }) | null>(null)
  const [expandedUpdates, setExpandedUpdates] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data: hobbiesData, error } = await supabase
        .from('hobbies')
        .select('*, updates:hobby_updates(*)')
        .eq('visible', true)
        .order('order_index', { ascending: true })
      
      if (!error && hobbiesData) {
        const mapped = hobbiesData.map((h: any) => ({
          ...h,
          coverImage: h.cover_image,
          updates: (h.updates || []).sort((a: any, b: any) => a.order_index - b.order_index).filter((u: any) => u.visible),
        }))
        setHobbies(mapped)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const categories = ['all', 'Photography', 'Painting', 'Travel']
  const filteredHobbies = activeCategory === 'all'
    ? hobbies
    : hobbies.filter(h => h.category === activeCategory)

  const groupedHobbies = filteredHobbies.reduce<Record<string, (Hobby & { updates: HobbyUpdate[] })[]>>((acc, hobby) => {
    if (!acc[hobby.category]) acc[hobby.category] = []
    acc[hobby.category].push(hobby)
    return acc
  }, {})

  const toggleUpdate = (updateId: string) => {
    setExpandedUpdates(prev => {
      const next = new Set(prev)
      if (next.has(updateId)) next.delete(updateId)
      else next.add(updateId)
      return next
    })
  }

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
        <div className="max-w-7xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-16">
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase mb-4">Page 09</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Gallery</span>
                <span className="text-white"> & Hobbies</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-rust mx-auto" />
              <p className="text-earth-400 mt-6 max-w-2xl mx-auto">
                A collection of moments captured through the lens, canvases brought to life, and journeys across the world.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => {
                const config = categoryConfig[cat as keyof typeof categoryConfig]
                const Icon = config?.icon
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-accent-gold text-[#0a0a0f]'
                        : 'bg-white/5 text-earth-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {Icon && cat !== 'all' && <Icon className="w-4 h-4" />}
                    <span className="text-sm font-medium">{cat === 'all' ? 'All' : cat}</span>
                  </button>
                )
              })}
            </div>
          </AnimatedSection>

          {activeCategory === 'all' ? (
            <div className="space-y-16">
              {Object.entries(groupedHobbies).map(([category, items]) => {
                const config = categoryConfig[category as keyof typeof categoryConfig]
                const Icon = config?.icon
                return (
                  <AnimatedSection key={category} delay={0.4}>
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 rounded-full ${config?.bg} flex items-center justify-center`}>
                          {Icon && <Icon className={`w-5 h-5 ${config?.color}`} />}
                        </div>
                        <h2 className="font-serif text-2xl text-white">{category}</h2>
                        <div className="flex-1 h-px bg-gradient-to-r from-earth-700 to-transparent" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((hobby, index) => (
                          <motion.div
                            key={hobby.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card overflow-hidden cursor-pointer group hover:bg-white/10 transition-all duration-500"
                            onClick={() => setSelectedHobby(hobby)}
                          >
                            <div className="relative h-56">
                              <Image
                                src={hobby.coverImage}
                                alt={hobby.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="text-white font-serif text-lg">{hobby.title}</h3>
                                {hobby.description && (
                                  <p className="text-earth-400 text-sm mt-1 line-clamp-2">{hobby.description}</p>
                                )}
                              </div>
                            </div>

                            {hobby.updates && hobby.updates.length > 0 && (
                              <div className="p-4 border-t border-white/5">
                                <div className="flex items-center justify-between">
                                  <span className="text-earth-400 text-xs">{hobby.updates.length} entries</span>
                                  <ChevronDown className="w-4 h-4 text-earth-500 group-hover:text-accent-gold transition-colors" />
                                </div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHobbies.map((hobby, index) => (
                <AnimatedSection key={hobby.id} delay={0.3 + index * 0.05}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="glass-card overflow-hidden cursor-pointer group hover:bg-white/10 transition-all duration-500"
                    onClick={() => setSelectedHobby(hobby)}
                  >
                    <div className="relative h-56">
                      <Image
                        src={hobby.coverImage}
                        alt={hobby.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-serif text-lg">{hobby.title}</h3>
                        {hobby.description && (
                          <p className="text-earth-400 text-sm mt-1 line-clamp-2">{hobby.description}</p>
                        )}
                      </div>
                    </div>

                    {hobby.updates && hobby.updates.length > 0 && (
                      <div className="p-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-earth-400 text-xs">{hobby.updates.length} entries</span>
                          <ChevronDown className="w-4 h-4 text-earth-500 group-hover:text-accent-gold transition-colors" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedHobby && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelectedHobby(null)}
          >
            <div className="min-h-screen px-4 py-12 md:py-16">
              <div className="max-w-4xl mx-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const config = categoryConfig[selectedHobby.category as keyof typeof categoryConfig]
                      const Icon = config?.icon
                      return (
                        <>
                          <div className={`w-10 h-10 rounded-full ${config?.bg} flex items-center justify-center`}>
                            {Icon && <Icon className={`w-5 h-5 ${config?.color}`} />}
                          </div>
                          <span className={`text-sm font-mono ${config?.color}`}>{selectedHobby.category}</span>
                        </>
                      )
                    })()}
                  </div>
                  <button
                    onClick={() => setSelectedHobby(null)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={selectedHobby.coverImage}
                    alt={selectedHobby.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-white font-serif text-3xl md:text-4xl">{selectedHobby.title}</h2>
                    {selectedHobby.description && (
                      <p className="text-earth-300 mt-2 max-w-2xl">{selectedHobby.description}</p>
                    )}
                  </div>
                </div>

                {selectedHobby.updates && selectedHobby.updates.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-serif text-xl text-white mb-4">Entries</h3>
                    {selectedHobby.updates.map((update) => (
                      <motion.div
                        key={update.id}
                        className="glass-card overflow-hidden"
                      >
                        <button
                          onClick={() => toggleUpdate(update.id)}
                          className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={update.image} alt={update.title} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium truncate">{update.title}</h4>
                          </div>
                          {expandedUpdates.has(update.id) ? (
                            <ChevronUp className="w-5 h-5 text-accent-gold flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-earth-500 flex-shrink-0" />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedUpdates.has(update.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-2 border-t border-white/5">
                                <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-4">
                                  <Image
                                    src={update.image}
                                    alt={update.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div
                                  className="text-earth-300 text-sm leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: update.details }}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
