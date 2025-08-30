import { createClient } from '@/lib/supabase/server'

export interface Service {
  id: string
  slug: string
  name_tr: string
  name_en: string | null
  description_tr: string | null
  description_en: string | null
  icon: string | null
  features: string[] | null
  order_index: number | null
  is_active: boolean | null
  created_at: string
  updated_at: string
}

export async function getServices(): Promise<Service[]> {
  const supabase = await createClient()
  
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return services || []
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = await createClient()
  
  const { data: service, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null
    }
    console.error('Error fetching service:', error)
    return null
  }

  return service
}

export async function getServicesForSitemap(): Promise<Pick<Service, 'slug' | 'updated_at'>[]> {
  const supabase = await createClient()
  
  const { data: services, error } = await supabase
    .from('services')
    .select('slug, updated_at')
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching services for sitemap:', error)
    return []
  }

  return services || []
}