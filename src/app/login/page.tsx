"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { BloodDrop } from "@/components/blood-drop"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      try {
        // Simulate API call to authenticate user
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })

        if (response.ok) {
          const userData = await response.json()

          // Store user data in localStorage (in production, use secure session management)
          localStorage.setItem("currentUser", JSON.stringify(userData))

          // Redirect based on user role
          switch (userData.role) {
            case "admin":
              router.push("/admin/dashboard")
              break
            case "donor":
              router.push("/donor/dashboard")
              break
            case "recipient":
              router.push("/recipient/dashboard")
              break
            default:
              router.push("/")
          }
        } else {
          const error = await response.json()
          setErrors({ email: error.message || "Invalid credentials" })
        }
      } catch (error) {
        setErrors({ email: "Login failed. Please try again." })
      }
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="mb-8 flex items-center gap-2">
        <BloodDrop className="h-8 w-8 text-red-600" />
        <span className="text-xl font-bold">LifeFlow</span>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-red-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-sm">
                Remember me
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Login
            </Button>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-red-600 hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>

      {/* Demo accounts for testing */}
      <div className="mt-8 rounded-lg border border-gray-200 p-4">
        <h3 className="mb-2 font-medium">Test Accounts</h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Admin:</strong> admin@lifeflow.com / admin123
          </p>
          <p>
            <strong>Donor (John):</strong> john.doe@email.com / donor123
          </p>
          <p>
            <strong>Donor (Jane):</strong> jane.smith@email.com / donor123
          </p>
          <p>
            <strong>Recipient:</strong> sarah.johnson@email.com / recipient123
          </p>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">Each user has personalized data and dashboard content</p>
      </div>
    </div>
  )
}
