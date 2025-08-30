import { NextResponse } from 'next/server'
import { instagramService } from '@/lib/instagram'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '12', 10)
    const username = process.env.NEXT_PUBLIC_INSTAGRAM_USERNAME || 'eksenartmimarlik'

    // Try to get posts using access token first
    let posts = await instagramService.getUserMedia(limit)

    // If no posts from API (token not configured or expired), use fallback
    if (posts.length === 0) {
      console.log('Using fallback method for Instagram posts')
      const fallbackPosts = await instagramService.getPublicPosts(username, limit)
      // Convert partial posts to full posts with required fields
      posts = fallbackPosts.map(post => ({
        id: post.id || `fallback_${Date.now()}_${Math.random()}`,
        caption: post.caption,
        media_type: post.media_type || 'IMAGE',
        media_url: post.media_url || '',
        thumbnail_url: post.thumbnail_url,
        permalink: post.permalink || 'https://www.instagram.com/eksenartmimarlik/',
        timestamp: post.timestamp || new Date().toISOString()
      }))
    }

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
      source: posts.length > 0 && posts[0].id?.startsWith('mock_') ? 'mock' : 'api'
    })

  } catch (error) {
    console.error('Instagram API route error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Instagram verisi alınırken hata oluştu',
      data: [],
      count: 0
    }, { 
      status: 500 
    })
  }
}

// Enable ISR for better performance
export const revalidate = 3600 // 1 hour