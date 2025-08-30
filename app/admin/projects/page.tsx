"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Search,
  Star,
  StarOff
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Project {
  id: string
  slug: string
  title: string
  client_name: string
  location: string
  event_name: string
  event_date: string
  size_sqm: number
  is_featured: boolean
  view_count: number
  created_at: string
  images: string[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  
  const supabase = createClient()

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error loading projects:', error)
      toast.error("Projeler yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const toggleFeatured = async (projectId: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({ is_featured: !currentFeatured })
        .eq('id', projectId)

      if (error) throw error

      toast.success(`Proje ${!currentFeatured ? 'öne çıkarıldı' : 'öne çıkarmadan kaldırıldı'}`)

      loadProjects()
    } catch (error) {
      console.error('Error updating project:', error)
      toast.error("Proje güncellenirken hata oluştu")
    }
  }

  const deleteProject = async (projectId: string) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)

      if (error) throw error

      toast.success("Proje başarıyla silindi")

      loadProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error("Proje silinirken hata oluştu")
    }
  }

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.event_name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          <h1 className="text-3xl font-bold">Proje Yönetimi</h1>
          <p className="text-muted-foreground">
            Tamamlanan projeleri yönetin ve yenilerini ekleyin
          </p>
        </div>
        
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Proje
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-sm">
          <Label htmlFor="search">Ara</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Proje adı, müşteri veya etkinlik ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Öne Çıkan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => p.is_featured).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Bu Ay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.filter(p => {
                const projectDate = new Date(p.created_at)
                const now = new Date()
                return projectDate.getMonth() === now.getMonth() && 
                       projectDate.getFullYear() === now.getFullYear()
              }).length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Toplam Görüntüleme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {projects.reduce((total, p) => total + p.view_count, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Projeler ({filteredProjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proje</TableHead>
                <TableHead>Müşteri</TableHead>
                <TableHead>Etkinlik</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Alan</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Görüntüleme</TableHead>
                <TableHead className="w-[70px]">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground">{project.location}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{project.client_name}</TableCell>
                  <TableCell>{project.event_name}</TableCell>
                  <TableCell>
                    {new Date(project.event_date).toLocaleDateString('tr-TR')}
                  </TableCell>
                  <TableCell>{project.size_sqm} m²</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {project.is_featured && (
                        <Badge variant="secondary">
                          <Star className="mr-1 h-3 w-3" />
                          Öne Çıkan
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{project.view_count}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/projeler/${project.slug}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Görüntüle
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Düzenle
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() => toggleFeatured(project.id, project.is_featured)}
                        >
                          {project.is_featured ? (
                            <>
                              <StarOff className="mr-2 h-4 w-4" />
                              Öne Çıkarmadan Kaldır
                            </>
                          ) : (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Öne Çıkar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteProject(project.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? "Arama kriterlerinize uygun proje bulunamadı" : "Henüz hiç proje eklenmemiş"}
              </p>
              {!searchTerm && (
                <Link href="/admin/projects/new">
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    İlk Projeyi Ekle
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}