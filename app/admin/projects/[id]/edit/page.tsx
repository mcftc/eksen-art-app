"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { ImageUpload } from "@/components/ui/image-upload"

interface Project {
  id: string
  slug: string
  title: string
  client_name: string
  stand_type_id: string | null
  location: string
  event_name: string
  event_date: string
  size_sqm: number
  description: string
  features: Record<string, unknown> | null
  images: string[] | null
  is_featured: boolean
  is_active: boolean
  view_count: number
}

interface StandType {
  id: string
  name_tr: string
  slug: string
}

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [standTypes, setStandTypes] = useState<StandType[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    loadProject()
    loadStandTypes()
  }, [params.id])

  const loadProject = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error
      setProject(data)
    } catch (error) {
      console.error('Error loading project:', error)
      toast.error("Proje yüklenirken hata oluştu")
      router.push('/admin/projects')
    } finally {
      setLoading(false)
    }
  }

  const loadStandTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('stand_types')
        .select('id, name_tr, slug')
        .eq('is_active', true)
        .order('order_index')

      if (error) throw error
      setStandTypes(data || [])
    } catch (error) {
      console.error('Error loading stand types:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!project) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          slug: project.slug,
          title: project.title,
          client_name: project.client_name,
          stand_type_id: project.stand_type_id,
          location: project.location,
          event_name: project.event_name,
          event_date: project.event_date,
          size_sqm: project.size_sqm,
          description: project.description,
          images: project.images,
          is_featured: project.is_featured,
          is_active: project.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', project.id)

      if (error) throw error

      toast.success("Proje başarıyla güncellendi")
      router.push('/admin/projects')
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error("Proje güncellenirken hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!project) return
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id)

      if (error) throw error

      toast.success("Proje başarıyla silindi")
      router.push('/admin/projects')
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error("Proje silinirken hata oluştu")
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    if (!project) return
    
    setProject({
      ...project,
      title,
      slug: generateSlug(title)
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Proje bulunamadı</p>
        <Link href="/admin/projects">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Projelere Dön
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/projects">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Geri
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Proje Düzenle</h1>
            <p className="text-muted-foreground">
              Proje bilgilerini düzenleyin
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={saving}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Sil
          </Button>
          
          <Button 
            onClick={handleSubmit}
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Temel Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Proje Başlığı *</Label>
                  <Input
                    id="title"
                    value={project.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Proje başlığını girin"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={project.slug}
                    onChange={(e) => setProject({...project, slug: e.target.value})}
                    placeholder="proje-url-slug"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    URL&apos;de görünecek slug. Otomatik oluşturulur.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client_name">Müşteri Adı *</Label>
                    <Input
                      id="client_name"
                      value={project.client_name}
                      onChange={(e) => setProject({...project, client_name: e.target.value})}
                      placeholder="Müşteri adını girin"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Lokasyon *</Label>
                    <Input
                      id="location"
                      value={project.location}
                      onChange={(e) => setProject({...project, location: e.target.value})}
                      placeholder="İstanbul, Türkiye"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="event_name">Etkinlik Adı *</Label>
                    <Input
                      id="event_name"
                      value={project.event_name}
                      onChange={(e) => setProject({...project, event_name: e.target.value})}
                      placeholder="Fuarın/etkinliğin adı"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="event_date">Etkinlik Tarihi</Label>
                    <Input
                      id="event_date"
                      type="date"
                      value={project.event_date?.split('T')[0] || ''}
                      onChange={(e) => setProject({...project, event_date: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="size_sqm">Stand Alanı (m²)</Label>
                  <Input
                    id="size_sqm"
                    type="number"
                    value={project.size_sqm || ''}
                    onChange={(e) => setProject({...project, size_sqm: parseInt(e.target.value) || 0})}
                    placeholder="24"
                    min="1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Açıklama</Label>
                  <Textarea
                    id="description"
                    value={project.description || ''}
                    onChange={(e) => setProject({...project, description: e.target.value})}
                    placeholder="Proje hakkında detaylı açıklama..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Proje Resimleri</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  existingImages={project.images || []}
                  onUpload={(urls) => setProject({...project, images: urls})}
                  maxFiles={10}
                  multiple={true}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Durum</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="is_active">Aktif</Label>
                  <Switch
                    id="is_active"
                    checked={project.is_active}
                    onCheckedChange={(checked) => setProject({...project, is_active: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="is_featured">Öne Çıkan</Label>
                  <Switch
                    id="is_featured"
                    checked={project.is_featured}
                    onCheckedChange={(checked) => setProject({...project, is_featured: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stand Tipi</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={project.stand_type_id || 'none'}
                  onValueChange={(value) => setProject({...project, stand_type_id: value === 'none' ? null : value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Stand tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Belirtilmemiş</SelectItem>
                    {standTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name_tr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>İstatistikler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Görüntüleme:</span>
                  <span className="text-sm font-medium">{project.view_count}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">ID:</span>
                  <span className="text-sm font-mono">{project.id.slice(0, 8)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}