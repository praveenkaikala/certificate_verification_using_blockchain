"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle, Award, Download, QrCode } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
interface Certificate {
  id: string
  title: string
  program: string
  issueDate: string
  issuer: string
  blockchainId: string // tx hash or IPFS hash
  status: "verified" | "pending"
}

export function StudentCertificates() {
  const [certificates] = useState<Certificate[]>([
    {
      id: "CERT-001",
      title: "Advanced Python Development",
      program: "Python Mastery Course",
      issueDate: "2025-01-15",
      issuer: "Tech Academy",
      blockchainId: "QmX7Ab9...123", // IPFS hash OR tx hash
      status: "verified",
    },
  ])

  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [qrValue, setQrValue] = useState<string | null>(null)

  /* =========================
     COPY BLOCKCHAIN HASH
  ========================== */
  const copyToClipboard = (id: string, hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  /* =========================
     DOWNLOAD FROM IPFS
  ========================== */
  const downloadFromIPFS = (ipfsHash: string) => {
    const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`
    const link = document.createElement("a")
    link.href = ipfsUrl
    link.download = `${ipfsHash}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card
            key={cert.id}
            className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">{cert.title}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                    cert.status === "verified"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  <CheckCircle className="h-3 w-3" />
                  {cert.status}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">Issued by</p>
                <p className="font-medium">{cert.issuer}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Issue Date</p>
                <p className="font-medium">{cert.issueDate}</p>
              </div>

              {/* Blockchain ID */}
              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground mb-2">
                  IPFS / Transaction Hash
                </p>
                <div className="flex gap-2 items-center">
                  <code className="flex-1 text-xs truncate bg-background/50 p-2 rounded border font-mono">
                    {cert.blockchainId}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      copyToClipboard(cert.id, cert.blockchainId)
                    }
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
                  className="flex-1 gap-2"
                  onClick={() => setQrValue(cert.blockchainId)}
                >
                  <QrCode className="h-4 w-4" />
                  QR
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() =>
                    downloadFromIPFS(cert.blockchainId)
                  }
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* QR MODAL */}
      {qrValue && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg text-center space-y-4">
            <h2 className="text-lg font-semibold">
              Certificate Verification QR
            </h2>
            <QRCodeCanvas value={qrValue} size={220} />
            <Button variant="outline" onClick={() => setQrValue(null)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {certificates.length === 0 && (
        <Card className="p-12 text-center">
          <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <p className="text-muted-foreground">No certificates yet</p>
        </Card>
      )}
    </div>
  )
}
