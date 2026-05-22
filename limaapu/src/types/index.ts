export interface Experience {
  id: string
  title: string
  organization: string
  role: string
  startDate: string
  endDate: string | null
  description: string
  relatedImages: string[]
  order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startYear: string
  endYear: string | null
  description: string
  image: string | null
  order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Research {
  id: string
  title: string
  category: 'current' | 'previous'
  abstract: string
  methods: string
  formations: string[]
  images: string[]
  order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Fieldwork {
  id: string
  title: string
  location: string
  year: string
  description: string
  photos: string[]
  order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Award {
  id: string
  title: string
  organization: string
  year: string
  description: string
  image: string | null
  order: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Publication {
  id: string
  authors: string
  title: string
  journal: string
  year: string
  doi: string | null
  externalLink: string | null
  image: string | null
  visible: boolean
  created_at: string
  updated_at: string
}

export interface HobbyUpdate {
  id: string
  hobbyId: string
  hobby_id?: string
  title: string
  image: string
  details: string
  order: number
  order_index?: number
  visible: boolean
  created_at: string
  updated_at: string
}

export interface Hobby {
  id: string
  category: 'Photography' | 'Painting' | 'Travel'
  title: string
  coverImage: string
  cover_image?: string
  description: string
  order: number
  order_index?: number
  visible: boolean
  created_at: string
  updated_at: string
  updates?: HobbyUpdate[]
}

export interface ContactInfo {
  id: string
  address: string
  emails: string[]
  messageText: string
  phone: string | null
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
    researchgate?: string
    googleScholar?: string
    orcid?: string
  }
  updated_at: string
}

export interface AboutInfo {
  id: string
  heroImage: string | null
  heroTitle: string
  heroSubtitle: string
  bioContent: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}
