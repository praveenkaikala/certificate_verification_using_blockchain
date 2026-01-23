"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Building2, Shield, ArrowRight } from "lucide-react"
import Heading from "@/components/styles/Heading"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 px-4">
       <div className="w-full max-w-4xl">
        {/* Header */}
      
          <Heading title="Welcome to SkillChain" description="Create your SkillChain account to access and share your verified academic certificates."/>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          {/* Student Card */}
           <Link
              href="/signup/student">
            <Card className="max-w-xl mx-auto hover:shadow-lg transition-all animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 py-3">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Student Signup</CardTitle>
            </div>
            <CardDescription>
              Register as a student to manage and verify your certificates.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Placeholder for form */}
            <p className="text-sm text-muted-foreground">
              Sign up using your institutional details to securely access certificates stored on the blockchain.
            </p>

            <p
             
              className="flex items-center justify-center gap-2 w-full rounded-md bg-primary px-4 py-2 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Continue to Signup <ArrowRight className="h-4 w-4" />
            </p>

            <p className="text-sm text-center text-muted-foreground">
              Already registered?{" "}
              <Link href="/login/student" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
          </Link>

          {/* Institute Card */}
           <Link
              href="/signup/institute"
              
            >
                  <Card className="max-w-xl mx-auto hover:shadow-lg transition-all animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 py-3">
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Building2 className="h-8 w-8 text-accent" />
              </div>
              <CardTitle>Institute Signup</CardTitle>
            </div>
            <CardDescription>
              Apply for institute access and get verified by the admin.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Submit your institutional details for admin verification before issuing certificates on SkillChain.
            </p>

            <p
             
              className="flex items-center justify-center gap-2 w-full rounded-md bg-accent px-4 py-2 text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              Continue to Signup <ArrowRight className="h-4 w-4" />
            </p>

            <p className="text-sm text-center text-muted-foreground">
              Already registered?{" "}
              <Link href="/login/institute" className="text-accent font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>

          </Link>

          {/* Admin Card */}
          
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
