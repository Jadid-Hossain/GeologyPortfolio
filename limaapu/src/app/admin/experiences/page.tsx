'use client'

import { AdminSection } from '@/components/admin/AdminSection'

export default function AdminExperiencesPage() {
  return (
    <AdminSection
      title="Experiences"
      table="experiences"
      columns={[
        { key: 'title', label: 'Title', required: true },
        { key: 'organization', label: 'Organization', required: true },
        { key: 'role', label: 'Role', required: true },
        { key: 'start_date', label: 'Start Date', required: true },
        { key: 'end_date', label: 'End Date' },
        { key: 'description', label: 'Description', type: 'rich', required: true },
        { key: 'related_images', label: 'Images', type: 'images' },
        { key: 'order_index', label: 'Order', type: 'number' },
        { key: 'visible', label: 'Visible', type: 'boolean' },
      ]}
      defaultValues={{
        title: '',
        organization: '',
        role: '',
        start_date: '',
        end_date: null,
        description: '',
        related_images: [],
        order_index: 0,
        visible: true,
      }}
    />
  )
}
