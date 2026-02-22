"use client"

import type React from "react"
import { ethers } from "ethers"
import { QrReader } from "react-qr-reader"
import QrScanner from "qr-scanner"


import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, CheckCircle, AlertCircle, Loader, Copy, Download, Award, Eye } from "lucide-react"
import axiosApi from "@/utils/axios"
import { CONTRACT, endPoints } from "@/utils/publicUrls"

const CONTRACT_ADDRESS =CONTRACT

const CONTRACT_ABI = [
  "function generateCertificate(string,string,string,string,string)",
  "function getCertificate(string) view returns (string,string,string,string)",
  "function isVerified(string) view returns (bool)"
];


export function CertificateVerifier() {
  const [searchInput, setSearchInput] = useState("")
  const [searching, setSearching] = useState(false)
  const [verified, setVerified] = useState<any | null>(null)
  const [error, setError] = useState("")
 const videoRef = useRef<HTMLVideoElement | null>(null)
const scannerRef = useRef<QrScanner | null>(null)
const [scanOpen, setScanOpen] = useState(false)


const [isValidOnChain, setIsValidOnChain] = useState(false)
const [certDetails,setCertDetails]=useState<any | null>()
useEffect(() => {
  if (!scanOpen || !videoRef.current) return

  scannerRef.current = new QrScanner(
    videoRef.current,
    (result) => {
      const text = result.data

      setSearchInput(text)
      closeScanner()

      setTimeout(() => {
        handleSearch()
      }, 300)
    },
    {
      highlightScanRegion: true,
      highlightCodeOutline: true,
    }
  )

  scannerRef.current.start()

  return () => {
    scannerRef.current?.stop()
    scannerRef.current?.destroy()
    scannerRef.current = null
  }
}, [scanOpen])
const closeScanner = () => {
  scannerRef.current?.stop()
  scannerRef.current?.destroy()
  scannerRef.current = null
  setScanOpen(false)
}

const handleSearch = async () => {
  if (!searchInput.trim()) {
    setError("Please enter a certificate ID")
    return
  }

  try {
    setSearching(true)
    setError("")
    setVerified(null)
    setIsValidOnChain(false)
    setCertDetails(null)

    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545")

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    )

    const exists = await contract.isVerified(searchInput)

    if (!exists) {
      setError("Certificate not found on blockchain ❌")
      return
    }

    // If exists on blockchain
    setIsValidOnChain(true)

  } catch (err) {
    console.error(err)
    setError("Verification failed. Please check network.")
  } finally {
    setSearching(false)
  }
}

const handleGetDetails = async () => {
  try {
    setSearching(true)
    setError("")

    const res = await axiosApi(
      {
        ...endPoints.public.details(searchInput)
      }
    )

    const data = res.data.data;
    console.log(data)
    setCertDetails(data)

  } catch (err: any) {
    setError(err.message)
  } finally {
    setSearching(false)
  }
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
            Search by Certificate ID
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
  variant="outline"
  onClick={() => setScanOpen(!scanOpen)}
  className="gap-2"
>
  Scan QR
</Button>
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
            0x742d35cc6634c0532925a3b844bc9e7595e5a2b3c8e5a
          </p>
        </div>
      </Card>
  {scanOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <Card className="w-full max-w-md p-4 relative">
      
      {/* Close Button */}
      <button
        onClick={closeScanner}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
      >
        ✕
      </button>

      <h2 className="text-lg font-semibold mb-4 text-center">
        Scan Certificate QR Code
      </h2>

      <div className="relative">
        <video
          ref={videoRef}
          className="w-full rounded-lg"
          style={{ height: "300px", objectFit: "cover" }}
        />
      </div>

      <p className="text-xs text-muted-foreground text-center mt-3">
        Point your camera at the QR code
      </p>
    </Card>
  </div>
)}




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
     {isValidOnChain && (
  <Card className="bg-green-500/10 border-green-500/20 p-6 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <CheckCircle className="h-5 w-5 text-green-500" />
      <div>
        <h3 className="font-medium text-green-500">
          Certificate Verified on Blockchain
        </h3>
        <p className="text-sm text-green-500/80">
          This certificate exists on blockchain.
        </p>
      </div>
    </div>
      {
        certDetails ? (
  <Card className="bg-card border-border overflow-hidden mt-6">
    
    {/* Header */}
    <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b border-border flex items-start justify-between">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {certDetails.courseName}
        </h2>
        <p className="text-muted-foreground">
          Issued by {certDetails.instituteId.name}
        </p>
      </div>
      <Award className="h-12 w-12 text-primary opacity-20" />
    </div>

    <div className="p-6 space-y-8">

      {/* Student Info */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
          Student Information
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Name</p>
            <p className="font-semibold text-foreground">
              {certDetails.studentId.name}
            </p>
          </div>

          <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Registration No</p>
            <p className="font-semibold text-foreground">
              {certDetails.studentId.reg_no}
            </p>
          </div>

          <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <p className="font-semibold text-foreground">
              {certDetails.studentId.email}
            </p>
          </div>

          <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">IPFS Hash</p>
            <p className="font-mono text-sm break-all text-foreground">
              {certDetails.ipfsHash}
            </p>
          </div>
        </div>
      </div>

      {/* Blockchain Info */}
      <div className="border-t border-border pt-6">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Blockchain Details
        </p>

        <div className="grid md:grid-cols-2 gap-4">

          <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Transaction Hash</p>
            <div className="flex items-center gap-2">
              <code className="text-xs break-all font-mono text-foreground">
                {certDetails.transactionHash}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() =>
                  navigator.clipboard.writeText(certDetails.transactionHash)
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Issue Date</p>
            <p className="font-semibold text-foreground">
              {new Date(certDetails.issueDate).toLocaleDateString()}
            </p>
          </div>

          {/* <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">IPFS Hash</p>
            <p className="font-mono text-sm break-all text-foreground">
              {certDetails.ipfsHash}
            </p>
          </div> */}

          <div className="bg-background/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <p className="font-semibold text-green-500">
              {certDetails.valid ? "Valid Certificate" : "Revoked"}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <Button
          variant="outline"
          className="flex-1 gap-2 bg-transparent"
          onClick={() =>
            window.open(
              `http://scarlet-impossible-squirrel-929.mypinata.cloud/ipfs/${certDetails.ipfsHash}`,
              "_blank"
            )
          }
        >
          <Eye className="h-4 w-4" />
          View Certificate
        </Button>
      </div>
    </div>
  </Card>

        ):
    <Button onClick={handleGetDetails}>
      Get Details
    </Button>
      }
  </Card>
)}

    </div>
  )
}
