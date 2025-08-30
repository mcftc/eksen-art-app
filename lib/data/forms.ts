import { createClient } from '@/lib/supabase/client'

export interface QuoteRequestData {
  company_name?: string
  contact_name: string
  email: string
  phone?: string
  stand_type?: string
  event_name?: string
  event_date?: string
  location?: string
  size_sqm?: number
  budget_range?: string
  message?: string
  source?: string
}

export interface ContactMessageData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export async function submitQuoteRequest(data: QuoteRequestData) {
  const supabase = createClient()
  
  const { data: quoteRequest, error } = await supabase
    .from('quote_requests')
    .insert([{
      ...data,
      ip_address: await getClientIP(),
      user_agent: navigator.userAgent,
    }])
    .select()
    .single()

  if (error) {
    console.error('Error submitting quote request:', error)
    throw new Error('Teklif talebi gönderilirken bir hata oluştu.')
  }

  return quoteRequest
}

export async function submitContactMessage(data: ContactMessageData) {
  const supabase = createClient()
  
  const { data: contactMessage, error } = await supabase
    .from('contact_messages')
    .insert([{
      ...data,
      ip_address: await getClientIP(),
    }])
    .select()
    .single()

  if (error) {
    console.error('Error submitting contact message:', error)
    throw new Error('Mesaj gönderilirken bir hata oluştu.')
  }

  return contactMessage
}

async function getClientIP(): Promise<string | null> {
  try {
    const response = await fetch('/api/get-ip')
    const data = await response.json()
    return data.ip || null
  } catch (error) {
    console.error('Error getting client IP:', error)
    return null
  }
}