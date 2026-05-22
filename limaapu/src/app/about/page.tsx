'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Canvas3D } from '@/components/3d/Canvas3D'
import { StrataBackground } from '@/components/3d/StrataBackground'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { supabase } from '@/lib/supabase'
import { MapPin, GraduationCap, Briefcase } from 'lucide-react'

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>(null)

  useEffect(() => {
    async function fetchAbout() {
      const { data } = await supabase.from('about').select('*').single()
      if (data) setAboutData(data)
    }
    fetchAbout()
  }, [])

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <Canvas3D className="absolute inset-0 opacity-40">
          <StrataBackground />
        </Canvas3D>
      </div>

      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-16">
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase mb-4">Page 02</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">About</span>
                <span className="text-white"> / Origin</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-rust mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
            <AnimatedSection direction="left" delay={0.3}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={aboutData?.heroImage || '/images/lima-about.jpg'}
                    alt="Choiti Akter Lima"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-accent-gold/20 to-accent-rust/20 rounded-full blur-3xl" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div className="space-y-6">
                <h2 className="font-serif text-3xl text-white">
                  Hi, I&apos;m <span className="text-accent-gold">Choiti!</span>
                </h2>
                
                <div className="space-y-4 text-earth-300 leading-relaxed">
                  <p>
                    I study reservoir systems and subsurface geology to improve understanding of CO₂ storage, 
                    hydrocarbon reservoirs, and future energy resources.
                  </p>
                  <p>
                    I grew up in Bangladesh and earned my B.Sc. and M.Sc. in Geology from the University of Dhaka, 
                    where I first developed a strong interest in subsurface energy systems. My master&apos;s thesis focused 
                    on sequence stratigraphic analysis and reservoir characterization of the Kamta structure in the 
                    Bengal Basin, advised by A.S.M. Woobaidullah.
                  </p>
                  <p>
                    Following graduation, I joined Chevron Bangladesh as an Earth Scientist in the Asset Development 
                    team. I worked on the Bibiyana Gas Field, conducting 2D/3D seismic interpretation, petrophysical 
                    analysis, and static reservoir modeling.
                  </p>
                  <p>
                    In 2024, I began my Ph.D. in Geology at the University of Oklahoma, advised by Dr. Matthew J. 
                    Pranter in the Reservoir Characterization and Modeling Laboratory (RCML). My research focuses on 
                    subsurface geological modeling and evaluating CO₂ storage resources in the Paleozoic strata of 
                    Oklahoma.
                  </p>
                </div>

                <div className="pt-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <MapPin className="w-4 h-4 text-accent-gold" />
                    <span className="text-sm text-earth-300">Norman, Oklahoma</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <GraduationCap className="w-4 h-4 text-accent-gold" />
                    <span className="text-sm text-earth-300">PhD Candidate</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    <Briefcase className="w-4 h-4 text-accent-gold" />
                    <span className="text-sm text-earth-300">Chevron Alumni</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={0.5}>
            <div className="glass-card p-8 md:p-12">
              <h3 className="font-serif text-2xl text-white mb-6 text-center">Mission</h3>
              <p className="text-earth-300 text-center text-lg leading-relaxed max-w-3xl mx-auto">
                Through this combination of industry and academic research, I aim to contribute to climate solutions 
                by advancing the safe and effective geological storage of CO₂ in deep saline formations.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  )
}
