'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { supabase } from '@/lib/supabase'
import type { ContactInfo } from '@/types'
import { Mail, MapPin, Send, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react'

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchContact() {
      const { data } = await supabase.from('contact').select('*').single()
      if (data) setContactInfo(data)
    }
    fetchContact()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }])
      
      if (!error) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      }
    } catch (err) {
      console.error('Error submitting form:', err)
    } finally {
      setLoading(false)
    }
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: contactInfo?.socialLinks?.linkedin || '#' },
    { name: 'ResearchGate', icon: ExternalLink, url: contactInfo?.socialLinks?.researchgate || '#' },
    { name: 'Google Scholar', icon: ExternalLink, url: contactInfo?.socialLinks?.googleScholar || '#' },
    { name: 'ORCID', icon: ExternalLink, url: contactInfo?.socialLinks?.orcid || '#' },
  ]

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f]" />
      <div className="absolute inset-0 bg-noise opacity-20" />

      <div className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="text-center mb-16">
              <p className="text-accent-gold font-mono text-sm tracking-widest uppercase mb-4">Page 10</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient">Contact</span>
                <span className="text-white"> / Exit</span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-accent-gold to-accent-rust mx-auto" />
              <p className="text-earth-400 mt-6 max-w-2xl mx-auto text-lg">
                {contactInfo?.messageText || "I would love to hear from you!"}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection direction="left" delay={0.3}>
              <div className="space-y-8">
                <div className="glass-card p-8">
                  <h2 className="font-serif text-2xl text-white mb-6">Get in Touch</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-accent-gold" />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">Address</p>
                        <p className="text-earth-400 text-sm">
                          {contactInfo?.address || '408 Wadsack Dr, Apartment F, Norman, Oklahoma 73072'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-accent-gold" />
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">Email</p>
                        <div className="space-y-1">
                          {(contactInfo?.emails || ['lima.choiti@gmail.com', 'lima.akter.choiti-1@ou.edu']).map((email, i) => (
                            <a
                              key={i}
                              href={`mailto:${email}`}
                              className="block text-earth-400 text-sm hover:text-accent-gold transition-colors"
                            >
                              {email}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8">
                  <h3 className="font-serif text-xl text-white mb-4">Connect</h3>
                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-earth-300 hover:border-accent-gold hover:text-accent-gold transition-all"
                      >
                        <social.icon className="w-4 h-4" />
                        <span className="text-sm">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <div className="glass-card p-8">
                <h2 className="font-serif text-2xl text-white mb-6">Send a Message</h2>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="font-serif text-xl text-white mb-2">Message Sent!</h3>
                    <p className="text-earth-400">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-4 py-2 text-accent-gold hover:text-accent-rust transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-earth-300 mb-1">Name</label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-earth-500 focus:border-accent-gold focus:outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm text-earth-300 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-earth-500 focus:border-accent-gold focus:outline-none transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm text-earth-300 mb-1">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-earth-500 focus:border-accent-gold focus:outline-none transition-colors"
                        placeholder="What is this about?"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm text-earth-300 mb-1">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-earth-500 focus:border-accent-gold focus:outline-none transition-colors resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-gradient-to-r from-accent-gold to-accent-rust rounded-lg text-white font-medium hover:shadow-lg hover:shadow-accent-gold/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  )
}
