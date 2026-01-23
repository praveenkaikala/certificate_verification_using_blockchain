"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Building2, Shield, ArrowRight } from "lucide-react"
import Heading from "@/components/styles/Heading"


export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
      
        <Heading title="Welcome to SkillChain" description="Choose your role to access your account and manage certificates on the blockchain."/>

       

        {/* Role Selection */}
        <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          {/* Student Card */}
          <Link href="/login/student" className="">
            <Card className="h-full hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer group py-3">
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
            <Card className="h-full flex flex-col hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all cursor-pointer group py-3">
              <CardHeader className="flex-1">
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

          {/* Admin Card */}
          <Link href="/login/admin">
            <Card className="h-full flex flex-col hover:border-destructive/50 hover:shadow-lg hover:shadow-destructive/10 transition-all cursor-pointer group py-3">
              <CardHeader className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg bg-destructive/10 group-hover:bg-destructive/20 transition-colors">
                    <Shield className="h-8 w-8 text-destructive" />
                  </div>
                  <CardTitle>Admin</CardTitle>
                </div>
                <CardDescription>Monitor and manage system-wide operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Oversee institute registrations, verify issued certificates, and ensure blockchain data integrity.
                </p>
                <div className="flex items-center text-destructive text-sm font-medium group-hover:translate-x-1 transition-transform">
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
