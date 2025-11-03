"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Lock, Loader2, Building2 } from "lucide-react"

export default function InstituteLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (email && password) {
        // Redirect to institute dashboard
        window.location.href = "/issue"
      } else {
        setError("Please fill in all required fields")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleConnectWallet = async () => {
    setIsLoading(true)
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setWalletAddress("0x742d...E8c2")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4 py-8">
      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/* Back Button */}
        <Link
          href="/login"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>

        {/* Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary" />
              <span className="font-bold text-lg">SkillChain</span>
            </div>
            <CardTitle className="text-2xl">Institute Login</CardTitle>
            <CardDescription>Sign in to issue and manage certificates for your institution</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Institution Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Institution Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link href="#" className="text-xs text-accent hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full mt-6 bg-gradient-to-r from-accent to-primary hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-card text-muted-foreground">Or connect blockchain wallet</span>
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="space-y-3">
              {walletAddress ? (
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Wallet: {walletAddress}</span>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={handleConnectWallet}
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.06 2L12 7.88 13.88 2h6.18zm-16.12 0l7.88 5.88L3.94 2h.24zM2 10l5.88 3.12L2 15.38v-5.38zm20 0v5.38L16.12 13.12 22 10zm-10 8.88L2 24h9v-6.12zM12 24l10-5.12-10-6.12v11.24zm-1-6.12L2 24h9v-6.12z" />
                  </svg>
                  Connect MetaMask Wallet
                </Button>
              )}
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                New institution?{" "}
                <Link href="#" className="text-accent hover:underline font-medium">
                  Apply here
                </Link>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Security Note */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Institution accounts require blockchain wallet verification for certificate issuance.
        </p>
      </div>
    </main>
  )
}
