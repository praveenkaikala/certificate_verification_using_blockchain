"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// import { DataTable } from "@/components"
import { Search, Filter, Eye, Download, Trash2 } from "lucide-react"
import { DataTable } from "../TableCom"

type Certificate = {
  id: string
  recipient: string
  email: string
  program: string
  issueDate: string
  status: "verified" | "pending"
  blockchainId: string
}

export function InstituteDashboard() {
  const [certificates] = useState<Certificate[]>([
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

  const getStatusColor = (status: string) =>
    status === "verified" ? "text-green-500 bg-green-500/10" : "text-yellow-500 bg-yellow-500/10"

  const columns = [
    {
      key: "id",
      header: "Certificate ID",
    },
    {
      key: "recipient",
      header: "Recipient",
      cell: (row: Certificate) => (
        <div>
          <div className="font-medium text-foreground">{row.recipient}</div>
          <div className="text-xs text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    {
      key: "program",
      header: "Program",
    },
    {
      key: "issueDate",
      header: "Issued",
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Certificate) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "blockchainId",
      header: "Blockchain ID",
      cell: (row: Certificate) => (
        <span className="font-mono text-xs text-muted-foreground">
          {row.blockchainId}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex gap-2 justify-center">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search certificates, recipients..."
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
            />
          </div>
          {/* <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button> */}
        </div>
      </Card>

      {/* Data Table */}
      <Card className="p-4">
        <DataTable
          columns={columns}
          data={certificates}
          pageSize={5}
        />
      </Card>
    </div>
  )
}
