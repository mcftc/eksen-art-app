import { createClient } from '@/lib/supabase/server'

export interface Project {
  id: string
  slug: string
  title: string
  client_name: string | null
  stand_type_id: string | null
  location: string | null
  event_name: string | null
  event_date: string | null
  size_sqm: number | null
  description: string | null
  features: string[] | null
  images: string[] | null
  is_featured: boolean | null
  is_active: boolean | null
  view_count: number | null
  created_at: string
  updated_at: string
  stand_types?: {
    name_tr: string
    slug: string
  }
}

export async function getProjects(limit?: number): Promise<Project[]> {
  const supabase = await createClient()
  
  let query = supabase
    .from('projects')
    .select(`
      *,
      stand_types (
        name_tr,
        slug
      )
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data: projects, error } = await query

  if (error) {
    console.error('Error fetching projects:', error)
    return []
  }

  return projects || []
}

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      stand_types (
        name_tr,
        slug
      )
    `)
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured projects:', error)
    return []
  }

  return projects || []
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient()
  
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      stand_types (
        name_tr,
        slug
      )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null
    }
    console.error('Error fetching project:', error)
    return null
  }

  // Increment view count
  await supabase
    .from('projects')
    .update({ view_count: (project.view_count || 0) + 1 })
    .eq('id', project.id)

  return project
}

export async function getProjectsByStandType(standTypeSlug: string, limit = 4): Promise<Project[]> {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      *,
      stand_types!inner (
        name_tr,
        slug
      )
    `)
    .eq('stand_types.slug', standTypeSlug)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching projects by stand type:', error)
    return []
  }

  return projects || []
}

export async function getProjectsForSitemap(): Promise<Pick<Project, 'slug' | 'updated_at'>[]> {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('slug, updated_at')
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching projects for sitemap:', error)
    return []
  }

  return projects || []
}