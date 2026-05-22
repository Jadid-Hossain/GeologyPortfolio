'use client'

import { AdminSection } from '@/components/admin/AdminSection'

export default function AdminAwardsPage() {
  return (
    <AdminSection
      title="Awards"
      table="awards"
      columns={[
        { key: 'title', label: 'Title', required: true },
        { key: 'organization', label: 'Organization', required: true },
        { key: 'year', label: 'Year', required: true },
        { key: 'description', label: 'Description', type: 'rich' },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'order_index', label: 'Order', type: 'number' },
        { key: 'visible', label: 'Visible', type: 'boolean' },
      ]}
      defaultValues={{
        title: '',
        organization: '',
        year: '',
        description: '',
        image: null,
        order_index: 0,
        visible: true,
      }}
    />
  )
}
