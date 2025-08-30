"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Save,
  Upload,
  Trash2,
  Settings,
  Globe,
  Mail,
  Shield,
  Database,
  Palette,
  RefreshCw,
  Download,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface SiteSettings {
  site_name: string
  site_description: string
  site_keywords: string
  contact_email: string
  contact_phone: string
  contact_address: string
  social_facebook: string
  social_instagram: string
  social_linkedin: string
  social_youtube: string
  maintenance_mode: boolean
  analytics_enabled: boolean
  cookie_consent_enabled: boolean
  email_notifications: boolean
  theme_primary_color: string
  logo_url: string
  favicon_url: string
}

const defaultSettings: SiteSettings = {
  site_name: "Eksenart Mimarlık",
  site_description: "Profesyonel fuar standı tasarımı ve üretimi",
  site_keywords: "fuar standı, stand tasarımı, stand üretimi, eksenart",
  contact_email: "info@eksenart.com",
  contact_phone: "+90 212 123 45 67",
  contact_address: "İstanbul, Türkiye",
  social_facebook: "https://facebook.com/eksenart",
  social_instagram: "https://instagram.com/eksenart",
  social_linkedin: "https://linkedin.com/company/eksenart",
  social_youtube: "https://youtube.com/eksenart",
  maintenance_mode: false,
  analytics_enabled: true,
  cookie_consent_enabled: true,
  email_notifications: true,
  theme_primary_color: "#0ea5e9",
  logo_url: "",
  favicon_url: ""
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const supabase = createClient()

  // Mock load settings (in production, you'd have a settings table)
  const loadSettings = async () => {
    setLoading(true)
    try {
      // For demo purposes, we'll use localStorage
      const savedSettings = localStorage.getItem("admin_settings")
      if (savedSettings) {
        setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) })
      }
      toast.success("Ayarlar yüklendi")
    } catch (error) {
      console.error("Error loading settings:", error)
      toast.error("Ayarlar yüklenirken hata oluştu")
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      // For demo purposes, we'll save to localStorage
      // In production, you'd save to a settings table in Supabase
      localStorage.setItem("admin_settings", JSON.stringify(settings))
      
      toast.success("Ayarlar kaydedildi")
    } catch (error) {
      console.error("Error saving settings:", error)
      toast.error("Ayarlar kaydedilirken hata oluştu")
    } finally {
      setSaving(false)
    }
  }

  const resetSettings = () => {
    if (confirm("Tüm ayarları varsayılan değerlere sıfırlamak istediğinizden emin misiniz?")) {
      setSettings(defaultSettings)
      localStorage.removeItem("admin_settings")
      toast.success("Ayarlar sıfırlandı")
    }
  }

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `eksenart-settings-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string)
        setSettings({ ...defaultSettings, ...importedSettings })
        toast.success("Ayarlar içe aktarıldı")
      } catch (error) {
        toast.error("Geçersiz ayar dosyası")
      }
    }
    reader.readAsText(file)
  }

  const updateSetting = (key: keyof SiteSettings, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  useEffect(() => {
    loadSettings()
  }, [])

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
        <h1 className="text-3xl font-bold">Site Ayarları</h1>
        <div className="flex gap-2">
          <input
            type="file"
            accept=".json"
            onChange={importSettings}
            className="hidden"
            id="import-settings"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('import-settings')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            İçe Aktar
          </Button>
          <Button variant="outline" onClick={exportSettings}>
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button variant="outline" onClick={resetSettings}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Sıfırla
          </Button>
          <Button onClick={saveSettings} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </div>

      {settings.maintenance_mode && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Bakım modu aktif!</strong> Site ziyaretçiler için kapalı.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2" />
            Genel
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            İletişim
          </TabsTrigger>
          <TabsTrigger value="social">
            <Globe className="h-4 w-4 mr-2" />
            Sosyal Medya
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="h-4 w-4 mr-2" />
            Görünüm
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <Shield className="h-4 w-4 mr-2" />
            Gelişmiş
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Adı</Label>
                <Input
                  id="site_name"
                  value={settings.site_name}
                  onChange={(e) => updateSetting("site_name", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site_description">Site Açıklaması</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description}
                  onChange={(e) => updateSetting("site_description", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="site_keywords">Anahtar Kelimeler</Label>
                <Input
                  id="site_keywords"
                  value={settings.site_keywords}
                  onChange={(e) => updateSetting("site_keywords", e.target.value)}
                  placeholder="kelime1, kelime2, kelime3"
                />
                <p className="text-sm text-muted-foreground">
                  Virgülle ayırarak yazın
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Site Durumu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Bakım Modu</Label>
                  <p className="text-sm text-muted-foreground">
                    Aktif olduğunda site ziyaretçiler için kapalı olur
                  </p>
                </div>
                <Switch
                  checked={settings.maintenance_mode}
                  onCheckedChange={(checked) => updateSetting("maintenance_mode", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>E-posta Bildirimleri</Label>
                  <p className="text-sm text-muted-foreground">
                    Yeni teklif ve mesajlar için e-posta gönder
                  </p>
                </div>
                <Switch
                  checked={settings.email_notifications}
                  onCheckedChange={(checked) => updateSetting("email_notifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">E-posta Adresi</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => updateSetting("contact_email", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Telefon</Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone}
                  onChange={(e) => updateSetting("contact_phone", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact_address">Adres</Label>
                <Textarea
                  id="contact_address"
                  value={settings.contact_address}
                  onChange={(e) => updateSetting("contact_address", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sosyal Medya Hesapları</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook</Label>
                <Input
                  id="social_facebook"
                  type="url"
                  value={settings.social_facebook}
                  onChange={(e) => updateSetting("social_facebook", e.target.value)}
                  placeholder="https://facebook.com/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram</Label>
                <Input
                  id="social_instagram"
                  type="url"
                  value={settings.social_instagram}
                  onChange={(e) => updateSetting("social_instagram", e.target.value)}
                  placeholder="https://instagram.com/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social_linkedin">LinkedIn</Label>
                <Input
                  id="social_linkedin"
                  type="url"
                  value={settings.social_linkedin}
                  onChange={(e) => updateSetting("social_linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="social_youtube">YouTube</Label>
                <Input
                  id="social_youtube"
                  type="url"
                  value={settings.social_youtube}
                  onChange={(e) => updateSetting("social_youtube", e.target.value)}
                  placeholder="https://youtube.com/c/username"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tema ve Görünüm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme_primary_color">Ana Renk</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="theme_primary_color"
                    type="color"
                    value={settings.theme_primary_color}
                    onChange={(e) => updateSetting("theme_primary_color", e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    value={settings.theme_primary_color}
                    onChange={(e) => updateSetting("theme_primary_color", e.target.value)}
                    placeholder="#0ea5e9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  type="url"
                  value={settings.logo_url}
                  onChange={(e) => updateSetting("logo_url", e.target.value)}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon_url">Favicon URL</Label>
                <Input
                  id="favicon_url"
                  type="url"
                  value={settings.favicon_url}
                  onChange={(e) => updateSetting("favicon_url", e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analitik ve Güvenlik</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Google Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Site analitiklerini takip et
                  </p>
                </div>
                <Switch
                  checked={settings.analytics_enabled}
                  onCheckedChange={(checked) => updateSetting("analytics_enabled", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Çerez Onayı</Label>
                  <p className="text-sm text-muted-foreground">
                    GDPR uyumlu çerez onay çubuğu
                  </p>
                </div>
                <Switch
                  checked={settings.cookie_consent_enabled}
                  onCheckedChange={(checked) => updateSetting("cookie_consent_enabled", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sistem Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Next.js Sürümü</span>
                <Badge variant="secondary">15.5.2</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Supabase Bağlantısı</span>
                <Badge variant="default" className="gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Aktif
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Veritabanı</span>
                <Badge variant="secondary">PostgreSQL</Badge>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Database className="h-4 w-4" />
            <AlertDescription>
              Gelişmiş ayarlar dikkatli kullanılmalıdır. Değişiklikler sitenin çalışmasını etkileyebilir.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}