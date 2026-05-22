# Choiti Akter Lima - Portfolio Website

Immersive cinematic 3D portfolio website for Geologist & PhD Researcher Choiti Akter Lima.

## Features

- **10 Cinematic Pages**: Home, About, Experience, Research, Education, Awards, Fieldwork, Publications, Gallery/Hobbies, Contact
- **Geology-Themed Animations**: Earth core, particle fields, strata layers, scroll-driven reveals
- **Dynamic Content**: All content managed via Supabase database
- **Admin Dashboard**: Full CRUD with image upload, reordering, visibility toggles
- **Hobby Updates System**: Each hobby group (Photography/Painting/Travel) supports multiple expandable entries
- **Contact Form**: Visitors can send messages stored in Supabase
- **SEO Optimized**: Sitemap, robots.txt, metadata, Open Graph
- **Mobile Responsive**: Fully responsive across all devices
- **Vercel Ready**: Optimized for Vercel deployment

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **Icons**: Lucide React

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at https://supabase.com
2. Go to SQL Editor and run the contents of `supabase-setup.sql`
3. Create an admin user: Authentication → Users → Add User
4. Copy your project URL and anon key

### 3. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Add Images

Place images in `public/images/`:
- `lima-hero.jpg` - Hero section portrait
- `lima-about.jpg` - About page image

### 5. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 6. Admin Access

Visit http://localhost:3000/admin/login
Use the Supabase auth credentials you created.

## Database Schema

### Tables
- `experiences` - Professional experience entries
- `education` - Education history
- `research` - Research projects (current/previous)
- `fieldwork` - Field expedition records
- `awards` - Awards and achievements
- `publications` - Published papers
- `hobbies` - Hobby groups (Photography, Painting, Travel)
- `hobby_updates` - Individual entries under each hobby group
- `contact` - Contact information and social links
- `about` - About page content and SEO metadata
- `contact_submissions` - Messages from visitors

### Hobby Updates Structure
Each hobby group can have multiple updates:
- **Title**: Entry title (e.g., "Bandarban Expedition 2024")
- **Image**: Cover photo for the entry
- **Details**: Description/bullet points (shown on click)
- **Order**: Sort order
- **Visible**: Toggle visibility

## Deploy to Vercel

1. Push to GitHub
2. Connect repo at https://vercel.com
3. Add environment variables in Vercel dashboard
4. Deploy

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home
│   ├── about/page.tsx        # About
│   ├── experience/page.tsx   # Experience
│   ├── research/page.tsx     # Research
│   ├── education/page.tsx    # Education
│   ├── awards/page.tsx       # Awards
│   ├── fieldwork/page.tsx    # Fieldwork
│   ├── publications/page.tsx # Publications
│   ├── hobbies/page.tsx      # Gallery/Hobbies
│   ├── contact/page.tsx      # Contact
│   └── admin/                # Admin Dashboard
├── components/
│   ├── 3d/                   # Animation components
│   ├── layout/               # Navigation, Footer
│   ├── sections/             # Page sections
│   ├── ui/                   # Reusable UI
│   └── admin/                # Admin components
├── lib/
│   └── supabase.ts           # Supabase client
├── types/
│   └── index.ts              # TypeScript types
└── styles/
    └── globals.css           # Global styles
```
