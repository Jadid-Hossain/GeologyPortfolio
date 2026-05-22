'use client'

import Link from 'next/link'
import { Layers, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0f] border-t border-earth-800/50">
      <div className="absolute inset-0 bg-noise opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-accent-gold" />
              <span className="font-serif text-lg font-bold text-gradient">
                Choiti Akter Lima
              </span>
            </div>
            <p className="text-earth-400 text-sm leading-relaxed">
              Geologist & PhD Researcher at University of Oklahoma. 
              Advancing CO₂ storage solutions through subsurface characterization.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {['About', 'Research', 'Experience', 'Publications', 'Fieldwork', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-earth-400 hover:text-accent-gold text-sm transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-earth-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-accent-gold flex-shrink-0" />
                <span>408 Wadsack Dr, Apt F, Norman, OK 73072</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-gold flex-shrink-0" />
                <span>lima.choiti@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-earth-800/50 text-center">
          <p className="text-earth-500 text-sm">
            © {new Date().getFullYear()} Choiti Akter Lima. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
