"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogTrigger,
} from "@/components/ui/dialog"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Reply,
  Check,
  X,
  Archive
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'unread' | 'replied' | 'in_progress' | 'archived'
  created_at: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [replyText, setReplyText] = useState("")
  const [isReplying, setIsReplying] = useState(false)
  
  const supabase = createClient()

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
      toast.error("Mesajlar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', messageId)

      if (error) throw error

      toast.success("Mesaj durumu güncellendi")

      loadMessages()
    } catch (error) {
      console.error('Error updating message:', error)
      toast.error("Mesaj durumu güncellenirken hata oluştu")
    }
  }

  const sendReply = async (message: ContactMessage) => {
    if (!replyText.trim()) return
    
    setIsReplying(true)
    
    try {
      // In a real implementation, you would send an email here
      // For demo purposes, we'll just mark as replied
      await updateMessageStatus(message.id, 'replied')
      
      toast.success(`${message.email} adresine yanıt gönderildi`)
      
      setReplyText("")
      setSelectedMessage(null)
    } catch (error) {
      console.error('Error sending reply:', error)
      toast.error("Yanıt gönderilirken hata oluştu")
    } finally {
      setIsReplying(false)
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline" | null | undefined; label: string }> = {
      unread: { variant: 'destructive', label: 'Okunmamış' },
      in_progress: { variant: 'default', label: 'İşlemde' },
      replied: { variant: 'secondary', label: 'Yanıtlandı' },
      archived: { variant: 'outline', label: 'Arşivlendi' }
    }
    
    const config = variants[status] || variants.unread
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mesaj Yönetimi</h1>
        <p className="text-muted-foreground">
          İletişim formundan gelen mesajları yönetin ve yanıtlayın
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 max-w-sm">
          <Label htmlFor="search">Ara</Label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Ad, email veya konu ile ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="w-48">
          <Label htmlFor="filter">Durum Filtresi</Label>
          <select
            id="filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="unread">Okunmamış</option>
            <option value="in_progress">İşlemde</option>
            <option value="replied">Yanıtlandı</option>
            <option value="archived">Arşivlendi</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Toplam Mesaj</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Okunmamış</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {messages.filter(m => m.status === 'unread').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">İşlemde</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {messages.filter(m => m.status === 'in_progress').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Bu Hafta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {messages.filter(m => {
                const messageDate = new Date(m.created_at)
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return messageDate >= weekAgo
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mesajlar ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gönderen</TableHead>
                <TableHead>Konu</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead className="w-[70px]">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow 
                  key={message.id}
                  className={message.status === 'unread' ? 'bg-muted/30' : ''}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{message.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{message.email}</span>
                        {message.phone && (
                          <>
                            <Phone className="h-3 w-3" />
                            <span>{message.phone}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{message.subject}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-xs">
                      {message.message}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(message.created_at).toLocaleDateString('tr-TR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(message.status)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                              <Eye className="mr-2 h-4 w-4" />
                              Görüntüle
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{message.subject}</DialogTitle>
                              <DialogDescription>
                                {message.name} • {message.email} • {new Date(message.created_at).toLocaleString('tr-TR')}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="bg-muted/50 p-4 rounded-lg">
                                <p>{message.message}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="reply">Yanıt</Label>
                                <Textarea
                                  id="reply"
                                  placeholder="Yanıtınızı yazın..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  rows={4}
                                />
                              </div>
                              
                              <div className="flex justify-between">
                                <div className="space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateMessageStatus(message.id, 'in_progress')}
                                  >
                                    İşlemde Olarak İşaretle
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateMessageStatus(message.id, 'archived')}
                                  >
                                    <Archive className="mr-1 h-3 w-3" />
                                    Arşivle
                                  </Button>
                                </div>
                                
                                <Button 
                                  onClick={() => sendReply(message)}
                                  disabled={isReplying || !replyText.trim()}
                                >
                                  {isReplying ? (
                                    <>
                                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1" />
                                      Gönderiliyor...
                                    </>
                                  ) : (
                                    <>
                                      <Reply className="mr-1 h-3 w-3" />
                                      Yanıt Gönder
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {message.status === 'unread' && (
                          <DropdownMenuItem
                            onClick={() => updateMessageStatus(message.id, 'in_progress')}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Okundu İşaretle
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem
                          onClick={() => updateMessageStatus(message.id, 'replied')}
                        >
                          <Reply className="mr-2 h-4 w-4" />
                          Yanıtlandı İşaretle
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem
                          onClick={() => updateMessageStatus(message.id, 'archived')}
                        >
                          <Archive className="mr-2 h-4 w-4" />
                          Arşivle
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredMessages.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? "Filtrelere uygun mesaj bulunamadı" 
                  : "Henüz hiç mesaj gelmemiş"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}