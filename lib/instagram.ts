interface InstagramPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
  timestamp: string
}

interface InstagramApiResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

class InstagramService {
  private readonly baseUrl = 'https://graph.instagram.com'
  private readonly accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  async getUserMedia(limit: number = 12): Promise<InstagramPost[]> {
    if (!this.accessToken) {
      console.warn('Instagram access token not configured')
      return []
    }

    try {
      const fields = [
        'id',
        'caption',
        'media_type',
        'media_url',
        'thumbnail_url',
        'permalink',
        'timestamp'
      ].join(',')

      const url = `${this.baseUrl}/me/media?fields=${fields}&limit=${limit}&access_token=${this.accessToken}`
      
      const response = await fetch(url, {
        next: { 
          revalidate: 3600 // Cache for 1 hour
        }
      })

      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status} ${response.statusText}`)
      }

      const data: InstagramApiResponse = await response.json()
      return data.data || []
    } catch (error) {
      console.error('Error fetching Instagram posts:', error)
      return []
    }
  }

  async refreshToken(): Promise<{ access_token: string; expires_in: number } | null> {
    if (!this.accessToken) {
      return null
    }

    try {
      const url = `${this.baseUrl}/refresh_access_token?grant_type=ig_refresh_token&access_token=${this.accessToken}`
      
      const response = await fetch(url, {
        method: 'GET'
      })

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error refreshing Instagram token:', error)
      return null
    }
  }

  // Fallback: Get posts using public scraping (less reliable)
  async getPublicPosts(username: string, limit: number = 12): Promise<Partial<InstagramPost>[]> {
    try {
      // This is a simplified fallback - in production you might use a service like:
      // - Instagram Web API (unofficial)
      // - Third-party services like RapidAPI Instagram scrapers
      // For now, return mock data for demonstration
      
      return this.getMockData(limit)
    } catch (error) {
      console.error('Error fetching public Instagram posts:', error)
      return this.getMockData(limit)
    }
  }

  private getMockData(limit: number): Partial<InstagramPost>[] {
    const mockPosts: Partial<InstagramPost>[] = []
    
    for (let i = 0; i < limit; i++) {
      mockPosts.push({
        id: `mock_${i}`,
        caption: `Eksenart Mimarlık - Profesyonel stand tasarımı örneği ${i + 1}. İnovatif çözümler ve kaliteli işçilik ile fark yaratıyoruz. #eksenart #standtasarımı #mimarlık #fuar`,
        media_type: 'IMAGE',
        media_url: `https://picsum.photos/400/400?random=${i}`,
        permalink: `https://www.instagram.com/p/mock${i}/`,
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
      })
    }
    
    return mockPosts
  }
}

export const instagramService = new InstagramService()
export type { InstagramPost }