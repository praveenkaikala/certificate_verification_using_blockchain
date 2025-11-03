"use client"
import { Card } from "@/components/ui/card"
import { CertificateVerifier } from "@/components/dashboard/certificate-verifier"

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">Verify Certificates</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Instantly verify blockchain-issued certificates. Search by certificate ID, blockchain ID, or recipient email
            to confirm authenticity.
          </p>
        </div>

        {/* Main Verification Component */}
        <CertificateVerifier />

        {/* How It Works */}
        <Card className="bg-card border-border mt-12 p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">How to Verify</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 text-primary font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-foreground">Enter Certificate Details</h3>
              <p className="text-muted-foreground text-sm">
                Provide the certificate ID, blockchain ID, or recipient email address.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 text-primary font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-foreground">Instant Verification</h3>
              <p className="text-muted-foreground text-sm">
                The system checks the blockchain to verify authenticity and details.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/20 text-primary font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-foreground">Get Results</h3>
              <p className="text-muted-foreground text-sm">
                View complete certificate details and blockchain verification status.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
