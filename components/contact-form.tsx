"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MessageSquare, Send, CheckCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError("") // Clear error when user starts typing
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const supabase = createClient()
      
      const { error: insertError } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          status: 'unread'
        })

      if (insertError) throw insertError

      setIsSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      })
    } catch (err) {
      console.error('Form submission error:', err)
      setError("Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.")
      toast.error("Mesaj gönderilirken hata oluştu")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mesajınız Gönderildi!</h3>
            <p className="text-muted-foreground mb-4">
              Mesajınız başarıyla iletildi. 24 saat içinde size dönüş yapacağız.
            </p>
            <Button onClick={() => setIsSuccess(false)} variant="outline">
              Yeni Mesaj Gönder
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          İletişim Formu
        </CardTitle>
        <CardDescription>
          Fuar standı projeleriniz için bizimle iletişime geçin. Detaylı bilgi ve teklif almak için formu doldurun.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ad Soyad *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Adınızı ve soyadınızı girin"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                type="email"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+90 5XX XXX XX XX"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Konu *</Label>
            <Select onValueChange={(value) => handleInputChange("subject", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Mesaj konusunu seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teklif-talebi">Teklif Talebi</SelectItem>
                <SelectItem value="genel-bilgi">Genel Bilgi</SelectItem>
                <SelectItem value="proje-danismanligi">Proje Danışmanlığı</SelectItem>
                <SelectItem value="satis-sonrasi-destek">Satış Sonrası Destek</SelectItem>
                <SelectItem value="partnerlik">İş Birliği & Partnerlik</SelectItem>
                <SelectItem value="diğer">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mesaj *</Label>
            <Textarea
              id="message"
              placeholder="Projeniz hakkında detaylı bilgi verin. Fuar adı, tarihi, stand büyüklüğü, beklentileriniz gibi bilgiler bizim için önemlidir."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              rows={6}
              required
            />
          </div>

          {error && (
            <div className="bg-destructive/15 border border-destructive/20 rounded-md p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Mesaj Gönder
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">Alternatif iletişim yolları:</p>
            <div className="flex justify-center space-x-6">
              <a 
                href="tel:+905321234567" 
                className="flex items-center text-primary hover:underline"
              >
                <Phone className="h-4 w-4 mr-1" />
                Telefon
              </a>
              <a 
                href="mailto:info@eksenart.com" 
                className="flex items-center text-primary hover:underline"
              >
                <Mail className="h-4 w-4 mr-1" />
                E-posta
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}