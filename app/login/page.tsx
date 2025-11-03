"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Building2, ArrowRight } from "lucide-react"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">Welcome to SkillChain</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Choose your role to access your account and manage certificates on the blockchain.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          {/* Student Card */}
          <Link href="/login/student">
            <Card className="h-full hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Student</CardTitle>
                </div>
                <CardDescription>Access your certificates and academic credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  View your verified certificates, share credentials with employers, and track certificate verification
                  history.
                </p>
                <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Sign In <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Institute Card */}
          <Link href="/login/institute">
            <Card className="h-full hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all cursor-pointer group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                    <Building2 className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle>Institute</CardTitle>
                </div>
                <CardDescription>Issue and manage certificates for your institution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Issue new certificates, manage student credentials, track issuances, and verify certificate
                  authenticity on the blockchain.
                </p>
                <div className="flex items-center text-accent text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Sign In <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center text-sm text-muted-foreground animate-in fade-in delay-300">
          <p>
            Don't have an account?{" "}
            <Link href="/" className="text-primary hover:underline font-medium">
              Learn more about SkillChain
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
