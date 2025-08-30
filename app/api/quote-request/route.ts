import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimit = new Map()
const RATE_LIMIT_WINDOW = 30 * 60 * 1000 // 30 minutes
const RATE_LIMIT_MAX_REQUESTS = 2 // Max 2 quote requests per window

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userRequests = rateLimit.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW }

  if (now > userRequests.resetTime) {
    userRequests.count = 0
    userRequests.resetTime = now + RATE_LIMIT_WINDOW
  }

  if (userRequests.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }

  userRequests.count++
  rateLimit.set(ip, userRequests)
  return true
}

function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  return forwardedFor?.split(',')[0] || realIP || cfConnectingIP || '127.0.0.1'
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateDate(dateString: string): boolean {
  const date = new Date(dateString)
  return !isNaN(date.getTime()) && date > new Date()
}

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 500) // Limit length and trim whitespace
}

function validateStandType(standType: string): boolean {
  const validTypes = ['ahsap', 'maxima', 'moduler', 'paket', 'ozel']
  return validTypes.includes(standType.toLowerCase())
}

function validateBudgetRange(budget: string): boolean {
  const validRanges = ['10k-25k', '25k-50k', '50k-100k', '100k+', 'belirtilmedi']
  return validRanges.includes(budget)
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP and check rate limit
    const clientIP = getClientIP(request)
    
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Çok fazla teklif talebi gönderdiniz. Lütfen 30 dakika sonra tekrar deneyin.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const {
      company_name,
      contact_name,
      email,
      phone,
      stand_type,
      event_name,
      event_date,
      location,
      size_sqm,
      budget_range,
      message
    } = body

    // Validate required fields
    if (!contact_name || !email) {
      return NextResponse.json(
        { error: 'İletişim kişisi ve e-posta alanları zorunludur.' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi girin.' },
        { status: 400 }
      )
    }

    // Validate event date if provided
    if (event_date && !validateDate(event_date)) {
      return NextResponse.json(
        { error: 'Geçerli bir etkinlik tarihi girin (gelecekte bir tarih olmalı).' },
        { status: 400 }
      )
    }

    // Validate stand type if provided
    if (stand_type && !validateStandType(stand_type)) {
      return NextResponse.json(
        { error: 'Geçerli bir stand tipi seçin.' },
        { status: 400 }
      )
    }

    // Validate budget range if provided
    if (budget_range && !validateBudgetRange(budget_range)) {
      return NextResponse.json(
        { error: 'Geçerli bir bütçe aralığı seçin.' },
        { status: 400 }
      )
    }

    // Validate size if provided
    if (size_sqm && (isNaN(parseInt(size_sqm)) || parseInt(size_sqm) < 1 || parseInt(size_sqm) > 10000)) {
      return NextResponse.json(
        { error: 'Stand boyutu 1 ile 10000 m² arasında olmalıdır.' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      company_name: company_name ? sanitizeInput(company_name) : null,
      contact_name: sanitizeInput(contact_name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : null,
      stand_type: stand_type ? sanitizeInput(stand_type) : null,
      event_name: event_name ? sanitizeInput(event_name) : null,
      event_date: event_date || null,
      location: location ? sanitizeInput(location) : null,
      size_sqm: size_sqm ? parseInt(size_sqm) : null,
      budget_range: budget_range || null,
      message: message ? sanitizeInput(message) : null,
      status: 'new',
      source: 'website',
      ip_address: clientIP,
      user_agent: request.headers.get('user-agent') || null
    }

    // Save to database
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('quote_requests')
      .insert([sanitizedData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Teklif talebi gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' },
        { status: 500 }
      )
    }

    // TODO: Send email notification to admin and acknowledgment to customer
    // await sendQuoteRequestNotification(sanitizedData)

    return NextResponse.json({ 
      message: 'Teklif talebiniz başarıyla gönderildi. Uzman ekibimiz en kısa sürede sizinle iletişime geçecek.',
      id: data.id,
      reference_number: `EKS-${data.id.slice(-6).toUpperCase()}`
    })

  } catch (error) {
    console.error('Quote request error:', error)
    return NextResponse.json(
      { error: 'Beklenmeyen bir hata oluştu.' },
      { status: 500 }
    )
  }
}