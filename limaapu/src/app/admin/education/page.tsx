'use client'

import { AdminSection } from '@/components/admin/AdminSection'

export default function AdminEducationPage() {
  return (
    <AdminSection
      title="Education"
      table="education"
      columns={[
        { key: 'degree', label: 'Degree', required: true },
        { key: 'institution', label: 'Institution', required: true },
        { key: 'location', label: 'Location', required: true },
        { key: 'start_year', label: 'Start Year', required: true },
        { key: 'end_year', label: 'End Year' },
        { key: 'description', label: 'Description', type: 'rich' },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'order_index', label: 'Order', type: 'number' },
        { key: 'visible', label: 'Visible', type: 'boolean' },
      ]}
      defaultValues={{
        degree: '',
        institution: '',
        location: '',
        start_year: '',
        end_year: null,
        description: '',
        image: null,
        order_index: 0,
        visible: true,
      }}
    />
  )
}
