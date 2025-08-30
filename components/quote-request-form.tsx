"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { StandType } from "@/lib/data/stand-types"
import { submitQuoteRequest, QuoteRequestData } from "@/lib/data/forms"
import { toast } from "sonner"
import { Loader2, Send } from "lucide-react"

interface QuoteRequestFormProps {
  standTypes: StandType[]
}

export function QuoteRequestForm({ standTypes }: QuoteRequestFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<QuoteRequestData>({
    contact_name: "",
    email: "",
    phone: "",
    company_name: "",
    stand_type: "",
    event_name: "",
    event_date: "",
    location: "",
    size_sqm: undefined,
    budget_range: "",
    message: "",
    source: "website"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitQuoteRequest(formData)
      toast.success("Teklif talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.")
      
      // Reset form
      setFormData({
        contact_name: "",
        email: "",
        phone: "",
        company_name: "",
        stand_type: "",
        event_name: "",
        event_date: "",
        location: "",
        size_sqm: undefined,
        budget_range: "",
        message: "",
        source: "website"
      })
    } catch (error) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyin veya telefon ile iletişime geçin.")
      console.error("Quote request error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'size_sqm' ? (value ? parseInt(value) : undefined) : value
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card border rounded-lg p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="font-semibold text-lg mb-4">İletişim Bilgileri</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact_name" className="block text-sm font-medium mb-2">
                Ad Soyad *
              </label>
              <input
                type="text"
                id="contact_name"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Adınız ve soyadınız"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-posta *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="+90 xxx xxx xx xx"
              />
            </div>
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium mb-2">
                Şirket Adı
              </label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Şirketinizin adı"
              />
            </div>
          </div>
        </div>

        {/* Event Information */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Fuar Bilgileri</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="stand_type" className="block text-sm font-medium mb-2">
                Stand Tipi
              </label>
              <select
                id="stand_type"
                name="stand_type"
                value={formData.stand_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Stand tipi seçiniz</option>
                {standTypes?.map((standType) => (
                  <option key={standType.id} value={standType.slug}>
                    {standType.name_tr}
                  </option>
                ))}
                <option value="other">Diğer / Emin değilim</option>
              </select>
            </div>
            <div>
              <label htmlFor="size_sqm" className="block text-sm font-medium mb-2">
                Stand Alanı (m²)
              </label>
              <input
                type="number"
                id="size_sqm"
                name="size_sqm"
                value={formData.size_sqm || ""}
                onChange={handleChange}
                min="1"
                max="1000"
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="örn: 20"
              />
            </div>
            <div>
              <label htmlFor="event_name" className="block text-sm font-medium mb-2">
                Fuar Adı
              </label>
              <input
                type="text"
                id="event_name"
                name="event_name"
                value={formData.event_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Katılacağınız fuarın adı"
              />
            </div>
            <div>
              <label htmlFor="event_date" className="block text-sm font-medium mb-2">
                Fuar Tarihi
              </label>
              <input
                type="date"
                id="event_date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium mb-2">
                Fuar Yeri
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Şehir, ülke veya fuar merkezi adı"
              />
            </div>
          </div>
        </div>

        {/* Budget Information */}
        <div>
          <label htmlFor="budget_range" className="block text-sm font-medium mb-2">
            Bütçe Aralığı
          </label>
          <select
            id="budget_range"
            name="budget_range"
            value={formData.budget_range}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Bütçe aralığı seçiniz</option>
            <option value="5000-10000">5.000 - 10.000 TL</option>
            <option value="10000-15000">10.000 - 15.000 TL</option>
            <option value="15000-25000">15.000 - 25.000 TL</option>
            <option value="25000+">25.000 TL üzeri</option>
            <option value="consultation">Danışmanlık istiyorum</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Ek Bilgiler
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            placeholder="Projeniz hakkında detayları, özel isteklerinizi veya sorularınızı buraya yazabilirsiniz..."
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-lg h-12"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gönderiliyor...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Teklif Talebimi Gönder
              </>
            )}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Formunu göndererek <a href="#" className="text-primary hover:underline">gizlilik politikamızı</a> kabul etmiş olursunuz.
          </p>
        </div>
      </form>
    </motion.div>
  )
}