"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Upload, 
  Trash2, 
  Eye, 
  Download, 
  Plus, 
  Search,
  Filter,
  Image as ImageIcon
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { ImageUpload } from "@/components/ui/image-upload"

interface ImageFile {
  id: string
  name: string
  url: string
  size: number
  type: string
  category?: string
  project_id?: string
  created_at: string
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [uploadCategory, setUploadCategory] = useState<'project' | 'stand-type' | 'service' | 'general'>('general')
  
  const supabase = createClient()

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      // Load images from the single projects bucket (with different categories)
      const buckets = [
        { name: 'projects', category: 'project' }
      ]
      
      let allImages: ImageFile[] = []
      
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

          const bucketImages: ImageFile[] = data
            .filter(file => file.name && !file.name.includes('.emptyFolderPlaceholder'))
            .map((file) => {
              // Determine category from file path or name
              let category = bucket.category
              if (file.name.includes('stand-type') || file.name.startsWith('stand-types/')) {
                category = 'stand-type'
              } else if (file.name.includes('service') || file.name.startsWith('services/')) {
                category = 'service'
              } else if (file.name.includes('project') || file.name.startsWith('projects/')) {
                category = 'project'
              }
              
              return {
                id: file.id || `${bucket.name}-${file.name}`,
                name: file.name,
                url: supabase.storage.from(bucket.name).getPublicUrl(file.name).data.publicUrl,
                size: file.metadata?.size || 0,
                type: file.metadata?.mimetype || 'image',
                category: category,
                created_at: file.created_at || new Date().toISOString()
              }
            })
          
          allImages = [...allImages, ...bucketImages]
        } catch (bucketError) {
          console.warn(`Error loading from ${bucket.name}:`, bucketError)
        }
      }

      setImages(allImages)
    } catch (error) {
      console.error('Error loading images:', error)
      toast.error("Resimler yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (urls: string[]) => {
    loadImages() // Refresh the gallery
  }

  const deleteImages = async (imageNames: string[]) => {
    try {
      const { error } = await supabase.storage
        .from('projects')
        .remove(imageNames)

      if (error) throw error

      toast.success(`${imageNames.length} resim silindi`)
      
      setSelectedImages([])
      loadImages()
    } catch (error) {
      console.error('Delete error:', error)
      toast.error("Resimler silinirken hata oluştu")
    }
  }


  const toggleImageSelection = (imageName: string) => {
    setSelectedImages(prev => 
      prev.includes(imageName) 
        ? prev.filter(name => name !== imageName)
        : [...prev, imageName]
    )
  }

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || (image.category && image.category === filterCategory)
    return matchesSearch && matchesFilter
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Galeri Yönetimi</h1>
          <p className="text-muted-foreground">
            Proje resimleri ve site görsellerini yönetin
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          
          {selectedImages.length > 0 && (
            <Button 
              variant="destructive" 
              onClick={() => deleteImages(selectedImages)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Seçilenleri Sil ({selectedImages.length})
            </Button>
          )}
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1">
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
        
        <div className="w-48">
          <Label htmlFor="filter">Kategori</Label>
          <select
            id="filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">Tüm Kategoriler ({images.length})</option>
            <option value="project">Projeler ({images.filter(img => img.category === 'project').length})</option>
            <option value="stand-type">Stand Tipleri ({images.filter(img => img.category === 'stand-type').length})</option>
            <option value="service">Hizmetler ({images.filter(img => img.category === 'service').length})</option>
            <option value="general">Genel ({images.filter(img => img.category === 'general').length})</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Toplam Resim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{images.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Toplam Boyut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatFileSize(images.reduce((total, img) => total + img.size, 0))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Bu Ay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {images.filter(img => {
                const imgDate = new Date(img.created_at)
                const now = new Date()
                return imgDate.getMonth() === now.getMonth() && 
                       imgDate.getFullYear() === now.getFullYear()
              }).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Seçili</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedImages.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Image Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Resim Yükle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Category Selection */}
            <div className="w-48">
              <Label htmlFor="upload-category">Yüklenecek Kategori</Label>
              <select
                id="upload-category"
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value as 'project' | 'stand-type' | 'service' | 'general')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="general">Genel</option>
                <option value="project">Projeler</option>
                <option value="stand-type">Stand Tipleri</option>
                <option value="service">Hizmetler</option>
              </select>
            </div>
            
            <ImageUpload
              onUpload={handleImageUpload}
              maxFiles={20}
              multiple={true}
              existingImages={[]}
              category={uploadCategory}
              bucket="projects"
            />
          </div>
        </CardContent>
      </Card>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredImages.map((image) => (
          <Card 
            key={image.id} 
            className={`cursor-pointer transition-all ${
              selectedImages.includes(image.name) 
                ? 'ring-2 ring-primary bg-primary/5' 
                : 'hover:shadow-md'
            }`}
            onClick={() => toggleImageSelection(image.name)}
          >
            <CardContent className="p-2">
              <div className="aspect-square relative mb-2 bg-muted rounded-md overflow-hidden">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-1 right-1 flex space-x-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{image.name}</DialogTitle>
                        <DialogDescription>
                          Boyut: {formatFileSize(image.size)} | 
                          Tarih: {new Date(image.created_at).toLocaleDateString('tr-TR')}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-auto max-h-96 object-contain rounded-md"
                        />
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-muted-foreground">
                          URL: {image.url}
                        </div>
                        <Button asChild>
                          <a href={image.url} download target="_blank">
                            <Download className="mr-2 h-4 w-4" />
                            İndir
                          </a>
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-xs font-medium truncate">{image.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(image.size)}
                </p>
                {image.category && (
                  <Badge variant="secondary" className="text-xs">
                    {image.category}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">Resim bulunamadı</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Arama kriterlerinize uygun resim bulunamadı" : "Henüz hiç resim yüklenmemiş"}
          </p>
        </div>
      )}
    </div>
  )
}