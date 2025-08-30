"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Images, 
  Search, 
  Check, 
  X,
  Loader2
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import Image from "next/image"

interface GalleryImage {
  id: string
  name: string
  url: string
  size: number
  category?: string
  created_at: string
}

interface GallerySelectorProps {
  onSelect?: (selectedUrls: string[]) => void
  multiple?: boolean
  maxSelection?: number
  selectedImages?: string[]
  triggerText?: string
  category?: string
}

export function GallerySelector({ 
  onSelect,
  multiple = true,
  maxSelection = 10,
  selectedImages = [],
  triggerText = "Galeriden Seç",
  category
}: GallerySelectorProps) {
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUrls, setSelectedUrls] = useState<string[]>(selectedImages)
  
  const supabase = createClient()

  useEffect(() => {
    if (open) {
      loadGalleryImages()
    }
  }, [open])

  useEffect(() => {
    // Filter images based on search term
    const filtered = images.filter(image =>
      image.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredImages(filtered)
  }, [images, searchTerm])

  const loadGalleryImages = async () => {
    setLoading(true)
    try {
      // Load images from the single projects bucket (with different categories)
      const buckets = [
        { name: 'projects', category: 'project' }
      ]
      
      let allImages: GalleryImage[] = []
      
      for (const bucket of buckets) {
        try {
          const { data, error } = await supabase.storage
            .from(bucket.name)
            .list('', {
              limit: 100,
              offset: 0,
              sortBy: { column: 'created_at', order: 'desc' }
            })

          if (error) {
            console.warn(`Error loading from ${bucket.name}:`, error)
            continue
          }

          const bucketImages: GalleryImage[] = data
            .filter(file => file.name && !file.name.includes('.emptyFolderPlaceholder'))
            .map((file) => {
              // Determine category from file path or name
              let fileCategory = bucket.category
              if (file.name.includes('stand-type') || file.name.startsWith('stand-types/')) {
                fileCategory = 'stand-type'
              } else if (file.name.includes('service') || file.name.startsWith('services/')) {
                fileCategory = 'service'
              } else if (file.name.includes('project') || file.name.startsWith('projects/')) {
                fileCategory = 'project'
              }
              
              return {
                id: file.id || `${bucket.name}-${file.name}`,
                name: file.name,
                url: supabase.storage.from(bucket.name).getPublicUrl(file.name).data.publicUrl,
                size: file.metadata?.size || 0,
                category: fileCategory,
                created_at: file.created_at || new Date().toISOString()
              }
            })
          
          allImages = [...allImages, ...bucketImages]
        } catch (bucketError) {
          console.warn(`Error loading from ${bucket.name}:`, bucketError)
        }
      }
      
      // Filter by category if specified
      const filteredImages = category ? allImages.filter(img => img.category === category) : allImages
      setImages(filteredImages)
    } catch (error) {
      console.error('Error loading gallery images:', error)
      toast.error("Galeri resimleri yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const toggleImageSelection = (imageUrl: string) => {
    if (!multiple) {
      // Single selection mode
      setSelectedUrls([imageUrl])
      return
    }

    // Multiple selection mode
    if (selectedUrls.includes(imageUrl)) {
      setSelectedUrls(selectedUrls.filter(url => url !== imageUrl))
    } else {
      if (selectedUrls.length < maxSelection) {
        setSelectedUrls([...selectedUrls, imageUrl])
      } else {
        toast.error(`Maksimum ${maxSelection} resim seçebilirsiniz`)
      }
    }
  }

  const handleConfirmSelection = () => {
    onSelect?.(selectedUrls)
    setOpen(false)
    toast.success(`${selectedUrls.length} resim seçildi`)
  }

  const handleCancel = () => {
    setSelectedUrls(selectedImages) // Reset to original selection
    setOpen(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Images className="h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Galeriden Resim Seç</DialogTitle>
          <DialogDescription>
            {multiple 
              ? `Maksimum ${maxSelection} resim seçebilirsiniz. Şu anda ${selectedUrls.length} resim seçili.`
              : "Bir resim seçin."
            }
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="search">Ara</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Resim adı ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Image Grid */}
          <div className="overflow-y-auto max-h-96">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Galeriden resimler yükleniyor...</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {filteredImages.map((image) => {
                  const isSelected = selectedUrls.includes(image.url)
                  
                  return (
                    <Card 
                      key={image.id}
                      className={`cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 ${
                        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                      onClick={() => toggleImageSelection(image.url)}
                    >
                      <CardContent className="p-2 relative">
                        <div className="aspect-square relative">
                          <Image
                            src={image.url}
                            alt={image.name}
                            fill
                            className="object-cover rounded-sm"
                          />
                          
                          {/* Selection Indicator */}
                          <div className={`absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                            isSelected 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-black/50 text-white'
                          }`}>
                            {isSelected ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <div className="w-3 h-3 border border-current rounded-full" />
                            )}
                          </div>
                        </div>
                        
                        {/* Image Info */}
                        <div className="mt-2 space-y-1">
                          <p className="text-xs font-medium truncate" title={image.name}>
                            {image.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(image.size)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
            
            {!loading && filteredImages.length === 0 && (
              <div className="text-center py-8">
                <Images className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm ? "Arama kriterlerinize uygun resim bulunamadı" : "Galeride hiç resim yok"}
                </p>
                {!searchTerm && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Önce galeriye resim yükleyin
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedUrls.length} / {multiple ? maxSelection : 1} seçili
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              İptal
            </Button>
            
            <Button 
              onClick={handleConfirmSelection}
              disabled={selectedUrls.length === 0}
            >
              <Check className="mr-2 h-4 w-4" />
              Seç ({selectedUrls.length})
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}