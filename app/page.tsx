"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, CheckCircle2 } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/30 pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
                Verify Skills Instantly with{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Blockchain
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
                ForgeryShield allows verified institutions to issue skill and academic certificates as NFTs on the
                blockchain, instantly verifiable by employers worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <Link href="/login/institute">
                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  Issue Certificate
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/verify">
                <Button size="lg" variant="outline">
                  Verify Certificate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-balance">Why Choose ForgeryShield?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Immutable Records",
                description:
                  "Certificates stored on blockchain cannot be forged or tampered with, ensuring complete authenticity.",
              },
              {
                icon: Zap,
                title: "Instant Verification",
                description: "Employers can verify credentials in seconds without contacting institutions directly.",
              },
              {
                icon: CheckCircle2,
                title: "Global Recognition",
                description: "Certificates are accessible worldwide, breaking down geographic barriers to employment.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-background rounded-lg border border-border p-8 hover:border-primary/50 transition-colors"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're an institution, student, or employer, join the blockchain revolution for credential
            verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/issue">
              <Button size="lg" className="gap-2">
                For Institutions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/student">
              <Button size="lg" variant="outline">
                For Students
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">ForgeryShield</h4>
              <p className="text-sm text-muted-foreground">
                Blockchain-powered credential verification for the modern world.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Product</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/issue" className="hover:text-foreground">
                    Issue Certificates
                  </Link>
                </li>
                <li>
                  <Link href="/verify" className="hover:text-foreground">
                    Verify
                  </Link>
                </li>
                <li>
                  <Link href="/student" className="hover:text-foreground">
                    Student Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Company</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3 text-sm">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; 2025 ForgeryShield. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Twitter
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                LinkedIn
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
