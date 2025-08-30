"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  LayoutDashboard, 
  Building2, 
  Wrench, 
  FolderOpen, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  Image,
  Users,
  BarChart3
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Stand Tipleri",
    href: "/admin/stand-types",
    icon: Building2,
  },
  {
    title: "Hizmetler",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    title: "Projeler",
    href: "/admin/projects",
    icon: FolderOpen,
  },
  {
    title: "Galeri",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Mesajlar",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "Teklif Talepleri",
    href: "/admin/quotes",
    icon: FileText,
  },
  {
    title: "Kullanıcılar",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "İstatistikler",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Ayarlar",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="w-64 bg-card border-r flex flex-col">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Eksenart Admin</h2>
        <p className="text-sm text-muted-foreground">İçerik Yönetimi</p>
      </div>
      
      <Separator />
      
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-secondary"
                )}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          )
        })}
      </nav>
      
      <Separator />
      
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </div>
  )
}