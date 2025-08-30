import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Get client IP from various possible headers
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  const clientIP = 
    forwardedFor?.split(',')[0] ||
    realIP ||
    cfConnectingIP ||
    '127.0.0.1'

  return NextResponse.json({ ip: clientIP })
}