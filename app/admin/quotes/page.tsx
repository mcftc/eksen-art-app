"use client"

import { useState, useEffect } from "react"
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
  Dialog,
  DialogContent,
  DialogDescription,
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
  Eye, 
  MoreHorizontal,
  Search,
  Calendar,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { format } from "date-fns"
import { tr } from "date-fns/locale"

interface QuoteRequest {
  id: string
  company_name: string | null
  contact_name: string
  email: string
  phone: string | null
  stand_type: string | null
  event_name: string | null
  event_date: string | null
  location: string | null
  size_sqm: number | null
  budget_range: string | null
  message: string | null
  status: string
  source: string | null
  ip_address: string | null
  user_agent: string | null
  created_at: string
}

const statusOptions = [
  { value: "new", label: "Yeni", icon: Clock, color: "bg-blue-500" },
  { value: "contacted", label: "İletişime Geçildi", icon: Mail, color: "bg-yellow-500" },
  { value: "quoted", label: "Teklif Gönderildi", icon: FileText, color: "bg-purple-500" },
  { value: "won", label: "Kazanıldı", icon: CheckCircle, color: "bg-green-500" },
  { value: "lost", label: "Kaybedildi", icon: XCircle, color: "bg-red-500" }
]

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const supabase = createClient()

  const loadQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setQuotes(data || [])
    } catch (error) {
      console.error("Error loading quotes:", error)
      toast.error("Teklifler yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadQuotes()
  }, [])

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("quote_requests")
        .update({ status: newStatus })
        .eq("id", id)

      if (error) throw error
      
      toast.success("Durum güncellendi")
      loadQuotes()
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Durum güncellenirken hata oluştu")
    }
  }

  const deleteQuote = async (id: string) => {
    if (!confirm("Bu teklif talebini silmek istediğinizden emin misiniz?")) return

    try {
      const { error } = await supabase
        .from("quote_requests")
        .delete()
        .eq("id", id)

      if (error) throw error
      
      toast.success("Teklif talebi silindi")
      loadQuotes()
      setIsDetailOpen(false)
    } catch (error) {
      console.error("Error deleting quote:", error)
      toast.error("Silme işlemi sırasında hata oluştu")
    }
  }

  const exportToCSV = () => {
    const headers = ["Şirket", "İletişim", "Email", "Telefon", "Stand Tipi", "Etkinlik", "Tarih", "Lokasyon", "Boyut", "Bütçe", "Durum", "Tarih"]
    const rows = filteredQuotes.map(q => [
      q.company_name || "-",
      q.contact_name,
      q.email,
      q.phone || "-",
      q.stand_type || "-",
      q.event_name || "-",
      q.event_date || "-",
      q.location || "-",
      q.size_sqm || "-",
      q.budget_range || "-",
      q.status,
      new Date(q.created_at).toLocaleDateString("tr-TR")
    ])

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `teklif-talepleri-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status)
    if (!statusOption) return <Badge variant="outline">{status}</Badge>
    
    const Icon = statusOption.icon
    return (
      <Badge className="gap-1">
        <Icon className="h-3 w-3" />
        {statusOption.label}
      </Badge>
    )
  }

  const filteredQuotes = quotes.filter(quote => {
    const matchesSearch = 
      quote.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.event_name?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter
    
    return matchesSearch && matchesStatus
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
        <h1 className="text-3xl font-bold">Teklif Talepleri</h1>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          CSV İndir
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statusOptions.map(status => {
          const count = quotes.filter(q => q.status === status.value).length
          const Icon = status.icon
          return (
            <Card key={status.value}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {status.label}
                  </CardTitle>
                  <div className={`h-2 w-2 rounded-full ${status.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
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
                placeholder="Şirket, kişi veya etkinlik ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
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
                <TableHead>Şirket / Kişi</TableHead>
                <TableHead>İletişim</TableHead>
                <TableHead>Etkinlik</TableHead>
                <TableHead>Stand Tipi</TableHead>
                <TableHead>Bütçe</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{quote.company_name || "-"}</div>
                      <div className="text-sm text-muted-foreground">{quote.contact_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{quote.email}</div>
                      {quote.phone && (
                        <div className="text-sm text-muted-foreground">{quote.phone}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{quote.event_name || "-"}</div>
                      {quote.event_date && (
                        <div className="text-xs text-muted-foreground">
                          {format(new Date(quote.event_date), "dd MMM yyyy", { locale: tr })}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{quote.stand_type || "-"}</div>
                      {quote.size_sqm && (
                        <div className="text-xs text-muted-foreground">{quote.size_sqm} m²</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{quote.budget_range || "-"}</TableCell>
                  <TableCell>{getStatusBadge(quote.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {format(new Date(quote.created_at), "dd MMM", { locale: tr })}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(quote.created_at), "HH:mm")}
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
                        <DropdownMenuItem onClick={() => {
                          setSelectedQuote(quote)
                          setIsDetailOpen(true)
                        }}>
                          <Eye className="h-4 w-4 mr-2" />
                          Detayları Gör
                        </DropdownMenuItem>
                        {statusOptions.map(status => (
                          <DropdownMenuItem
                            key={status.value}
                            onClick={() => updateStatus(quote.id, status.value)}
                            disabled={quote.status === status.value}
                          >
                            <status.icon className="h-4 w-4 mr-2" />
                            {status.label} Olarak İşaretle
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem
                          onClick={() => deleteQuote(quote.id)}
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

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Teklif Talebi Detayları</DialogTitle>
            <DialogDescription>
              {selectedQuote?.created_at && format(new Date(selectedQuote.created_at), "dd MMMM yyyy HH:mm", { locale: tr })}
            </DialogDescription>
          </DialogHeader>
          
          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Şirket Adı</Label>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedQuote.company_name || "-"}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-muted-foreground">İletişim Kişisi</Label>
                  <div className="flex items-center gap-2">
                    <span>{selectedQuote.contact_name}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">E-posta</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${selectedQuote.email}`} className="text-primary hover:underline">
                      {selectedQuote.email}
                    </a>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Telefon</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {selectedQuote.phone ? (
                      <a href={`tel:${selectedQuote.phone}`} className="text-primary hover:underline">
                        {selectedQuote.phone}
                      </a>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Etkinlik</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedQuote.event_name || "-"}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Etkinlik Tarihi</Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {selectedQuote.event_date 
                        ? format(new Date(selectedQuote.event_date), "dd MMMM yyyy", { locale: tr })
                        : "-"
                      }
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Lokasyon</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedQuote.location || "-"}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Stand Tipi</Label>
                  <span>{selectedQuote.stand_type || "-"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Stand Boyutu</Label>
                  <span>{selectedQuote.size_sqm ? `${selectedQuote.size_sqm} m²` : "-"}</span>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Bütçe Aralığı</Label>
                  <span>{selectedQuote.budget_range || "-"}</span>
                </div>
              </div>

              {selectedQuote.message && (
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Mesaj</Label>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{selectedQuote.message}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Kaynak</Label>
                  <span>{selectedQuote.source || "Web sitesi"}</span>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-muted-foreground">IP Adresi</Label>
                  <span className="font-mono text-xs">{selectedQuote.ip_address || "-"}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>{getStatusBadge(selectedQuote.status)}</div>
                <div className="flex gap-2">
                  <Select 
                    value={selectedQuote.status} 
                    onValueChange={(value) => {
                      updateStatus(selectedQuote.id, value)
                      setSelectedQuote({ ...selectedQuote, status: value })
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          <div className="flex items-center gap-2">
                            <status.icon className="h-4 w-4" />
                            {status.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="destructive" 
                    onClick={() => deleteQuote(selectedQuote.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Sil
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}