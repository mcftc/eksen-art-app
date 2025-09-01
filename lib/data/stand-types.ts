import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export interface StandType {
  id: string
  slug: string
  name_tr: string
  name_en: string | null
  description_tr: string | null
  description_en: string | null
  features: string[] | null
  materials: string[] | null
  sizes: string[] | null
  lead_time: string | null
  ideal_for: string | null
  images: string[] | null
  order_index: number | null
  is_active: boolean | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export async function getStandTypes(): Promise<StandType[]> {
  try {
    const supabase = await createClient()
    
    const { data: standTypes, error } = await supabase
      .from('stand_types')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Error fetching stand types:', error)
      return []
    }

    return standTypes || []
  } catch (error) {
    console.error('Error in getStandTypes:', error)
    return []
  }
}

export async function getStandTypeBySlug(slug: string): Promise<StandType | null> {
  const supabase = await createClient()
  
  const { data: standType, error } = await supabase
    .from('stand_types')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null
    }
    console.error('Error fetching stand type:', error)
    return null
  }

  return standType
}

export async function getStandTypesForSitemap(): Promise<Pick<StandType, 'slug' | 'updated_at'>[]> {
  const supabase = await createClient()
  
  const { data: standTypes, error } = await supabase
    .from('stand_types')
    .select('slug, updated_at')
    .eq('is_active', true)

  if (error) {
    console.error('Error fetching stand types for sitemap:', error)
    return []
  }

  return standTypes || []
}