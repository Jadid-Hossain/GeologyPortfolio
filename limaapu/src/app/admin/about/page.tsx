'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { AboutInfo } from '@/types'
import { Save, Loader2, ImageIcon } from 'lucide-react'

export default function AdminAboutPage() {
  const [about, setAbout] = useState<AboutInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function fetchAbout() {
      const { data } = await supabase.from('about').select('*').single()
      if (data) setAbout(data)
      setLoading(false)
    }
    fetchAbout()
  }, [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `about/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath)
      setAbout(prev => prev ? { ...prev, heroImage: publicUrl } : null)
    }
    setUploading(false)
  }

  const handleSave = async () => {
    if (!about) return
    setSaving(true)
    await supabase.from('about').update(about).eq('id', about.id)
    setSaving(false)
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">About / Biography</h1>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Hero Image</label>
          {about?.heroImage && (
            <img src={about.heroImage} alt="" className="w-32 h-32 object-cover rounded-lg mb-2" />
          )}
          <label className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 text-sm inline-flex">
            <ImageIcon className="w-4 h-4" />
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>
          {uploading && <Loader2 className="w-4 h-4 animate-spin inline ml-2" />}
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Hero Title</label>
          <input
            type="text"
            value={about?.heroTitle || ''}
            onChange={(e) => setAbout({ ...about!, heroTitle: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Hero Subtitle</label>
          <input
            type="text"
            value={about?.heroSubtitle || ''}
            onChange={(e) => setAbout({ ...about!, heroSubtitle: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Bio Content (HTML)</label>
          <textarea
            value={about?.bioContent || ''}
            onChange={(e) => setAbout({ ...about!, bioContent: e.target.value })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
            rows={10}
          />
        </div>

        <div className="border-t border-gray-800 pt-4">
          <h3 className="text-sm font-semibold text-white mb-3">SEO Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-300 mb-1">SEO Title</label>
              <input
                type="text"
                value={about?.seoTitle || ''}
                onChange={(e) => setAbout({ ...about!, seoTitle: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">SEO Description</label>
              <textarea
                value={about?.seoDescription || ''}
                onChange={(e) => setAbout({ ...about!, seoDescription: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">SEO Keywords (comma separated)</label>
              <input
                type="text"
                value={about?.seoKeywords || ''}
                onChange={(e) => setAbout({ ...about!, seoKeywords: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
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
  )
}
