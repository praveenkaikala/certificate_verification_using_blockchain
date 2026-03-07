"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle, Award, Download, QrCode, Link } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import { pinata_gateway } from "@/utils/publicUrls"

interface Certificate {
  _id: string
  courseName: string
  issueDate: string
  transactionHash: string
  ipfsHash:string
  valid: boolean
}

interface Props {
  certificates: Certificate[]
}

export function StudentCertificates({ certificates }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [qrValue, setQrValue] = useState<string | null>(null)
  const [qrName, setQrName] = useState<string>("")
  const [copiedLink,setCopiedLink]=useState<string | null> (null)
  /* =========================
     FORMAT DATE
  ========================== */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  /* =========================
     COPY CERTIFICATE ID
  ========================== */
  const copyToClipboard = (id: string,link:boolean=false) => {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    if(link) setCopiedLink(id)
    setTimeout(() => {setCopiedId(null)
      setCopiedLink(null)
    }, 2000)
  }

  /* =========================
     DOWNLOAD FROM IPFS
  ========================== */
 const downloadFromIPFS = async (hash: string, courseName: string ) => { 
    try{ 
      const url = `${pinata_gateway}${hash}`
       const response = await fetch(url) 
       const blob = await response.blob()
        const contentType = blob.type
         const extension = contentType ? contentType.split("/")[1] : "pdf"
          const safeName = courseName.replace(/\s+/g, "-") 
          const link = document.createElement("a")
           link.href = window.URL.createObjectURL(blob) 
           link.download =`${safeName}.${extension}`
            document.body.appendChild(link)
             link.click()
              document.body.removeChild(link)
             } 
             catch (error) 
             {
               console.error("Download failed", error)
               } 
              }


  /* =========================
     DOWNLOAD QR
  ========================== */
  const handleDownloadQR = () => {
    const canvas = document.getElementById(
      "certificate-qr"
    ) as HTMLCanvasElement

    if (!canvas) return

    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = url
    link.download = `${qrName.replace(/\s+/g, "-")}-qr.png`
    link.click()
  }

  return (
    <div className="space-y-6">
      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card
            key={cert._id}
            className="bg-card border-border overflow-hidden hover:border-primary/50 transition-colors"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold">
                  {cert.courseName}
                </h3>

                <span
                  className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${
                    cert.valid
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  <CheckCircle className="h-3 w-3" />
                  {cert.valid ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Issue Date
                </p>
                <p className="font-medium">
                  {formatDate(cert.issueDate)}
                </p>
              </div>

              {/* Certificate ID */}
              <div className="border-t pt-3">
                <p className="text-xs text-muted-foreground mb-2">
                  Certificate ID
                </p>

                <div className="flex gap-2 items-center">
                  <code className="flex-1 text-xs truncate bg-background/50 p-2 rounded border font-mono">
                    {cert._id}
                  </code>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(cert._id)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedId === cert._id ? (
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
                  onClick={() => {
                    setQrValue(cert._id)
                    setQrName(cert.courseName)
                  }}
                >
                  <QrCode className="h-4 w-4" />
                  QR
                </Button> 
              <Button
  variant="outline"
  size="sm"
  className="flex-1 gap-2"
  onClick={() =>
    copyToClipboard(
      `${window.location.origin}/verify/${btoa(cert._id)}`,
      true
    )
  }
>
  {copiedLink != null &&
  atob(copiedLink.split("/").at(-1) || "") === cert._id ? (
    <CheckCircle className="h-4 w-4 text-green-500" />
  ) : (
    <>
      <Copy className="h-4 w-4" />
      Link
    </>
  )}
</Button>



                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2"
                  onClick={() =>
                    downloadFromIPFS(
                      cert.ipfsHash,
                      cert.courseName
                    )
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

            <QRCodeCanvas
              id="certificate-qr"
              value={qrValue}
              size={220}
            />

            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={handleDownloadQR}
              >
                Download QR
              </Button>

              <Button
                variant="outline"
                onClick={() => setQrValue(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {certificates.length === 0 && (
        <Card className="p-12 text-center">
          <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <p className="text-muted-foreground">
            No certificates yet
          </p>
        </Card>
      )}
    </div>
  )
}
