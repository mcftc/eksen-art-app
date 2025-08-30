"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Eye, 
  MoreHorizontal,
  Search,
  Mail,
  Shield,
  User,
  Crown,
  UserX,
  Calendar,
  Save,
  X
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { Switch } from "@/components/ui/switch"

interface AdminUser {
  id: string
  email: string
  role: string
  created_at: string
  last_sign_in_at: string | null
  email_confirmed_at: string | null
  is_active: boolean
  user_metadata?: {
    full_name?: string
    avatar_url?: string | null
  }
}

const roleOptions = [
  { value: "admin", label: "Yönetici", icon: Crown, description: "Tam erişim" },
  { value: "editor", label: "Editör", icon: Edit, description: "İçerik düzenleme" },
  { value: "viewer", label: "Görüntüleyici", icon: Eye, description: "Sadece görüntüleme" }
]

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "viewer",
    is_active: true
  })

  const supabase = createClient()

  const loadUsers = async () => {
    try {
      // In a real app, you'd have a proper users table or use Supabase Auth admin functions
      // For now, we'll simulate user data based on auth.users (which requires service role)
      
      // This is a placeholder - in production you'd need to:
      // 1. Use Supabase Auth Admin API with service role key
      // 2. Or create a users table to store additional user info
      
      const mockUsers: AdminUser[] = [
        {
          id: "1",
          email: "admin@eksenart.com",
          role: "admin",
          created_at: new Date().toISOString(),
          last_sign_in_at: new Date().toISOString(),
          email_confirmed_at: new Date().toISOString(),
          is_active: true,
          user_metadata: {
            full_name: "Sistem Yöneticisi",
            avatar_url: null
          }
        },
        {
          id: "2", 
          email: "editor@eksenart.com",
          role: "editor",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          last_sign_in_at: new Date(Date.now() - 3600000).toISOString(),
          email_confirmed_at: new Date(Date.now() - 86400000).toISOString(),
          is_active: true,
          user_metadata: {
            full_name: "İçerik Editörü",
            avatar_url: null
          }
        }
      ]
      
      setUsers(mockUsers)
      
      toast.info("Demo veriler gösteriliyor. Gerçek kullanıcı yönetimi için Supabase Auth Admin API gereklidir.")
    } catch (error) {
      console.error("Error loading users:", error)
      toast.error("Kullanıcılar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleInviteUser = async () => {
    try {
      // In production, you would use:
      // const { data, error } = await supabase.auth.admin.inviteUserByEmail(formData.email)
      
      toast.success("Kullanıcı davet edildi (Demo)")
      setIsDialogOpen(false)
      resetForm()
      loadUsers()
    } catch (error) {
      console.error("Error inviting user:", error)
      toast.error("Kullanıcı davet edilirken hata oluştu")
    }
  }

  const handleUpdateUser = async () => {
    try {
      // In production, you would use:
      // await supabase.auth.admin.updateUserById(editingUser.id, { ... })
      
      toast.success("Kullanıcı güncellendi (Demo)")
      setIsDialogOpen(false)
      resetForm()
      loadUsers()
    } catch (error) {
      console.error("Error updating user:", error)
      toast.error("Kullanıcı güncellenirken hata oluştu")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz?")) return

    try {
      // In production, you would use:
      // await supabase.auth.admin.deleteUser(userId)
      
      toast.success("Kullanıcı silindi (Demo)")
      loadUsers()
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Kullanıcı silinirken hata oluştu")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isCreating) {
      await handleInviteUser()
    } else {
      await handleUpdateUser()
    }
  }

  const resetForm = () => {
    setEditingUser(null)
    setIsCreating(false)
    setFormData({
      email: "",
      password: "",
      full_name: "",
      role: "viewer",
      is_active: true
    })
  }

  const openCreateDialog = () => {
    resetForm()
    setIsCreating(true)
    setIsDialogOpen(true)
  }

  const openEditDialog = (user: AdminUser) => {
    setEditingUser(user)
    setIsCreating(false)
    setFormData({
      email: user.email,
      password: "",
      full_name: user.user_metadata?.full_name || "",
      role: user.role,
      is_active: user.is_active
    })
    setIsDialogOpen(true)
  }

  const getRoleBadge = (role: string) => {
    const roleOption = roleOptions.find(opt => opt.value === role)
    if (!roleOption) return <Badge variant="outline">{role}</Badge>
    
    const Icon = roleOption.icon
    return (
      <Badge className="gap-1">
        <Icon className="h-3 w-3" />
        {roleOption.label}
      </Badge>
    )
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.user_metadata?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    
    return matchesSearch && matchesRole
  })

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
        <h1 className="text-3xl font-bold">Kullanıcı Yönetimi</h1>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Kullanıcı Davet Et
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roleOptions.map(role => {
          const count = users.filter(u => u.role === role.value).length
          const Icon = role.icon
          return (
            <Card key={role.value}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {role.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <p className="text-xs text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="E-posta veya isim ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rol filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                {roleOptions.map(role => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kullanıcı</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Son Giriş</TableHead>
                <TableHead>Kayıt Tarihi</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || undefined} />
                        <AvatarFallback>
                          {user.user_metadata?.full_name 
                            ? getInitials(user.user_metadata.full_name)
                            : <User className="h-4 w-4" />
                          }
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {user.user_metadata?.full_name || "İsimsiz Kullanıcı"}
                        </div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        user.is_active ? "bg-green-500" : "bg-red-500"
                      }`} />
                      <span className="text-sm">
                        {user.is_active ? "Aktif" : "Pasif"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {user.last_sign_in_at ? (
                      <div className="text-sm">
                        {format(new Date(user.last_sign_in_at), "dd MMM yyyy HH:mm", { locale: tr })}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Henüz giriş yapmamış</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(user.created_at), "dd MMM yyyy", { locale: tr })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(user)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          // Reset password functionality
                          toast.info("Şifre sıfırlama e-postası gönderildi (Demo)")
                        }}>
                          <Mail className="h-4 w-4 mr-2" />
                          Şifre Sıfırla
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user.id)}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Yeni Kullanıcı Davet Et" : "Kullanıcıyı Düzenle"}
            </DialogTitle>
            <DialogDescription>
              {isCreating 
                ? "Yeni kullanıcıya davetiye e-postası gönderilecek"
                : "Kullanıcı bilgilerini güncelleyin"
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta Adresi*</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
                disabled={!isCreating}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="full_name">Ad Soyad</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              />
            </div>

            {isCreating && (
              <div className="space-y-2">
                <Label htmlFor="password">Geçici Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Boş bırakılırsa otomatik oluşturulur"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="role">Rol</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map(role => {
                    const Icon = role.icon
                    return (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          <div>
                            <div>{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Aktif kullanıcı</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-2" />
                {isCreating ? "Davet Gönder" : "Güncelle"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}