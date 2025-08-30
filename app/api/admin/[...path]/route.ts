import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

async function checkAdminAuth(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error || !user) {
      return null
    }
    
    // In production, you might want to check user roles from a users table
    // For now, we'll just check if the user is authenticated
    return user
  } catch (error) {
    console.error('Admin auth check failed:', error)
    return null
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const user = await checkAdminAuth(request)
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Handle admin GET requests based on path
  const resolvedParams = await params
  const path = resolvedParams.path.join('/')
  
  switch (path) {
    case 'stats':
      return getStats()
    case 'recent-activity':
      return getRecentActivity()
    default:
      return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const user = await checkAdminAuth(request)
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const resolvedParams = await params
  const path = resolvedParams.path.join('/')
  
  switch (path) {
    case 'update-status':
      return updateStatus(request)
    default:
      return NextResponse.json({ error: 'Endpoint not found' }, { status: 404 })
  }
}

async function getStats() {
  try {
    const supabase = await createClient()
    
    // Get basic stats
    const [
      { count: totalProjects },
      { count: totalQuotes },
      { count: totalMessages },
      { count: newQuotes },
      { count: newMessages }
    ] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('quote_requests').select('*', { count: 'exact', head: true }),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
      supabase
        .from('quote_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new'),
      supabase
        .from('contact_messages')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unread')
    ])

    return NextResponse.json({
      totalProjects: totalProjects || 0,
      totalQuotes: totalQuotes || 0,
      totalMessages: totalMessages || 0,
      newQuotes: newQuotes || 0,
      newMessages: newMessages || 0
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

async function getRecentActivity() {
  try {
    const supabase = await createClient()
    
    // Get recent quotes and messages
    const [
      { data: recentQuotes },
      { data: recentMessages }
    ] = await Promise.all([
      supabase
        .from('quote_requests')
        .select('id, contact_name, event_name, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5),
      supabase
        .from('contact_messages')
        .select('id, name, subject, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5)
    ])

    return NextResponse.json({
      recentQuotes: recentQuotes || [],
      recentMessages: recentMessages || []
    })
  } catch (error) {
    console.error('Error fetching recent activity:', error)
    return NextResponse.json({ error: 'Failed to fetch recent activity' }, { status: 500 })
  }
}

async function updateStatus(request: NextRequest) {
  try {
    const body = await request.json()
    const { table, id, status } = body
    
    if (!table || !id || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Validate table name to prevent injection
    const allowedTables = ['quote_requests', 'contact_messages', 'projects']
    if (!allowedTables.includes(table)) {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
    }
    
    const supabase = await createClient()
    const { error } = await supabase
      .from(table)
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    if (error) {
      console.error('Error updating status:', error)
      return NextResponse.json({ error: 'Failed to update status' }, { status: 500 })
    }
    
    return NextResponse.json({ message: 'Status updated successfully' })
  } catch (error) {
    console.error('Error in updateStatus:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}