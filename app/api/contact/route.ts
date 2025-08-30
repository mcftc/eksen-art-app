import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

// Rate limiting (simple in-memory store - use Redis in production)
const rateLimit = new Map()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3 // Max 3 requests per window

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

function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000) // Limit length and trim whitespace
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP and check rate limit
    const clientIP = getClientIP(request)
    
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.' },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'İsim, e-posta ve mesaj alanları zorunludur.' },
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

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      phone: phone ? sanitizeInput(phone) : null,
      subject: subject ? sanitizeInput(subject) : null,
      message: sanitizeInput(message),
      ip_address: clientIP,
      user_agent: request.headers.get('user-agent') || null,
      status: 'unread'
    }

    // Save to database
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([sanitizedData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' },
        { status: 500 }
      )
    }

    // TODO: Send email notification to admin
    // await sendEmailNotification(sanitizedData)

    return NextResponse.json({ 
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      id: data.id
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Beklenmeyen bir hata oluştu.' },
      { status: 500 }
    )
  }
}