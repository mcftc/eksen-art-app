"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Instagram, 
  ExternalLink, 
  Heart, 
  MessageCircle, 
  Share2,
  Play,
  Loader2,
  AlertCircle
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { InstagramPost } from "@/lib/instagram"

interface InstagramFeedProps {
  limit?: number
  columns?: number
  showCaption?: boolean
  showHeader?: boolean
  className?: string
}

export function InstagramFeed({ 
  limit = 12, 
  columns = 3,
  showCaption = true,
  showHeader = true,
  className = "" 
}: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'api' | 'mock'>('api')

  useEffect(() => {
    fetchInstagramPosts()
  }, [limit])

  const fetchInstagramPosts = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/instagram?limit=${limit}`)
      const data = await response.json()

      if (data.success) {
        setPosts(data.data || [])
        setSource(data.source || 'api')
      } else {
        setError(data.error || 'Instagram gönderileri yüklenemedi')
      }
    } catch (err) {
      console.error('Instagram feed error:', err)
      setError('Instagram bağlantısında sorun oluştu')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Bugün'
    if (diffInDays === 1) return 'Dün'
    if (diffInDays < 7) return `${diffInDays} gün önce`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} hafta önce`
    return date.toLocaleDateString('tr-TR')
  }

  const truncateCaption = (caption: string, maxLength: number = 100) => {
    if (caption.length <= maxLength) return caption
    return caption.slice(0, maxLength) + '...'
  }

  const getGridClass = () => {
    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
    }
    return colClasses[columns as keyof typeof colClasses] || colClasses[3]
  }

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {showHeader && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="h-8 w-8 text-pink-500" />
              <h2 className="text-2xl font-bold">Instagram</h2>
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <span className="ml-3 text-muted-foreground">Instagram gönderileri yükleniyor...</span>
        </div>
      </div>
    )
  }

  if (error && posts.length === 0) {
    return (
      <div className={`space-y-6 ${className}`}>
        {showHeader && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="h-8 w-8 text-pink-500" />
              <h2 className="text-2xl font-bold">Instagram</h2>
            </div>
          </div>
        )}
        
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground text-center mb-4">{error}</p>
          <Button variant="outline" onClick={fetchInstagramPosts}>
            Tekrar Dene
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showHeader && (
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="h-8 w-8 text-pink-500" />
            <h2 className="text-2xl font-bold">Instagram</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            En son projelerimizi ve çalışmalarımızı Instagram&apos;da takip edin. 
            Yaratıcı tasarımlarımız ve profesyonel çözümlerimizle fark yaratıyoruz.
          </p>
          
          {source === 'mock' && (
            <Badge variant="outline" className="mt-2">
              Demo Verisi - API token yapılandırması gerekli
            </Badge>
          )}
        </div>
      )}

      <div className={`grid ${getGridClass()} gap-6`}>
        {posts.map((post, index) => (
          <Card key={post.id || index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Image/Video */}
              <div className="relative aspect-square">
                <Image
                  src={post.thumbnail_url || post.media_url || ''}
                  alt={post.caption ? truncateCaption(post.caption, 50) : 'Instagram gönderi'}
                  fill
                  className="object-cover"
                />
                
                {/* Media Type Indicator */}
                {post.media_type === 'VIDEO' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="h-12 w-12 text-white opacity-80" />
                  </div>
                )}
                
                {post.media_type === 'CAROUSEL_ALBUM' && (
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      Albüm
                    </Badge>
                  </div>
                )}

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-5 w-5" />
                          <span className="text-sm">Beğen</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-sm">Yorum</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Share2 className="h-5 w-5" />
                          <span className="text-sm">Paylaş</span>
                        </div>
                      </div>
                      
                      <Link 
                        href={post.permalink || `https://www.instagram.com/eksenartmimarlik/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 hover:text-pink-300 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Caption and Meta */}
              {showCaption && (
                <div className="p-4 space-y-3">
                  {post.caption && (
                    <p className="text-sm leading-relaxed">
                      {truncateCaption(post.caption, 120)}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(post.timestamp)}</span>
                    <Link 
                      href={post.permalink || `https://www.instagram.com/eksenartmimarlik/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-pink-500 transition-colors"
                    >
                      Instagram&apos;da gör
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Follow Us Button */}
      <div className="text-center">
        <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
          <Link 
            href="https://www.instagram.com/eksenartmimarlik/" 
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="mr-2 h-4 w-4" />
            Instagram&apos;da Takip Et
          </Link>
        </Button>
      </div>
    </div>
  )
}