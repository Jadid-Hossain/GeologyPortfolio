'use client'

import { AdminSection } from '@/components/admin/AdminSection'

export default function AdminResearchPage() {
  return (
    <AdminSection
      title="Research"
      table="research"
      columns={[
        { key: 'title', label: 'Title', required: true },
        { key: 'category', label: 'Category', type: 'select', options: ['current', 'previous'], required: true },
        { key: 'abstract', label: 'Abstract', type: 'rich', required: true },
        { key: 'methods', label: 'Methods', type: 'rich' },
        { key: 'formations', label: 'Formations', type: 'array' },
        { key: 'images', label: 'Images', type: 'images' },
        { key: 'order_index', label: 'Order', type: 'number' },
        { key: 'visible', label: 'Visible', type: 'boolean' },
      ]}
      defaultValues={{
        title: '',
        category: 'current',
        abstract: '',
        methods: '',
        formations: [],
        images: [],
        order_index: 0,
        visible: true,
      }}
    />
  )
}
