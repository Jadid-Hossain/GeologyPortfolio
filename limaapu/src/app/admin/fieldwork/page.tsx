'use client'

import { AdminSection } from '@/components/admin/AdminSection'

export default function AdminFieldworkPage() {
  return (
    <AdminSection
      title="Fieldwork"
      table="fieldwork"
      columns={[
        { key: 'title', label: 'Title', required: true },
        { key: 'location', label: 'Location', required: true },
        { key: 'year', label: 'Year', required: true },
        { key: 'description', label: 'Description', type: 'rich' },
        { key: 'photos', label: 'Photos', type: 'images' },
        { key: 'order_index', label: 'Order', type: 'number' },
        { key: 'visible', label: 'Visible', type: 'boolean' },
      ]}
      defaultValues={{
        title: '',
        location: '',
        year: '',
        description: '',
        photos: [],
        order_index: 0,
        visible: true,
      }}
    />
  )
}
