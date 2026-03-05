"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checking, setChecking] = useState(true)
  
 useEffect(() => {
  const checkSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      setChecking(false)
      return
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .single()

    if (profile?.role === "rep") {
      router.push("/rep")
    } else if (profile?.role === "mer") {
      router.push("/mer")
    } else if (profile?.role === "speaker") {
      router.push("/speaker")
    }
  }

  checkSession()
}, [router])

const handleLogin = async (e: any) => {
  e.preventDefault()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    alert(error.message)
    return
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .single()

  if (profileError) {
    alert("Could not fetch profile")
    return
  }

  if (!profile) {
  alert("Profile not found")
  return
}

  if (profile.role === "rep") {
    router.push("/rep")
  } else if (profile.role === "mer") {
    router.push("/mer")
  } else if (profile.role === "speaker") {
    router.push("/speaker")
  }
}

if (checking) return null

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-96 p-8 border rounded-lg shadow">
        <h2 style={{textAlign: "center"}}>DESKTOP TEST</h2>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}