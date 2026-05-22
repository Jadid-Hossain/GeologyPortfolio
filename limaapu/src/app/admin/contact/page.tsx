'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { ContactInfo } from '@/types'
import { Save, Loader2 } from 'lucide-react'

export default function AdminContactPage() {
  const [contact, setContact] = useState<ContactInfo | null>(null)
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: contactData } = await supabase.from('contact').select('*').single()
    if (contactData) setContact(contactData)

    const { data: submissionsData } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    if (submissionsData) setSubmissions(submissionsData)

    setLoading(false)
  }

  const handleSave = async () => {
    if (!contact) return
    setSaving(true)
    const { error } = await supabase.from('contact').update({
      address: contact.address,
      emails: contact.emails,
      message_text: contact.messageText,
      phone: contact.phone,
      social_links: contact.socialLinks,
    }).eq('id', contact.id)
    if (!error) fetchData()
    setSaving(false)
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Contact & Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Address</label>
              <input
                type="text"
                value={contact?.address || ''}
                onChange={(e) => setContact({ ...contact!, address: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Emails (comma separated)</label>
              <input
                type="text"
                value={(contact?.emails || []).join(', ')}
                onChange={(e) => setContact({ ...contact!, emails: e.target.value.split(',').map(s => s.trim()) })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Welcome Message</label>
              <textarea
                value={contact?.messageText || ''}
                onChange={(e) => setContact({ ...contact!, messageText: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">LinkedIn URL</label>
              <input
                type="text"
                value={contact?.socialLinks?.linkedin || ''}
                onChange={(e) => setContact({ ...contact!, socialLinks: { ...contact!.socialLinks, linkedin: e.target.value } })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">ResearchGate URL</label>
              <input
                type="text"
                value={contact?.socialLinks?.researchgate || ''}
                onChange={(e) => setContact({ ...contact!, socialLinks: { ...contact!.socialLinks, researchgate: e.target.value } })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Google Scholar URL</label>
              <input
                type="text"
                value={contact?.socialLinks?.googleScholar || ''}
                onChange={(e) => setContact({ ...contact!, socialLinks: { ...contact!.socialLinks, googleScholar: e.target.value } })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">ORCID URL</label>
              <input
                type="text"
                value={contact?.socialLinks?.orcid || ''}
                onChange={(e) => setContact({ ...contact!, socialLinks: { ...contact!.socialLinks, orcid: e.target.value } })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Contact Submissions</h2>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white font-medium text-sm">{sub.name}</span>
                  <span className="text-gray-500 text-xs">{new Date(sub.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1">{sub.email}</p>
                <p className="text-blue-400 text-xs mb-2">{sub.subject}</p>
                <p className="text-gray-300 text-sm">{sub.message}</p>
              </div>
            ))}
            {submissions.length === 0 && (
              <p className="text-gray-500 text-center py-8">No messages yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
