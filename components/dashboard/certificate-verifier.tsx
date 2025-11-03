"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, CheckCircle, AlertCircle, Loader, Copy, Download, Award } from "lucide-react"

export function CertificateVerifier() {
  const [searchInput, setSearchInput] = useState("")
  const [searching, setSearching] = useState(false)
  const [verified, setVerified] = useState<any | null>(null)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setError("Please enter a certificate ID, blockchain ID, or email")
      return
    }

    setSearching(true)
    setError("")
    setVerified(null)

    // Simulate API call
    setTimeout(() => {
      if (
        searchInput === "CERT-001" ||
        searchInput === "0x742d35cc6634c0532925a3b844bc9e7595e5a2b3c8e5a" ||
        searchInput === "john@example.com"
      ) {
        setVerified({
          id: "CERT-001",
          recipient: "John Doe",
          email: "john@example.com",
          program: "Advanced Python Development",
          issuer: "Tech Academy",
          issueDate: "2025-01-15",
          blockchainId: "0x742d35cc6634c0532925a3b844bc9e7595e5a2b3c8e5a",
          status: "verified",
          verified: true,
          verificationDate: new Date().toISOString(),
          chain: "Ethereum Mainnet",
          gasUsed: "124,532",
          blockNumber: "18,945,123",
        })
        setError("")
      } else {
        setError("Certificate not found. Please check the ID and try again.")
        setVerified(null)
      }
      setSearching(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <Card className="bg-card border-border p-6 md:p-8">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Search by Certificate ID, Blockchain ID, or Email
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., CERT-001 or 0x742d35cc..."
              disabled={searching}
              className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            />
            <Button
              onClick={handleSearch}
              disabled={searching}
              className="gap-2 bg-primary hover:bg-primary/90 md:w-auto"
              size="lg"
            >
              {searching ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Try: CERT-001, 0x742d35cc6634c0532925a3b844bc9e7595e5a2b3c8e5a, or john@example.com
          </p>
        </div>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="bg-destructive/10 border-destructive/20 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-destructive">Verification Failed</h3>
            <p className="text-sm text-destructive/80 mt-1">{error}</p>
          </div>
        </Card>
      )}

      {/* Verified Result */}
      {verified && (
        <div className="space-y-4">
          {/* Success Banner */}
          <Card className="bg-green-500/10 border-green-500/20 p-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-500">Certificate Verified</h3>
              <p className="text-sm text-green-500/80 mt-1">This certificate has been verified on the blockchain</p>
            </div>
          </Card>

          {/* Certificate Details */}
          <Card className="bg-card border-border overflow-hidden">
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b border-border flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{verified.program}</h2>
                <p className="text-muted-foreground">{verified.issuer}</p>
              </div>
              <Award className="h-12 w-12 text-primary opacity-20" />
            </div>

            <div className="p-6 space-y-6">
              {/* Recipient Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Recipient</p>
                  <p className="text-lg font-semibold text-foreground">{verified.recipient}</p>
                  <p className="text-sm text-muted-foreground">{verified.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Certificate ID
                  </p>
                  <p className="text-lg font-semibold text-foreground font-mono">{verified.id}</p>
                  <p className="text-sm text-muted-foreground">{new Date(verified.issueDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
                  Blockchain Details
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Blockchain Network</p>
                    <p className="font-medium text-foreground">{verified.chain}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Block Number</p>
                    <p className="font-medium text-foreground font-mono">{verified.blockNumber}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Gas Used</p>
                    <p className="font-medium text-foreground">{verified.gasUsed}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Verification Date</p>
                    <p className="font-medium text-foreground">
                      {new Date(verified.verificationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Blockchain ID */}
              <div className="bg-background/50 rounded-lg p-4 border border-border">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Blockchain ID</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs break-all font-mono text-muted-foreground">
                    {verified.blockchainId}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigator.clipboard.writeText(verified.blockchainId)}
                    className="h-8 w-8 p-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download Certificate
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Copy className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
