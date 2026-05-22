'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Hobby, HobbyUpdate } from '@/types'
import { Plus, Edit2, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Image as ImageIcon, Loader2, ChevronRight, ChevronLeft } from 'lucide-react'

export default function AdminHobbiesPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [loading, setLoading] = useState(true)
  const [showHobbyForm, setShowHobbyForm] = useState(false)
  const [editingHobby, setEditingHobby] = useState<Hobby | null>(null)
  const [hobbyFormData, setHobbyFormData] = useState({
    category: 'Photography',
    title: '',
    coverImage: '',
    description: '',
    order: 0,
    visible: true,
  })
  const [uploading, setUploading] = useState<string | null>(null)

  const [selectedHobbyId, setSelectedHobbyId] = useState<string | null>(null)
  const [updates, setUpdates] = useState<HobbyUpdate[]>([])
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [editingUpdate, setEditingUpdate] = useState<HobbyUpdate | null>(null)
  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    image: '',
    details: '',
    order: 0,
    visible: true,
  })

  useEffect(() => {
    fetchHobbies()
  }, [])

  useEffect(() => {
    if (selectedHobbyId) fetchUpdates(selectedHobbyId)
  }, [selectedHobbyId])

  const fetchHobbies = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('hobbies')
      .select('*')
      .order('order_index', { ascending: true })
    if (!error && data) setHobbies(data.map(d => ({ ...d, coverImage: d.cover_image })))
    setLoading(false)
  }

  const fetchUpdates = async (hobbyId: string) => {
    const { data, error } = await supabase
      .from('hobby_updates')
      .select('*')
      .eq('hobby_id', hobbyId)
      .order('order_index', { ascending: true })
    if (!error && data) setUpdates(data)
  }

  const handleImageUpload = async (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(field)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `hobbies/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, file)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath)
      if (field === 'coverImage') {
        setHobbyFormData(prev => ({ ...prev, coverImage: publicUrl }))
      } else {
        setUpdateFormData(prev => ({ ...prev, image: publicUrl }))
      }
    }
    setUploading(null)
  }

  const handleHobbySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...hobbyFormData,
      cover_image: hobbyFormData.coverImage,
      order_index: hobbyFormData.order,
    }
    
    if (editingHobby) {
      await supabase.from('hobbies').update(payload).eq('id', editingHobby.id)
    } else {
      await supabase.from('hobbies').insert([payload])
    }
    setShowHobbyForm(false)
    setEditingHobby(null)
    setHobbyFormData({ category: 'Photography', title: '', coverImage: '', description: '', order: 0, visible: true })
    fetchHobbies()
  }

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedHobbyId) return

    const payload = {
      ...updateFormData,
      hobby_id: selectedHobbyId,
      order_index: updateFormData.order,
    }

    if (editingUpdate) {
      await supabase.from('hobby_updates').update(payload).eq('id', editingUpdate.id)
    } else {
      await supabase.from('hobby_updates').insert([payload])
    }
    setShowUpdateForm(false)
    setEditingUpdate(null)
    setUpdateFormData({ title: '', image: '', details: '', order: 0, visible: true })
    fetchUpdates(selectedHobbyId)
  }

  const deleteHobby = async (id: string) => {
    if (!confirm('Delete this hobby and all its updates?')) return
    await supabase.from('hobby_updates').delete().eq('hobby_id', id)
    await supabase.from('hobbies').delete().eq('id', id)
    if (selectedHobbyId === id) { setSelectedHobbyId(null); setUpdates([]) }
    fetchHobbies()
  }

  const deleteUpdate = async (id: string) => {
    if (!confirm('Delete this update?')) return
    await supabase.from('hobby_updates').delete().eq('id', id)
    if (selectedHobbyId) fetchUpdates(selectedHobbyId)
  }

  const toggleHobbyVisibility = async (hobby: Hobby) => {
    await supabase.from('hobbies').update({ visible: !hobby.visible }).eq('id', hobby.id)
    fetchHobbies()
  }

  const toggleUpdateVisibility = async (update: HobbyUpdate) => {
    await supabase.from('hobby_updates').update({ visible: !update.visible }).eq('id', update.id)
    if (selectedHobbyId) fetchUpdates(selectedHobbyId)
  }

  const moveHobby = async (hobby: Hobby, direction: 'up' | 'down') => {
    const idx = hobbies.findIndex(h => h.id === hobby.id)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= hobbies.length) return
    const swapHobby = hobbies[swapIdx]
    await supabase.from('hobbies').update({ order_index: swapHobby.order_index }).eq('id', hobby.id)
    await supabase.from('hobbies').update({ order_index: hobby.order_index }).eq('id', swapHobby.id)
    fetchHobbies()
  }

  const moveUpdate = async (update: HobbyUpdate, direction: 'up' | 'down') => {
    const idx = updates.findIndex(u => u.id === update.id)
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= updates.length) return
    const swapUpdate = updates[swapIdx]
    await supabase.from('hobby_updates').update({ order_index: swapUpdate.order_index }).eq('id', update.id)
    await supabase.from('hobby_updates').update({ order_index: update.order_index }).eq('id', swapUpdate.id)
    fetchUpdates(selectedHobbyId!)
  }

  const startEditHobby = (hobby: Hobby) => {
    setEditingHobby(hobby)
    setHobbyFormData({
      category: hobby.category,
      title: hobby.title,
      coverImage: hobby.coverImage,
      description: hobby.description || '',
      order: hobby.order,
      visible: hobby.visible,
    })
    setShowHobbyForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Hobbies Gallery</h1>
        <button
          onClick={() => {
            setEditingHobby(null)
            setHobbyFormData({ category: 'Photography', title: '', coverImage: '', description: '', order: 0, visible: true })
            setShowHobbyForm(true)
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Hobby Group
        </button>
      </div>

      {showHobbyForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">{editingHobby ? 'Edit Hobby Group' : 'Add Hobby Group'}</h2>
          <form onSubmit={handleHobbySubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Category *</label>
              <select
                value={hobbyFormData.category}
                onChange={(e) => setHobbyFormData({ ...hobbyFormData, category: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="Photography">Photography</option>
                <option value="Painting">Painting</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Title *</label>
              <input
                type="text"
                value={hobbyFormData.title}
                onChange={(e) => setHobbyFormData({ ...hobbyFormData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Cover Image *</label>
              {hobbyFormData.coverImage && (
                <img src={hobbyFormData.coverImage} alt="" className="w-32 h-32 object-cover rounded-lg mb-2" />
              )}
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 text-sm">
                  <ImageIcon className="w-4 h-4" />
                  Upload Cover Image
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload('coverImage', e)} className="hidden" />
                </label>
                {uploading === 'coverImage' && <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">Description</label>
              <textarea
                value={hobbyFormData.description}
                onChange={(e) => setHobbyFormData({ ...hobbyFormData, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                rows={3}
              />
            </div>
            <div className="flex gap-2 items-center">
              <label className="block text-sm text-gray-300">Order</label>
              <input
                type="number"
                value={hobbyFormData.order}
                onChange={(e) => setHobbyFormData({ ...hobbyFormData, order: parseInt(e.target.value) })}
                className="w-20 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
              />
              <label className="flex items-center gap-2 ml-4">
                <input
                  type="checkbox"
                  checked={hobbyFormData.visible}
                  onChange={(e) => setHobbyFormData({ ...hobbyFormData, visible: e.target.checked })}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-300">Visible</span>
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors">
                {editingHobby ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => { setShowHobbyForm(false); setEditingHobby(null) }} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
      ) : (
        <div className="space-y-3">
          {hobbies.map((hobby, index) => (
            <div key={hobby.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveHobby(hobby, 'up')} disabled={index === 0} className="text-gray-500 hover:text-white disabled:opacity-30">
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button onClick={() => moveHobby(hobby, 'down')} disabled={index === hobbies.length - 1} className="text-gray-500 hover:text-white disabled:opacity-30">
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {hobby.coverImage && (
                  <img src={hobby.coverImage} alt="" className="w-16 h-16 object-cover rounded-lg" />
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{hobby.title}</span>
                    <span className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400">{hobby.category}</span>
                    {!hobby.visible && <span className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400">Hidden</span>}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedHobbyId(selectedHobbyId === hobby.id ? null : hobby.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
                >
                  {selectedHobbyId === hobby.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  Updates
                </button>

                <button onClick={() => startEditHobby(hobby)} className="p-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => toggleHobbyVisibility(hobby)} className="p-2 text-gray-400 hover:text-white transition-colors">
                  {hobby.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => deleteHobby(hobby.id)} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {selectedHobbyId === hobby.id && (
                <div className="border-t border-gray-800 bg-gray-950/50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-gray-300">Updates / Entries</h3>
                    <button
                      onClick={() => {
                        setEditingUpdate(null)
                        setUpdateFormData({ title: '', image: '', details: '', order: 0, visible: true })
                        setShowUpdateForm(true)
                      }}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add Update
                    </button>
                  </div>

                  {showUpdateForm && (
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4">
                      <form onSubmit={handleUpdateSubmit} className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Title *</label>
                          <input
                            type="text"
                            value={updateFormData.title}
                            onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Image *</label>
                          {updateFormData.image && (
                            <img src={updateFormData.image} alt="" className="w-24 h-24 object-cover rounded-lg mb-2" />
                          )}
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 text-xs">
                              <ImageIcon className="w-3 h-3" />
                              Upload Image
                              <input type="file" accept="image/*" onChange={(e) => handleImageUpload('updateImage', e)} className="hidden" />
                            </label>
                            {uploading === 'updateImage' && <Loader2 className="w-3 h-3 animate-spin" />}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">Details (bullet points / description)</label>
                          <textarea
                            value={updateFormData.details}
                            onChange={(e) => setUpdateFormData({ ...updateFormData, details: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                            rows={3}
                            placeholder="• Point 1&#10;• Point 2&#10;• Point 3"
                          />
                        </div>
                        <div className="flex gap-2 items-center">
                          <label className="text-xs text-gray-400">Order</label>
                          <input
                            type="number"
                            value={updateFormData.order}
                            onChange={(e) => setUpdateFormData({ ...updateFormData, order: parseInt(e.target.value) })}
                            className="w-16 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs focus:border-blue-500 focus:outline-none"
                          />
                          <label className="flex items-center gap-1 ml-3">
                            <input
                              type="checkbox"
                              checked={updateFormData.visible}
                              onChange={(e) => setUpdateFormData({ ...updateFormData, visible: e.target.checked })}
                              className="w-3 h-3"
                            />
                            <span className="text-xs text-gray-400">Visible</span>
                          </label>
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors">
                            {editingUpdate ? 'Update' : 'Create'}
                          </button>
                          <button type="button" onClick={() => setShowUpdateForm(false)} className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs transition-colors">
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {updates.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">No updates yet. Add your first entry above.</p>
                  )}

                  <div className="space-y-2">
                    {updates.map((update, uIdx) => (
                      <div key={update.id} className="flex items-center gap-3 bg-gray-900 rounded-lg p-3">
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => moveUpdate(update, 'up')} disabled={uIdx === 0} className="text-gray-600 hover:text-white disabled:opacity-30">
                            <ChevronUp className="w-3 h-3" />
                          </button>
                          <button onClick={() => moveUpdate(update, 'down')} disabled={uIdx === updates.length - 1} className="text-gray-600 hover:text-white disabled:opacity-30">
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>

                        {update.image && (
                          <img src={update.image} alt="" className="w-12 h-12 object-cover rounded" />
                        )}

                        <div className="flex-1 min-w-0">
                          <span className="text-white text-sm">{update.title}</span>
                          {!update.visible && <span className="ml-2 text-xs text-gray-500">Hidden</span>}
                        </div>

                        <button
                          onClick={() => {
                            setEditingUpdate(update)
                            setUpdateFormData({
                              title: update.title,
                              image: update.image,
                              details: update.details || '',
                              order: update.order,
                              visible: update.visible,
                            })
                            setShowUpdateForm(true)
                          }}
                          className="p-1.5 text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toggleUpdateVisibility(update)} className="p-1.5 text-gray-500 hover:text-white transition-colors">
                          {update.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => deleteUpdate(update.id)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {hobbies.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No hobby groups yet. Click &quot;Add Hobby Group&quot; to create one.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
