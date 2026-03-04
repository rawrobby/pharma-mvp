"use client"

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProtectedLayout({
  children,
  requiredRole,
}: {
  children: React.ReactNode
  requiredRole: string
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .single()

      if (!profile || profile.role !== requiredRole) {
        router.push("/login")
        return
      }

      setLoading(false)
    }

    checkUser()
  }, [requiredRole, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {children}
    </div>
  )
}