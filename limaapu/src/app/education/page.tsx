'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { supabase } from '@/lib/supabase'
import type { Education } from '@/types'
import { GraduationCap, Calendar, MapPin, Trophy } from 'lucide-react'

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEducation() {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .eq('visible', true)
        .order('order_index', { ascending: true })
      
      if (!error && data) setEducation(data)
      setLoading(false)
    }
    fetchEducation()
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
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase mb-4">Page 05</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Education</span>
                <span className="text-white"> Journey</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-rust mx-auto" />
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-gold/50 via-earth-700 to-transparent" />

            <div className="space-y-12">
              {education.map((edu, index) => (
                <AnimatedSection
                  key={edu.id}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={0.3 + index * 0.1}
                >
                  <div className={`relative flex flex-col md:flex-row gap-6 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}>
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-accent-gold border-4 border-[#0a0a0f] z-10" />
                    
                    <div className="ml-16 md:ml-0 md:w-1/2">
                      <div className={`glass-card p-6 hover:bg-white/10 transition-all duration-500 ${
                        index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                      }`}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {edu.image && (
                            <div className="relative h-40 rounded-lg overflow-hidden">
                              <Image
                                src={edu.image}
                                alt={edu.degree}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          
                          <div className={edu.image ? '' : 'sm:col-span-2'}>
                            <div className="flex items-center gap-2 text-accent-gold mb-2">
                              <GraduationCap className="w-4 h-4" />
                              <span className="text-sm font-mono">{edu.startYear} — {edu.endYear || 'Present'}</span>
                            </div>
                            
                            <h3 className="font-serif text-lg text-white mb-1">{edu.degree}</h3>
                            
                            <div className="flex items-center gap-2 text-earth-400 mb-2">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{edu.institution}, {edu.location}</span>
                            </div>
                            
                            {edu.description && (
                              <div 
                                className="text-earth-300 text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: edu.description }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
