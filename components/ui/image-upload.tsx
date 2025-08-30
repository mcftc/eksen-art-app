"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import Image from "next/image"
import { GallerySelector } from "@/components/ui/gallery-selector"

interface ImageUploadProps {
  onUpload?: (urls: string[]) => void
  maxFiles?: number
  multiple?: boolean
  existingImages?: string[]
  className?: string
  category?: 'project' | 'stand-type' | 'service' | 'general'
  bucket?: string
}

export function ImageUpload({ 
  onUpload,
  maxFiles = 5,
  multiple = true,
  existingImages = [],
  className = "",
  category = 'general',
  bucket = 'projects'
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>(existingImages)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    // Check file count limit
    const totalFiles = images.length + files.length
    if (totalFiles > maxFiles) {
      toast.error(`Maksimum ${maxFiles} resim yükleyebilirsiniz`)
      return
    }

    setUploading(true)
    const uploadedUrls: string[] = []

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} geçerli bir resim dosyası değil`)
          continue
        }

        // Validate file size (5MB = 5 * 1024 * 1024 bytes)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} boyutu 5MB'dan büyük olamaz`)
          continue
        }

        // Generate unique filename with category prefix
        const fileExt = file.name.split('.').pop()
        const timestamp = Date.now()
        const randomId = Math.random().toString(36).substring(2, 15)
        const fileName = `${category}-${timestamp}-${randomId}.${fileExt}`
        const filePath = category !== 'general' ? `${category}s/${fileName}` : fileName

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(bucket)
          .upload(filePath, file)

        if (uploadError) {
          console.error('Upload error:', uploadError)
          toast.error(`${file.name} yüklenirken hata oluştu`)
          continue
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(filePath)

        uploadedUrls.push(publicUrl)
      }

      if (uploadedUrls.length > 0) {
        const newImages = [...images, ...uploadedUrls]
        setImages(newImages)
        onUpload?.(newImages)
        toast.success(`${uploadedUrls.length} resim başarıyla yüklendi`)
      }
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error('Resim yükleme sırasında hata oluştu')
    } finally {
      setUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeImage = async (url: string, index: number) => {
    try {
      // Extract file path from URL
      const urlParts = url.split('/')
      const fileName = urlParts[urlParts.length - 1]
      
      // Delete from Supabase Storage
      const { error } = await supabase.storage
        .from(bucket)
        .remove([fileName])

      if (error) {
        console.error('Delete error:', error)
        toast.error('Resim silinirken hata oluştu')
        return
      }

      // Update local state
      const newImages = images.filter((_, i) => i !== index)
      setImages(newImages)
      onUpload?.(newImages)
      toast.success('Resim başarıyla silindi')
    } catch (error) {
      console.error('Image delete error:', error)
      toast.error('Resim silinirken hata oluştu')
    }
  }

  const handleGallerySelect = (selectedUrls: string[]) => {
    // Check if adding selected images would exceed limit
    const totalImages = images.length + selectedUrls.length
    if (totalImages > maxFiles) {
      toast.error(`Maksimum ${maxFiles} resim seçebilirsiniz. Şu anda ${images.length} resim var.`)
      return
    }

    // Filter out already selected images
    const newImages = selectedUrls.filter(url => !images.includes(url))
    if (newImages.length === 0) {
      toast.info("Seçilen resimler zaten eklenmış")
      return
    }

    // Add new images to the current list
    const updatedImages = [...images, ...newImages]
    setImages(updatedImages)
    onUpload?.(updatedImages)
    toast.success(`${newImages.length} resim galeriden eklendi`)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading || images.length >= maxFiles}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploading ? 'Yükleniyor...' : 'Yeni Resim Yükle'}
        </Button>

        <GallerySelector
          onSelect={handleGallerySelect}
          multiple={multiple}
          maxSelection={maxFiles - images.length}
          selectedImages={images}
          triggerText="Galeriden Seç"
        />
        
        <p className="text-sm text-muted-foreground">
          {images.length}/{maxFiles} - Maksimum 5MB, JPG/PNG/WebP
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-2 relative">
                <div className="aspect-square relative">
                  <Image
                    src={url}
                    alt={`Upload ${index + 1}`}
                    fill
                    className="object-cover rounded-sm"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0"
                    onClick={() => removeImage(url, index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <Card className="border-dashed border-2 border-muted-foreground/25">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground text-center">
              Henüz resim yüklenmemiş
              <br />
              Resim yüklemek için yukarıdaki butonu kullanın
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}