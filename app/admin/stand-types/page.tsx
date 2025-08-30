"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Search,
  Save,
  X,
  ImageIcon
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/ui/image-upload"

interface StandType {
  id: string
  slug: string
  name_tr: string
  name_en: string | null
  description_tr: string | null
  description_en: string | null
  features: string[] | null
  materials: string[] | null
  sizes: string[] | null
  lead_time: string | null
  ideal_for: string | null
  images: string[] | null
  order_index: number
  is_active: boolean
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export default function StandTypesPage() {
  const [standTypes, setStandTypes] = useState<StandType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingStandType, setEditingStandType] = useState<StandType | null>(null)
  const [formData, setFormData] = useState({
    slug: "",
    name_tr: "",
    name_en: "",
    description_tr: "",
    description_en: "",
    features: [] as string[],
    materials: [] as string[],
    sizes: [] as string[],
    lead_time: "",
    ideal_for: "",
    images: [] as string[],
    order_index: 0,
    is_active: true,
    meta_title: "",
    meta_description: ""
  })
  const [newFeature, setNewFeature] = useState("")
  const [newMaterial, setNewMaterial] = useState("")
  const [newSize, setNewSize] = useState("")

  const supabase = createClient()

  const loadStandTypes = async () => {
    try {
      const { data, error } = await supabase
        .from("stand_types")
        .select("*")
        .order("order_index", { ascending: true })

      if (error) throw error
      setStandTypes(data || [])
    } catch (error) {
      console.error("Error loading stand types:", error)
      toast.error("Stand tipleri yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStandTypes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const dataToSave = {
        ...formData,
        features: formData.features.length > 0 ? formData.features : null,
        materials: formData.materials.length > 0 ? formData.materials : null,
        sizes: formData.sizes.length > 0 ? formData.sizes : null,
        images: formData.images.length > 0 ? formData.images : null,
        updated_at: new Date().toISOString()
      }

      if (editingStandType) {
        const { error } = await supabase
          .from("stand_types")
          .update(dataToSave)
          .eq("id", editingStandType.id)

        if (error) throw error
        toast.success("Stand tipi güncellendi")
      } else {
        const { error } = await supabase
          .from("stand_types")
          .insert([dataToSave])

        if (error) throw error
        toast.success("Stand tipi eklendi")
      }

      setIsDialogOpen(false)
      resetForm()
      loadStandTypes()
    } catch (error) {
      console.error("Error saving stand type:", error)
      toast.error((error as Error).message || "Kayıt sırasında hata oluştu")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu stand tipini silmek istediğinizden emin misiniz?")) return

    try {
      const { error } = await supabase
        .from("stand_types")
        .delete()
        .eq("id", id)

      if (error) throw error
      toast.success("Stand tipi silindi")
      loadStandTypes()
    } catch (error) {
      console.error("Error deleting stand type:", error)
      toast.error("Silme işlemi sırasında hata oluştu")
    }
  }

  const handleEdit = (standType: StandType) => {
    setEditingStandType(standType)
    setFormData({
      slug: standType.slug,
      name_tr: standType.name_tr,
      name_en: standType.name_en || "",
      description_tr: standType.description_tr || "",
      description_en: standType.description_en || "",
      features: standType.features || [],
      materials: standType.materials || [],
      sizes: standType.sizes || [],
      images: standType.images || [],
      lead_time: standType.lead_time || "",
      ideal_for: standType.ideal_for || "",
      order_index: standType.order_index || 0,
      is_active: standType.is_active,
      meta_title: standType.meta_title || "",
      meta_description: standType.meta_description || ""
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingStandType(null)
    setFormData({
      slug: "",
      name_tr: "",
      name_en: "",
      description_tr: "",
      description_en: "",
      features: [],
      materials: [],
      sizes: [],
      images: [],
      lead_time: "",
      ideal_for: "",
      order_index: 0,
      is_active: true,
      meta_title: "",
      meta_description: ""
    })
    setNewFeature("")
    setNewMaterial("")
    setNewSize("")
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

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, newMaterial.trim()]
      }))
      setNewMaterial("")
    }
  }

  const removeMaterial = (index: number) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }))
  }

  const addSize = () => {
    if (newSize.trim()) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, newSize.trim()]
      }))
      setNewSize("")
    }
  }

  const removeSize = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: urls
    }))
  }

  const filteredStandTypes = standTypes.filter(
    st => st.name_tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
          st.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stand Tipleri Yönetimi</h1>
        <Button onClick={() => {
          resetForm()
          setIsDialogOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Stand Tipi
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Stand tipi ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sıra</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>İsim (TR)</TableHead>
                <TableHead>İsim (EN)</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Oluşturulma</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStandTypes.map((standType) => (
                <TableRow key={standType.id}>
                  <TableCell>{standType.order_index}</TableCell>
                  <TableCell className="font-mono text-sm">{standType.slug}</TableCell>
                  <TableCell className="font-medium">{standType.name_tr}</TableCell>
                  <TableCell>{standType.name_en || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={standType.is_active ? "default" : "secondary"}>
                      {standType.is_active ? "Aktif" : "Pasif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(standType.created_at).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(standType)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(standType.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingStandType ? "Stand Tipini Düzenle" : "Yeni Stand Tipi"}
            </DialogTitle>
            <DialogDescription>
              Stand tipi bilgilerini girin
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug*</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                  placeholder="ahsap-stand"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="order_index">Sıra</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name_tr">İsim (TR)*</Label>
                <Input
                  id="name_tr"
                  value={formData.name_tr}
                  onChange={(e) => setFormData(prev => ({ ...prev, name_tr: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name_en">İsim (EN)</Label>
                <Input
                  id="name_en"
                  value={formData.name_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_tr">Açıklama (TR)</Label>
              <Textarea
                id="description_tr"
                value={formData.description_tr}
                onChange={(e) => setFormData(prev => ({ ...prev, description_tr: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description_en">Açıklama (EN)</Label>
              <Textarea
                id="description_en"
                value={formData.description_en}
                onChange={(e) => setFormData(prev => ({ ...prev, description_en: e.target.value }))}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Özellikler</Label>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Özellik ekle"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addFeature()
                    }
                  }}
                />
                <Button type="button" onClick={addFeature} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="pr-1">
                    {feature}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeFeature(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Malzemeler</Label>
              <div className="flex gap-2">
                <Input
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  placeholder="Malzeme ekle"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addMaterial()
                    }
                  }}
                />
                <Button type="button" onClick={addMaterial} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.materials.map((material, index) => (
                  <Badge key={index} variant="secondary" className="pr-1">
                    {material}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeMaterial(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Boyutlar</Label>
              <div className="flex gap-2">
                <Input
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  placeholder="Boyut ekle (örn: 3x3m)"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addSize()
                    }
                  }}
                />
                <Button type="button" onClick={addSize} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.sizes.map((size, index) => (
                  <Badge key={index} variant="secondary" className="pr-1">
                    {size}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0"
                      onClick={() => removeSize(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Görseller</Label>
              
              {/* Image Upload Component */}
              <ImageUpload
                onUpload={handleImageUpload}
                maxFiles={10}
                multiple={true}
                existingImages={formData.images}
                category="stand-type"
                bucket="projects"
                className="mt-2"
              />
              
              
              <p className="text-xs text-muted-foreground">
                Görseller fuar standı galerisi için kullanılacak. İlk görsel ana görsel olarak gösterilecektir.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lead_time">Teslim Süresi</Label>
                <Input
                  id="lead_time"
                  value={formData.lead_time}
                  onChange={(e) => setFormData(prev => ({ ...prev, lead_time: e.target.value }))}
                  placeholder="7-10 iş günü"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ideal_for">İdeal Kullanım</Label>
                <Input
                  id="ideal_for"
                  value={formData.ideal_for}
                  onChange={(e) => setFormData(prev => ({ ...prev, ideal_for: e.target.value }))}
                  placeholder="Fuarlar, sergiler"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_title">Meta Başlık</Label>
              <Input
                id="meta_title"
                value={formData.meta_title}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                placeholder="SEO başlığı"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Açıklama</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                rows={2}
                placeholder="SEO açıklaması"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Aktif</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {editingStandType ? "Güncelle" : "Kaydet"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}