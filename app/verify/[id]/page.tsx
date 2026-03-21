"use client"

import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  AlertCircle,
  Loader,
  Copy,
  Award,
  Eye,
  ShieldCheck,
} from "lucide-react"
import axiosApi from "@/utils/axios"
import { CONTRACT, endPoints } from "@/utils/publicUrls"

export default function CertificateVerifier() {
  const params = useParams()
  const certificateId = atob(params.id as string)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isValidOnChain, setIsValidOnChain] = useState(false)
  const [certDetails, setCertDetails] = useState<any | null>(null)

  const verifyCertificate = async () => {
    try {

      fetchDetails()
      
    } catch (err) {
      console.error(err)
      setError("Verification failed. Please check network.")
    } finally {
      setLoading(false)
    }
  }

  const fetchDetails = async () => {
    try {
      const res = await axiosApi({
        ...endPoints.public.details(certificateId),
      })

      setCertDetails(res.data.data)
      setIsValidOnChain(true)
    } catch (err: any) {
      setError("Certificate not found on blockchain ❌")
    }
  }

  useEffect(() => {
    if (certificateId) verifyCertificate()
  }, [certificateId])

  return (
    <div className="min-h-screen  py-16 px-4">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold">
            Certificate Verification
          </h1>

          <p className="text-muted-foreground max-w-xl mx-auto">
            This page verifies academic certificates issued on the
            blockchain. If the certificate exists on-chain and matches the
            stored data, it will be marked as valid.
          </p>

          <p className="text-xs text-muted-foreground">
            Certificate ID: <span className="font-mono">{certificateId}</span>
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <Card className="p-6 flex items-center justify-center gap-3">
            <Loader className="animate-spin h-5 w-5" />
            Verifying certificate...
          </Card>
        )}

        {/* Error */}
        {error && (
          <Card className="bg-destructive/10 border-destructive/20 p-5 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive mt-1" />
            <div>
              <h3 className="font-medium text-destructive">
                Verification Failed
              </h3>
              <p className="text-sm text-destructive/80">{error}</p>
            </div>
          </Card>
        )}

        {/* Blockchain Verification */}
        {isValidOnChain && (
          <Card className="bg-green-500/10 border-green-500/20 p-5 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <h3 className="font-semibold text-green-500">
                Certificate Verified on Blockchain
              </h3>
              <p className="text-sm text-green-500/80">
                The certificate record exists on the blockchain and has not
                been tampered with.
              </p>
            </div>
          </Card>
        )}

        {/* Certificate Details */}
        {certDetails && (
          <Card className="overflow-hidden shadow-sm">

            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-6 border-b flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">
                  {certDetails.courseName.toUpperCase()}
                </h2>

                <p className="text-muted-foreground mt-1">
                  Issued by{" "}
                  <span className="font-medium">
                    {certDetails?.instituteId?.name.toUpperCase()}
                  </span>
                </p>
              </div>

              <Award className="h-12 w-12 text-primary opacity-30" />
            </div>

            <div className="p-6 space-y-8">

              {/* Student Information */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
                  Student Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="font-semibold">
                      {certDetails.studentId.name.toUpperCase()}
                    </p>
                  </div>

                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground">
                      Registration No
                    </p>
                    <p className="font-semibold">
                      {certDetails.studentId.reg_no.toUpperCase()}
                    </p>
                  </div>

                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-semibold">
                      {certDetails.studentId.email}
                    </p>
                  </div>

                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground">
                      IPFS Hash
                    </p>
                    <p className="font-mono text-sm break-all">
                      {certDetails.ipfsHash}
                    </p>
                  </div>
                </div>
              </div>

              {/* Blockchain Details */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
                  Blockchain Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">

                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground">
                      Transaction Hash
                    </p>

                    <div className="flex gap-2 items-center mt-1">
                      <code className="text-xs break-all">
                        {certDetails.transactionHash}
                      </code>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            certDetails.transactionHash
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground">
                      Issue Date
                    </p>

                    <p className="font-semibold">
                      {new Date(
                        certDetails.issueDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-background p-4 rounded-lg border">
                    <p className="text-xs text-muted-foreground">
                      Status
                    </p>

                    <p className="font-semibold text-green-500">
                      {certDetails.valid
                        ? "Valid Certificate"
                        : "Revoked"}
                    </p>
                  </div>
                </div>
              </div>

              {/* View Certificate */}
              <Button
                className="w-full gap-2"
                size="lg"
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
          </Card>
        )}

      </div>
    </div>
  )
}
