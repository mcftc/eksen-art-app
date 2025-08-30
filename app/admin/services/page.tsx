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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Search,
  Save,
  X,
  Palette,
  Package,
  Wrench,
  Users,
  Truck,
  Printer
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"

interface Service {
  id: string
  slug: string
  name_tr: string
  name_en: string | null
  description_tr: string | null
  description_en: string | null
  icon: string | null
  features: string[] | null
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

const iconOptions = [
  { value: "Palette", label: "Tasarım", icon: Palette },
  { value: "Package", label: "İmalat", icon: Package },
  { value: "Wrench", label: "Kurulum", icon: Wrench },
  { value: "Users", label: "Danışmanlık", icon: Users },
  { value: "Truck", label: "Depolama", icon: Truck },
  { value: "Printer", label: "Baskı", icon: Printer },
]

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    slug: "",
    name_tr: "",
    name_en: "",
    description_tr: "",
    description_en: "",
    icon: "Package",
    features: [] as string[],
    order_index: 0,
    is_active: true
  })
  const [newFeature, setNewFeature] = useState("")

  const supabase = createClient()

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("order_index", { ascending: true })

      if (error) throw error
      setServices(data || [])
    } catch (error) {
      console.error("Error loading services:", error)
      toast.error("Hizmetler yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadServices()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const dataToSave = {
        ...formData,
        features: formData.features.length > 0 ? formData.features : null,
        updated_at: new Date().toISOString()
      }

      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update(dataToSave)
          .eq("id", editingService.id)

        if (error) throw error
        toast.success("Hizmet güncellendi")
      } else {
        const { error } = await supabase
          .from("services")
          .insert([dataToSave])

        if (error) throw error
        toast.success("Hizmet eklendi")
      }

      setIsDialogOpen(false)
      resetForm()
      loadServices()
    } catch (error) {
      console.error("Error saving service:", error)
      toast.error((error as Error).message || "Kayıt sırasında hata oluştu")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) return

    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id)

      if (error) throw error
      toast.success("Hizmet silindi")
      loadServices()
    } catch (error) {
      console.error("Error deleting service:", error)
      toast.error("Silme işlemi sırasında hata oluştu")
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      slug: service.slug,
      name_tr: service.name_tr,
      name_en: service.name_en || "",
      description_tr: service.description_tr || "",
      description_en: service.description_en || "",
      icon: service.icon || "Package",
      features: service.features || [],
      order_index: service.order_index || 0,
      is_active: service.is_active
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setEditingService(null)
    setFormData({
      slug: "",
      name_tr: "",
      name_en: "",
      description_tr: "",
      description_en: "",
      icon: "Package",
      features: [],
      order_index: 0,
      is_active: true
    })
    setNewFeature("")
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

  const getIconComponent = (iconName: string | null) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName)
    if (iconOption) {
      const IconComponent = iconOption.icon
      return <IconComponent className="h-4 w-4" />
    }
    return <Package className="h-4 w-4" />
  }

  const filteredServices = services.filter(
    service => service.name_tr.toLowerCase().includes(searchQuery.toLowerCase()) ||
               service.slug.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-3xl font-bold">Hizmet Yönetimi</h1>
        <Button onClick={() => {
          resetForm()
          setIsDialogOpen(true)
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Hizmet
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Hizmet ara..."
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
                <TableHead>İkon</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>İsim (TR)</TableHead>
                <TableHead>İsim (EN)</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Oluşturulma</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.order_index}</TableCell>
                  <TableCell>{getIconComponent(service.icon)}</TableCell>
                  <TableCell className="font-mono text-sm">{service.slug}</TableCell>
                  <TableCell className="font-medium">{service.name_tr}</TableCell>
                  <TableCell>{service.name_en || "-"}</TableCell>
                  <TableCell>
                    <Badge variant={service.is_active ? "default" : "secondary"}>
                      {service.is_active ? "Aktif" : "Pasif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(service.created_at).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(service)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(service.id)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Hizmeti Düzenle" : "Yeni Hizmet"}
            </DialogTitle>
            <DialogDescription>
              Hizmet bilgilerini girin
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
                  placeholder="tasarim-hizmeti"
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
              <Label htmlFor="icon">İkon</Label>
              <Select 
                value={formData.icon} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, icon: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map(option => {
                    const IconComponent = option.icon
                    return (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
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
                {editingService ? "Güncelle" : "Kaydet"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}