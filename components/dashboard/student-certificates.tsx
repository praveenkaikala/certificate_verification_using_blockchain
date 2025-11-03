"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Download, Copy, CheckCircle, Award } from "lucide-react"

interface Certificate {
  id: string
  title: string
  program: string
  issueDate: string
  issuer: string
  blockchainId: string
  status: "verified" | "pending"
}

export function StudentCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: "CERT-001",
      title: "Advanced Python Development",
      program: "Python Mastery Course",
      issueDate: "2025-01-15",
      issuer: "Tech Academy",
      blockchainId: "0x742d35cc6634c0532925a3b844bc9e7595e5a2b3c8e5a",
      status: "verified",
    },
    {
      id: "CERT-002",
      title: "Web Development Bootcamp",
      program: "Full Stack Developer Program",
      issueDate: "2025-01-18",
      issuer: "DevSchool Institute",
      blockchainId: "0x8a2f4e7c1b3a9d2f6e8c0a5b4d2f1c8e3a5b7c9d",
      status: "verified",
    },
    {
      id: "CERT-003",
      title: "Data Science Fundamentals",
      program: "Data Science Bootcamp",
      issueDate: "2025-01-20",
      issuer: "Data Institute",
      blockchainId: "0x3b9f2e1a7c5d4b8a6e3f9c2d1b5a7e4c9f1a3b5d",
      status: "pending",
    },
  ])

  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyToClipboard = (id: string, blockchainId: string) => {
    navigator.clipboard.writeText(blockchainId)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleShare = (cert: Certificate) => {
    const shareUrl = `${window.location.origin}/verify?id=${cert.blockchainId}`
    navigator.clipboard.writeText(shareUrl)
    alert("Verification link copied to clipboard!")
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border p-4">
          <p className="text-muted-foreground text-sm mb-1">Total Certificates</p>
          <p className="text-3xl font-bold">{certificates.length}</p>
        </Card>
        <Card className="bg-card border-border p-4">
          <p className="text-muted-foreground text-sm mb-1">Verified</p>
          <p className="text-3xl font-bold text-green-500">
            {certificates.filter((c) => c.status === "verified").length}
          </p>
        </Card>
        <Card className="bg-card border-border p-4">
          <p className="text-muted-foreground text-sm mb-1">Pending Verification</p>
          <p className="text-3xl font-bold text-yellow-500">
            {certificates.filter((c) => c.status === "pending").length}
          </p>
        </Card>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card
            key={cert.id}
            className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors"
          >
            {/* Certificate Header */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b border-border">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground line-clamp-2">{cert.title}</h3>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    cert.status === "verified"
                      ? "bg-green-500/20 text-green-400 flex items-center gap-1"
                      : "bg-yellow-500/20 text-yellow-400 flex items-center gap-1"
                  }`}
                >
                  <CheckCircle className="h-3 w-3" />
                  {cert.status === "verified" ? "Verified" : "Pending"}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{cert.program}</p>
            </div>

            {/* Certificate Body */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Issued by</p>
                <p className="font-medium text-foreground">{cert.issuer}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Issue Date</p>
                <p className="font-medium text-foreground">{cert.issueDate}</p>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Blockchain ID</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-background/50 p-2 rounded border border-border truncate text-muted-foreground font-mono">
                    {cert.blockchainId}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(cert.id, cert.blockchainId)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedId === cert.id ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 bg-transparent"
                  onClick={() => handleShare(cert)}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1 gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {certificates.length === 0 && (
        <Card className="bg-card border-border p-12 text-center">
          <Award className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">No certificates yet</p>
          <p className="text-sm text-muted-foreground/70">
            Complete a course to receive your first blockchain certificate
          </p>
        </Card>
      )}
    </div>
  )
}
