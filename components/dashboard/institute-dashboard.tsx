"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Filter, Eye, Download, Trash2 } from "lucide-react"

export function InstituteDashboard() {
  const [certificates, setCertificates] = useState([
    {
      id: "CERT-001",
      recipient: "John Doe",
      email: "john@example.com",
      program: "Advanced Python Development",
      issueDate: "2025-01-15",
      status: "verified",
      blockchainId: "0x742d35...8e5a",
    },
    {
      id: "CERT-002",
      recipient: "Jane Smith",
      email: "jane@example.com",
      program: "Web Development Bootcamp",
      issueDate: "2025-01-18",
      status: "verified",
      blockchainId: "0x8a2f4...c3b2",
    },
    {
      id: "CERT-003",
      recipient: "Alex Johnson",
      email: "alex@example.com",
      program: "Data Science Fundamentals",
      issueDate: "2025-01-20",
      status: "pending",
      blockchainId: "0x3b9f2...a1d4",
    },
    {
      id: "CERT-004",
      recipient: "Maria Garcia",
      email: "maria@example.com",
      program: "Cloud Architecture",
      issueDate: "2025-01-22",
      status: "verified",
      blockchainId: "0xc4e8f...5b6d",
    },
    {
      id: "CERT-005",
      recipient: "Michael Brown",
      email: "michael@example.com",
      program: "Advanced Python Development",
      issueDate: "2025-01-25",
      status: "verified",
      blockchainId: "0xf2a1c...9e3f",
    },
  ])

  const getStatusColor = (status: string) => {
    return status === "verified" ? "text-green-500" : "text-yellow-500"
  }

  const getStatusBg = (status: string) => {
    return status === "verified" ? "bg-green-500/10" : "bg-yellow-500/10"
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="bg-card border-border p-4">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search certificates, recipients..."
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <Button variant="outline" className="gap-2 w-full md:w-auto bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 w-full md:w-auto bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Certificates Table */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Certificate ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Recipient</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Program</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Issued</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Blockchain ID</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {certificates.map((cert) => (
                <tr key={cert.id} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-foreground">{cert.id}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div>{cert.recipient}</div>
                    <div className="text-xs text-muted-foreground/70">{cert.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{cert.program}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{cert.issueDate}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBg(cert.status)} ${getStatusColor(cert.status)}`}
                    >
                      {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-muted-foreground text-xs">{cert.blockchainId}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2 justify-center">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View Certificate">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-destructive" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-border bg-background/50 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1 to 5 of 47 certificates</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
