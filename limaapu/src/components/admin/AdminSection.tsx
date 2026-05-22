'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit2, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Image as ImageIcon, Loader2 } from 'lucide-react'

interface AdminSectionProps {
  title: string
  table: string
  columns: {
    key: string
    label: string
    type?: 'text' | 'rich' | 'image' | 'images' | 'select' | 'boolean' | 'number' | 'array'
    options?: string[]
    required?: boolean
  }[]
  defaultValues: Record<string, any>
}

export function AdminSection({ title, table, columns, defaultValues }: AdminSectionProps) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<any>(null)
  const [formData, setFormData] = useState<Record<string, any>>(defaultValues)
  const [showForm, setShowForm] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('order_index', { ascending: true })
    if (!error && data) setItems(data)
    setLoading(false)
  }

  const handleImageUpload = async (field: string, e: React.ChangeEvent<HTMLInputElement>, multiple = false) => {
    const files = e.target.files
    if (!files) return

    setUploading(field)
    const urls: string[] = []

    for (const file of Array.from(files)) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${table}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file)

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('portfolio-images')
          .getPublicUrl(filePath)
        urls.push(publicUrl)
      }
    }

    if (multiple) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), ...urls]
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: urls[0] }))
    }
    setUploading(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editing) {
      const { error } = await supabase
        .from(table)
        .update(formData)
        .eq('id', editing.id)
      if (!error) {
        setEditing(null)
        setShowForm(false)
        fetchItems()
      }
    } else {
      const { error } = await supabase
        .from(table)
        .insert([formData])
      if (!error) {
        setShowForm(false)
        fetchItems()
      }
    }
    setFormData(defaultValues)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    await supabase.from(table).delete().eq('id', id)
    fetchItems()
  }

  const toggleVisibility = async (item: any) => {
    await supabase
      .from(table)
      .update({ visible: !item.visible })
      .eq('id', item.id)
    fetchItems()
  }

  const moveItem = async (item: any, direction: 'up' | 'down') => {
    const currentIndex = items.findIndex(i => i.id === item.id)
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    if (swapIndex < 0 || swapIndex >= items.length) return

    const currentItem = items[currentIndex]
    const swapItem = items[swapIndex]

    await supabase.from(table).update({ order_index: swapItem.order_index }).eq('id', currentItem.id)
    await supabase.from(table).update({ order_index: currentItem.order_index }).eq('id', swapItem.id)
    fetchItems()
  }

  const startEdit = (item: any) => {
    setEditing(item)
    setFormData(item)
    setShowForm(true)
  }

  const startAdd = () => {
    setEditing(null)
    setFormData(defaultValues)
    setShowForm(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <button
          onClick={startAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            {editing ? 'Edit Item' : 'Add New Item'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {columns.map((col) => (
              <div key={col.key}>
                <label className="block text-sm text-gray-300 mb-1">
                  {col.label} {col.required && <span className="text-red-400">*</span>}
                </label>
                
                {col.type === 'rich' ? (
                  <textarea
                    value={formData[col.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                    rows={4}
                    required={col.required}
                  />
                ) : col.type === 'image' ? (
                  <div className="space-y-2">
                    {formData[col.key] && (
                      <img src={formData[col.key]} alt="" className="w-32 h-32 object-cover rounded-lg" />
                    )}
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 text-sm">
                        <ImageIcon className="w-4 h-4" />
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(col.key, e)}
                          className="hidden"
                        />
                      </label>
                      {uploading === col.key && <Loader2 className="w-4 h-4 animate-spin" />}
                    </div>
                  </div>
                ) : col.type === 'images' ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {(formData[col.key] || []).map((url: string, i: number) => (
                        <div key={i} className="relative">
                          <img src={url} alt="" className="w-24 h-24 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = [...formData[col.key]]
                              newImages.splice(i, 1)
                              setFormData({ ...formData, [col.key]: newImages })
                            }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 text-sm">
                        <ImageIcon className="w-4 h-4" />
                        Upload Images
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleImageUpload(col.key, e, true)}
                          className="hidden"
                        />
                      </label>
                      {uploading === col.key && <Loader2 className="w-4 h-4 animate-spin" />}
                    </div>
                  </div>
                ) : col.type === 'select' ? (
                  <select
                    value={formData[col.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                    required={col.required}
                  >
                    <option value="">Select...</option>
                    {col.options?.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : col.type === 'boolean' ? (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData[col.key] || false}
                      onChange={(e) => setFormData({ ...formData, [col.key]: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-300">Enabled</span>
                  </label>
                ) : col.type === 'array' ? (
                  <input
                    type="text"
                    value={(formData[col.key] || []).join(', ')}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value.split(',').map((s: string) => s.trim()) })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Comma separated values"
                  />
                ) : (
                  <input
                    type={col.type === 'number' ? 'number' : 'text'}
                    value={formData[col.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-blue-500 focus:outline-none"
                    required={col.required}
                  />
                )}
              </div>
            ))}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
              >
                {editing ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditing(null); }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4"
            >
              <div className="flex flex-col gap-1">
                <button onClick={() => moveItem(item, 'up')} disabled={index === 0} className="text-gray-500 hover:text-white disabled:opacity-30">
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveItem(item, 'down')} disabled={index === items.length - 1} className="text-gray-500 hover:text-white disabled:opacity-30">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium truncate">
                    {item.title || item.degree || item.name || 'Untitled'}
                  </span>
                  {!item.visible && (
                    <span className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400">Hidden</span>
                  )}
                </div>
                {item.organization && <p className="text-gray-400 text-sm">{item.organization}</p>}
                {item.location && <p className="text-gray-400 text-sm">{item.location}</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleVisibility(item)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title={item.visible ? 'Hide' : 'Show'}
                >
                  {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {items.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No items yet. Click &quot;Add New&quot; to create one.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
