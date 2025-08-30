"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { User } from "@supabase/supabase-js"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
      
      if (!user && pathname !== "/admin/login") {
        router.push("/admin/login")
      }
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        if (!session?.user && pathname !== "/admin/login") {
          router.push("/admin/login")
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth, router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (!user && pathname !== "/admin/login") {
    return null
  }

  if (pathname === "/admin/login") {
    return children
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <div className="flex h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-6 px-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}