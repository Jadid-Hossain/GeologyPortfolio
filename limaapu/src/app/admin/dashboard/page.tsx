'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Briefcase, GraduationCap, FlaskConical, MapPin, Award, BookOpen, Image, Mail, Users } from 'lucide-react'

const stats = [
  { label: 'Experiences', table: 'experiences', icon: Briefcase, href: '/admin/experiences', color: 'blue' },
  { label: 'Education', table: 'education', icon: GraduationCap, href: '/admin/education', color: 'green' },
  { label: 'Research', table: 'research', icon: FlaskConical, href: '/admin/research', color: 'purple' },
  { label: 'Fieldwork', table: 'fieldwork', icon: MapPin, href: '/admin/fieldwork', color: 'orange' },
  { label: 'Awards', table: 'awards', icon: Award, href: '/admin/awards', color: 'yellow' },
  { label: 'Publications', table: 'publications', icon: BookOpen, href: '/admin/publications', color: 'pink' },
  { label: 'Hobbies', table: 'hobbies', icon: Image, href: '/admin/hobbies', color: 'teal' },
  { label: 'Messages', table: 'contact_submissions', icon: Mail, href: '/admin/contact', color: 'indigo' },
]

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({})

  useEffect(() => {
    async function fetchCounts() {
      const newCounts: Record<string, number> = {}
      for (const stat of stats) {
        const { count } = await supabase
          .from(stat.table)
          .select('*', { count: 'exact', head: true })
        newCounts[stat.table] = count || 0
      }
      setCounts(newCounts)
    }
    fetchCounts()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.table}
            href={stat.href}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
              <span className="text-2xl font-bold text-white">{counts[stat.table] || 0}</span>
            </div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/admin/experiences" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-center transition-colors">
            Add Experience
          </Link>
          <Link href="/admin/research" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm text-center transition-colors">
            Add Research
          </Link>
          <Link href="/admin/hobbies" className="px-4 py-2 bg-teal-600 hover:bg-teal-700 rounded-lg text-sm text-center transition-colors">
            Add Gallery Item
          </Link>
          <Link href="/admin/contact" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm text-center transition-colors">
            View Messages
          </Link>
        </div>
      </div>
    </div>
  )
}
