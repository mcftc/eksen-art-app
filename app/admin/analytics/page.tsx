"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  FolderOpen,
  Building2,
  Mail,
  Calendar,
  BarChart3,
  Eye,
  MousePointerClick,
  Download,
  RefreshCw
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { format, subDays, startOfMonth, endOfMonth } from "date-fns"
import { tr } from "date-fns/locale"

interface AnalyticsData {
  totalProjects: number
  totalQuotes: number
  totalMessages: number
  totalStandTypes: number
  totalServices: number
  quotesThisMonth: number
  messagesThisMonth: number
  projectsThisMonth: number
  recentActivity: {
    type: string
    title: string
    timestamp: string
    status?: string
  }[]
  popularStandTypes: {
    name: string
    count: number
    percentage: number
  }[]
  quotesByStatus: {
    status: string
    count: number
    percentage: number
  }[]
  monthlyTrends: {
    month: string
    quotes: number
    messages: number
    projects: number
  }[]
}

const statusLabels: { [key: string]: string } = {
  new: "Yeni",
  contacted: "İletişime Geçildi", 
  quoted: "Teklif Gönderildi",
  won: "Kazanıldı",
  lost: "Kaybedildi"
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("30")

  const supabase = createClient()

  const loadAnalytics = async () => {
    try {
      setLoading(true)

      // Get basic counts
      const [
        { count: totalProjects },
        { count: totalQuotes }, 
        { count: totalMessages },
        { count: totalStandTypes },
        { count: totalServices }
      ] = await Promise.all([
        supabase.from("projects").select("*", { count: "exact", head: true }),
        supabase.from("quote_requests").select("*", { count: "exact", head: true }),
        supabase.from("contact_messages").select("*", { count: "exact", head: true }),
        supabase.from("stand_types").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true })
      ])

      // Get this month's data
      const startOfCurrentMonth = startOfMonth(new Date())
      const endOfCurrentMonth = endOfMonth(new Date())

      const [
        { count: quotesThisMonth },
        { count: messagesThisMonth },
        { count: projectsThisMonth }
      ] = await Promise.all([
        supabase
          .from("quote_requests")
          .select("*", { count: "exact", head: true })
          .gte("created_at", startOfCurrentMonth.toISOString())
          .lte("created_at", endOfCurrentMonth.toISOString()),
        supabase
          .from("contact_messages")
          .select("*", { count: "exact", head: true })
          .gte("created_at", startOfCurrentMonth.toISOString())
          .lte("created_at", endOfCurrentMonth.toISOString()),
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .gte("created_at", startOfCurrentMonth.toISOString())
          .lte("created_at", endOfCurrentMonth.toISOString())
      ])

      // Get recent activity
      const { data: recentQuotes } = await supabase
        .from("quote_requests")
        .select("contact_name, event_name, created_at, status")
        .order("created_at", { ascending: false })
        .limit(5)

      const { data: recentMessages } = await supabase
        .from("contact_messages")
        .select("name, subject, created_at, status")
        .order("created_at", { ascending: false })
        .limit(5)

      const { data: recentProjects } = await supabase
        .from("projects")
        .select("title, created_at")
        .order("created_at", { ascending: false })
        .limit(5)

      // Combine recent activity
      const recentActivity = [
        ...(recentQuotes?.map(q => ({
          type: "quote",
          title: `${q.contact_name} - ${q.event_name || "Teklif talebi"}`,
          timestamp: q.created_at,
          status: q.status
        })) || []),
        ...(recentMessages?.map(m => ({
          type: "message", 
          title: `${m.name} - ${m.subject || "İletişim mesajı"}`,
          timestamp: m.created_at,
          status: m.status
        })) || []),
        ...(recentProjects?.map(p => ({
          type: "project",
          title: p.title,
          timestamp: p.created_at
        })) || [])
      ]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 10)

      // Get stand type popularity
      const { data: standTypeData } = await supabase
        .from("quote_requests")
        .select("stand_type")
        .not("stand_type", "is", null)

      const standTypeCounts = standTypeData?.reduce((acc: { [key: string]: number }, item) => {
        if (item.stand_type) {
          acc[item.stand_type] = (acc[item.stand_type] || 0) + 1
        }
        return acc
      }, {}) || {}

      const totalStandTypeRequests = Object.values(standTypeCounts).reduce((sum: number, count) => sum + (count as number), 0)
      
      const popularStandTypes = Object.entries(standTypeCounts)
        .map(([name, count]) => ({
          name,
          count: count as number,
          percentage: Math.round((count as number / totalStandTypeRequests) * 100)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Get quotes by status
      const { data: statusData } = await supabase
        .from("quote_requests")
        .select("status")

      const statusCounts = statusData?.reduce((acc: { [key: string]: number }, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      }, {}) || {}

      const totalStatusRequests = Object.values(statusCounts).reduce((sum: number, count) => sum + (count as number), 0)
      
      const quotesByStatus = Object.entries(statusCounts)
        .map(([status, count]) => ({
          status,
          count: count as number,
          percentage: Math.round((count as number / totalStatusRequests) * 100)
        }))
        .sort((a, b) => b.count - a.count)

      // Generate monthly trends (mock data for demo)
      const monthlyTrends = [
        { month: "Ocak", quotes: 12, messages: 8, projects: 3 },
        { month: "Şubat", quotes: 15, messages: 12, projects: 4 },
        { month: "Mart", quotes: 18, messages: 10, projects: 5 },
        { month: "Nisan", quotes: 22, messages: 15, projects: 6 },
        { month: "Mayıs", quotes: 25, messages: 18, projects: 8 },
        { month: "Haziran", quotes: 20, messages: 14, projects: 7 }
      ]

      const analyticsData: AnalyticsData = {
        totalProjects: totalProjects || 0,
        totalQuotes: totalQuotes || 0,
        totalMessages: totalMessages || 0,
        totalStandTypes: totalStandTypes || 0,
        totalServices: totalServices || 0,
        quotesThisMonth: quotesThisMonth || 0,
        messagesThisMonth: messagesThisMonth || 0,
        projectsThisMonth: projectsThisMonth || 0,
        recentActivity,
        popularStandTypes,
        quotesByStatus,
        monthlyTrends
      }

      setAnalytics(analyticsData)
      
    } catch (error) {
      console.error("Error loading analytics:", error)
      toast.error("Analitik veriler yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAnalytics()
  }, [timeRange])

  const exportReport = () => {
    if (!analytics) return
    
    const reportData = {
      generated_at: new Date().toISOString(),
      period: `Son ${timeRange} gün`,
      summary: {
        total_projects: analytics.totalProjects,
        total_quotes: analytics.totalQuotes,
        total_messages: analytics.totalMessages,
        quotes_this_month: analytics.quotesThisMonth,
        messages_this_month: analytics.messagesThisMonth,
        projects_this_month: analytics.projectsThisMonth
      },
      popular_stand_types: analytics.popularStandTypes,
      quotes_by_status: analytics.quotesByStatus,
      recent_activity: analytics.recentActivity
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "quote": return <Mail className="h-4 w-4" />
      case "message": return <MessageSquare className="h-4 w-4" />
      case "project": return <FolderOpen className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "quote": return "text-blue-600"
      case "message": return "text-green-600" 
      case "project": return "text-purple-600"
      default: return "text-gray-600"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!analytics) {
    return <div>Analitik veriler yüklenemedi</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analitik Dashboard</h1>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Son 7 gün</SelectItem>
              <SelectItem value="30">Son 30 gün</SelectItem>
              <SelectItem value="90">Son 90 gün</SelectItem>
              <SelectItem value="365">Son 1 yıl</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={loadAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
          <Button onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalProjects}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">Bu ay: {analytics.projectsThisMonth}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Teklif Talepleri</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalQuotes}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">Bu ay: {analytics.quotesThisMonth}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">İletişim Mesajları</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalMessages}</div>
            <div className="flex items-center text-sm">
              <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">Bu ay: {analytics.messagesThisMonth}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Stand Tipleri</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalStandTypes}</div>
            <div className="flex items-center text-sm">
              <span className="text-muted-foreground">{analytics.totalServices} hizmet</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {activity.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(activity.timestamp), "dd MMM HH:mm", { locale: tr })}
                    </div>
                  </div>
                  {activity.status && (
                    <Badge variant="outline" className="text-xs">
                      {statusLabels[activity.status] || activity.status}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Stand Types */}
        <Card>
          <CardHeader>
            <CardTitle>Popüler Stand Tipleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.popularStandTypes.map((standType, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium">{standType.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      %{standType.percentage}
                    </span>
                    <Badge variant="secondary">
                      {standType.count}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quotes by Status */}
        <Card>
          <CardHeader>
            <CardTitle>Teklifler - Durum Bazlı</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Durum</TableHead>
                  <TableHead>Sayı</TableHead>
                  <TableHead>Oran</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.quotesByStatus.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Badge variant="outline">
                        {statusLabels[item.status] || item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell>%{item.percentage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Aylık Trendler</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ay</TableHead>
                  <TableHead>Teklif</TableHead>
                  <TableHead>Mesaj</TableHead>
                  <TableHead>Proje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analytics.monthlyTrends.map((trend, index) => (
                  <TableRow key={index}>
                    <TableCell>{trend.month}</TableCell>
                    <TableCell>{trend.quotes}</TableCell>
                    <TableCell>{trend.messages}</TableCell>
                    <TableCell>{trend.projects}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}