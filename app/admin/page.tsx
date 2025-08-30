import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { 
  Building2, 
  Wrench, 
  FolderOpen, 
  MessageSquare, 
  FileText, 
  Eye,
  Plus,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get statistics
  const [
    standTypesCount,
    servicesCount,
    projectsCount,
    messagesCount,
    quotesCount
  ] = await Promise.all([
    supabase.from('stand_types').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('quote_requests').select('*', { count: 'exact', head: true })
  ])

  // Get recent messages
  const { data: recentMessages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get recent quotes
  const { data: recentQuotes } = await supabase
    .from('quote_requests')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get unread message count
  const { count: unreadMessages } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'unread')

  // Get new quote requests
  const { count: newQuotes } = await supabase
    .from('quote_requests')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  const stats = [
    {
      title: "Stand Tipleri",
      value: standTypesCount.count || 0,
      icon: Building2,
      href: "/admin/stand-types",
      description: "Aktif stand tipleri"
    },
    {
      title: "Hizmetler",
      value: servicesCount.count || 0,
      icon: Wrench,
      href: "/admin/services",
      description: "Sunulan hizmetler"
    },
    {
      title: "Projeler",
      value: projectsCount.count || 0,
      icon: FolderOpen,
      href: "/admin/projects",
      description: "Tamamlanan projeler"
    },
    {
      title: "Mesajlar",
      value: messagesCount.count || 0,
      icon: MessageSquare,
      href: "/admin/messages",
      description: `${unreadMessages || 0} okunmamış`,
      alert: (unreadMessages || 0) > 0
    },
    {
      title: "Teklif Talepleri",
      value: quotesCount.count || 0,
      icon: FileText,
      href: "/admin/quotes",
      description: `${newQuotes || 0} yeni teklif`,
      alert: (newQuotes || 0) > 0
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          İçerik yönetim paneline hoş geldiniz
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className={stat.alert ? "border-orange-200 bg-orange-50/50" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.alert ? "text-orange-600" : "text-muted-foreground"}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <Link href={stat.href}>
                  <Button variant="ghost" size="sm" className="mt-2 h-8 px-2">
                    <Eye className="mr-1 h-3 w-3" />
                    Görüntüle
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/admin/projects/new">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Proje
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
        
        <Link href="/admin/stand-types/new">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Stand Tipi
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
        
        <Link href="/admin/services/new">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Hizmet
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
        
        <Link href="/admin/gallery">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Eye className="mr-2 h-4 w-4" />
                Galeri Yönetimi
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Son Mesajlar
            </CardTitle>
            <CardDescription>
              En son gelen iletişim mesajları
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentMessages && recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div key={message.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{message.name}</p>
                    <p className="text-xs text-muted-foreground">{message.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    message.status === 'unread' ? 'bg-orange-100 text-orange-800' : 
                    message.status === 'replied' ? 'bg-green-100 text-green-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {message.status === 'unread' ? 'Okunmamış' :
                     message.status === 'replied' ? 'Yanıtlandı' : 'İşlemde'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Henüz mesaj bulunmuyor</p>
            )}
            <Link href="/admin/messages">
              <Button variant="outline" size="sm" className="w-full">
                Tüm Mesajları Görüntüle
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Quote Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Son Teklif Talepleri
            </CardTitle>
            <CardDescription>
              En son gelen teklif talepleri
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentQuotes && recentQuotes.length > 0 ? (
              recentQuotes.map((quote) => (
                <div key={quote.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{quote.company_name}</p>
                    <p className="text-xs text-muted-foreground">{quote.event_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(quote.created_at).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    quote.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                    quote.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' : 
                    quote.status === 'proposal_sent' ? 'bg-purple-100 text-purple-800' :
                    quote.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {quote.status === 'new' ? 'Yeni' :
                     quote.status === 'contacted' ? 'İletişim Kuruldu' :
                     quote.status === 'proposal_sent' ? 'Teklif Gönderildi' :
                     quote.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">Henüz teklif talebi bulunmuyor</p>
            )}
            <Link href="/admin/quotes">
              <Button variant="outline" size="sm" className="w-full">
                Tüm Talepleri Görüntüle
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}