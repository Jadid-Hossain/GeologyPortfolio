'use client'

import { AdminSection } from '@/components/admin/AdminSection'

export default function AdminPublicationsPage() {
  return (
    <AdminSection
      title="Publications"
      table="publications"
      columns={[
        { key: 'authors', label: 'Authors', required: true },
        { key: 'title', label: 'Title', required: true },
        { key: 'journal', label: 'Journal', required: true },
        { key: 'year', label: 'Year', required: true },
        { key: 'doi', label: 'DOI' },
        { key: 'external_link', label: 'External Link' },
        { key: 'image', label: 'Image', type: 'image' },
        { key: 'visible', label: 'Visible', type: 'boolean' },
      ]}
      defaultValues={{
        authors: '',
        title: '',
        journal: '',
        year: '',
        doi: null,
        external_link: null,
        image: null,
        visible: true,
      }}
    />
  )
}
