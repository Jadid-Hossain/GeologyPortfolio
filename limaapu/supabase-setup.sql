-- Run this SQL in your Supabase SQL Editor to create all required tables

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create storage bucket for images
insert into storage.buckets (id, name, public) values ('portfolio-images', 'portfolio-images', true);

-- Create policies for storage bucket
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'portfolio-images' );

create policy "Authenticated Upload"
on storage.objects for insert
with check ( bucket_id = 'portfolio-images' and auth.role() = 'authenticated' );

create policy "Authenticated Update"
on storage.objects for update
using ( bucket_id = 'portfolio-images' and auth.role() = 'authenticated' );

create policy "Authenticated Delete"
on storage.objects for delete
using ( bucket_id = 'portfolio-images' and auth.role() = 'authenticated' );

-- Experiences table
create table if not exists experiences (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  organization text not null,
  role text not null,
  start_date text not null,
  end_date text,
  description text not null,
  related_images text[] default '{}',
  order_index integer default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Education table
create table if not exists education (
  id uuid default uuid_generate_v4() primary key,
  degree text not null,
  institution text not null,
  location text not null,
  start_year text not null,
  end_year text,
  description text,
  image text,
  order_index integer default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Research table
create table if not exists research (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text check (category in ('current', 'previous')) not null,
  abstract text not null,
  methods text,
  formations text[] default '{}',
  images text[] default '{}',
  order_index integer default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Fieldwork table
create table if not exists fieldwork (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  location text not null,
  year text not null,
  description text,
  photos text[] default '{}',
  order_index integer default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Awards table
create table if not exists awards (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  organization text not null,
  year text not null,
  description text,
  image text,
  order_index integer default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Publications table
create table if not exists publications (
  id uuid default uuid_generate_v4() primary key,
  authors text not null,
  title text not null,
  journal text not null,
  year text not null,
  doi text,
  external_link text,
  image text,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Hobbies table (updated with cover_image)
create table if not exists hobbies (
  id uuid default uuid_generate_v4() primary key,
  category text check (category in ('Photography', 'Painting', 'Travel')) not null,
  title text not null,
  cover_image text not null,
  description text,
  order_index integer default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Hobby Updates table (NEW - for updates under each hobby)
create table if not exists hobby_updates (
  id uuid default uuid_generate_v4() primary key,
  hobby_id uuid references hobbies(id) on delete cascade not null,
  title text not null,
  image text not null,
  details text,
  order_index integer default 0,
  visible boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contact table
create table if not exists contact (
  id uuid default uuid_generate_v4() primary key,
  address text,
  emails text[] default '{}',
  message_text text,
  phone text,
  social_links jsonb default '{}',
  updated_at timestamptz default now()
);

-- About table
create table if not exists about (
  id uuid default uuid_generate_v4() primary key,
  hero_image text,
  hero_title text,
  hero_subtitle text,
  bio_content text,
  seo_title text,
  seo_description text,
  seo_keywords text,
  updated_at timestamptz default now()
);

-- Contact submissions table
create table if not exists contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS on all tables
alter table experiences enable row level security;
alter table education enable row level security;
alter table research enable row level security;
alter table fieldwork enable row level security;
alter table awards enable row level security;
alter table publications enable row level security;
alter table hobbies enable row level security;
alter table hobby_updates enable row level security;
alter table contact enable row level security;
alter table about enable row level security;
alter table contact_submissions enable row level security;

-- Public read policies
create policy "Public read experiences" on experiences for select using (visible = true);
create policy "Public read education" on education for select using (visible = true);
create policy "Public read research" on research for select using (visible = true);
create policy "Public read fieldwork" on fieldwork for select using (visible = true);
create policy "Public read awards" on awards for select using (visible = true);
create policy "Public read publications" on publications for select using (visible = true);
create policy "Public read hobbies" on hobbies for select using (visible = true);
create policy "Public read hobby_updates" on hobby_updates for select using (visible = true);
create policy "Public read contact" on contact for select using (true);
create policy "Public read about" on about for select using (true);

-- Authenticated CRUD policies for all tables
create policy "Auth CRUD experiences" on experiences for all using (auth.role() = 'authenticated');
create policy "Auth CRUD education" on education for all using (auth.role() = 'authenticated');
create policy "Auth CRUD research" on research for all using (auth.role() = 'authenticated');
create policy "Auth CRUD fieldwork" on fieldwork for all using (auth.role() = 'authenticated');
create policy "Auth CRUD awards" on awards for all using (auth.role() = 'authenticated');
create policy "Auth CRUD publications" on publications for all using (auth.role() = 'authenticated');
create policy "Auth CRUD hobbies" on hobbies for all using (auth.role() = 'authenticated');
create policy "Auth CRUD hobby_updates" on hobby_updates for all using (auth.role() = 'authenticated');
create policy "Auth CRUD contact" on contact for all using (auth.role() = 'authenticated');
create policy "Auth CRUD about" on about for all using (auth.role() = 'authenticated');

-- Contact submissions - public insert, auth read
create policy "Public insert contact_submissions" on contact_submissions for insert with check (true);
create policy "Auth read contact_submissions" on contact_submissions for select using (auth.role() = 'authenticated');
create policy "Auth delete contact_submissions" on contact_submissions for delete using (auth.role() = 'authenticated');

-- Insert default contact info
insert into contact (address, emails, message_text, social_links) values (
  '408 Wadsack Dr, Apartment F, Norman, Oklahoma 73072',
  ARRAY['lima.choiti@gmail.com', 'lima.akter.choiti-1@ou.edu', 'limaakter-2014917961@geol.du.ac.bd'],
  'I would love to hear from you!',
  '{"linkedin": "", "researchgate": "", "googleScholar": "", "orcid": ""}'
) on conflict do nothing;

-- Insert default about info
insert into about (hero_title, hero_subtitle, bio_content, seo_title, seo_description, seo_keywords) values (
  'Choiti Akter Lima',
  'Geologist | PhD Researcher',
  '',
  'Choiti Akter Lima | Geologist & PhD Researcher',
  'Choiti Akter Lima - Geologist, PhD Researcher at University of Oklahoma. Specializing in reservoir systems, subsurface geology, CO₂ storage, and energy resources.',
  'Choiti Akter Lima, Geologist, PhD Researcher, CO2 Storage, Reservoir Characterization, University of Oklahoma, Subsurface Geology, Energy Resources'
) on conflict do nothing;
