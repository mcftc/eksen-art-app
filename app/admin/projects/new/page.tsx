"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Plus, Save } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface ProjectFormData {
  title: string
  slug: string
  client_name: string
  location: string
  event_name: string
  event_date: string
  size_sqm: number
  description: string
  features: string[]
  is_featured: boolean
}

export default function NewProjectPage() {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    slug: "",
    client_name: "",
    location: "",
    event_name: "",
    event_date: "",
    size_sqm: 0,
    description: "",
    features: [],
    is_featured: false
  })
  
  const [images, setImages] = useState<File[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

    const handleInputChange = <K extends keyof ProjectFormData>(field: K, value: ProjectFormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }))

        if (field === 'title') {
            const title = value as string
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim()
            setFormData(prev => ({ ...prev, slug }))
        }
    }
  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(prev => [...prev, ...files])
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async () => {
    const uploadedUrls: string[] = []
    
    for (const image of images) {
      const fileName = `projects/${Date.now()}-${image.name}`
      
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, image)
      
      if (error) {
        console.error('Image upload error:', error)
        continue
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName)
      
      uploadedUrls.push(publicUrl)
    }
    
    return uploadedUrls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Upload images first
      const imageUrls = await uploadImages()
      
      // Insert project data
      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...formData,
          images: imageUrls,
          view_count: 0
        })
        .select()

      if (error) throw error

      toast.success("Proje başarıyla oluşturuldu")

      router.push('/admin/projects')
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error("Proje oluşturulurken hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Yeni Proje Ekle</h1>
        <p className="text-muted-foreground">
          Yeni bir proje oluşturun ve galeriyi zenginleştirin
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Proje Başlığı *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Örn: Istanbul Tech Summit 2024 Stand"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="Otomatik oluşturulacak"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="client_name">Müşteri Adı *</Label>
                <Input
                  id="client_name"
                  value={formData.client_name}
                  onChange={(e) => handleInputChange('client_name', e.target.value)}
                  placeholder="Şirket veya kişi adı"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Konum *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Örn: Istanbul, Türkiye"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event_name">Etkinlik Adı *</Label>
                <Input
                  id="event_name"
                  value={formData.event_name}
                  onChange={(e) => handleInputChange('event_name', e.target.value)}
                  placeholder="Fuar veya etkinlik adı"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event_date">Etkinlik Tarihi</Label>
                <Input
                  id="event_date"
                  type="date"
                  value={formData.event_date}
                  onChange={(e) => handleInputChange('event_date', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size_sqm">Stand Alanı (m²)</Label>
              <Input
                id="size_sqm"
                type="number"
                value={formData.size_sqm}
                onChange={(e) => handleInputChange('size_sqm', parseInt(e.target.value) || 0)}
                placeholder="Metrekare cinsinden alan"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Proje hakkında detaylı açıklama..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Özellikler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Yeni özellik ekle..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                  <span>{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Proje Görselleri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="image-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:bg-muted/50">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Görselleri buraya sürükleyin veya seçmek için tıklayın
                  </p>
                </div>
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Ayarlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
              />
              <Label htmlFor="is_featured">Öne çıkarılmış proje</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            İptal
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Kaydediliyor...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Proje Oluştur
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}