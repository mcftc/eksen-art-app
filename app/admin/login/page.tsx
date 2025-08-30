"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSignup, setIsSignup] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const supabase = createClient()
    
    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError("Kayıt sırasında hata: " + error.message)
        setIsLoading(false)
      } else {
        setError("")
        setIsSignup(false)
        alert("Kayıt başarılı! Şimdi giriş yapabilirsiniz.")
        setIsLoading(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError("Giriş bilgileri hatalı")
        setIsLoading(false)
      } else {
        router.push("/admin")
        router.refresh()
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>{isSignup ? "Admin Kaydı" : "Admin Girişi"}</CardTitle>
          <CardDescription>
            {isSignup 
              ? "Yeni admin hesabı oluşturun" 
              : "İçerik yönetim paneline erişim için giriş yapın"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@eksenart.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-destructive/15 border border-destructive/20 rounded-md p-3">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading 
                ? (isSignup ? "Kayıt yapılıyor..." : "Giriş yapılıyor...") 
                : (isSignup ? "Kayıt Ol" : "Giriş Yap")
              }
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm"
            >
              {isSignup 
                ? "Zaten hesabınız var mı? Giriş yapın" 
                : "Hesabınız yok mu? Kayıt olun"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}