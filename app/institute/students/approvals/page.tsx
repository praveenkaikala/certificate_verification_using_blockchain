"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { DataTable } from "@/components/TableCom"
import { Card } from "@/components/ui/card"

type Student = {
  id: string
  regNo: string
  name: string
  email: string
  course: string
  verified: boolean
}

const Page = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      regNo: "REG-2025-001",
      name: "John Doe",
      email: "john@example.com",
      course: "Blockchain Development",
      verified: false,
    },
    {
      id: "2",
      regNo: "REG-2025-002",
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Data Science",
      verified: true,
    },
  ])

  const verifyStudent = (student: Student) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id ? { ...s, verified: true } : s
      )
    )
  }

  const columns = [
    {
      key: "regNo",
      header: "Reg No",
    },
    {
      key: "name",
      header: "Student Name",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "course",
      header: "Course",
    },
    {
      key: "verified",
      header: "Verification Status",
      cell: (row: Student) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.verified
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.verified ? "Verified" : "Pending"}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: (row: Student) =>
        row.verified ? (
          <span className="text-sm text-muted-foreground">
            —
          </span>
        ) : (
          <Button
            size="sm"
            onClick={() => verifyStudent(row)}
            className="gap-1"
          >
            <CheckCircle className="h-4 w-4" />
            Verify
          </Button>
        ),
    },
  ]

  return (
    <div className="p-3 space-y-6">
      <h1 className="text-2xl font-semibold">
        Verify Students
      </h1>
<Card className="p-4">

      <DataTable
        columns={columns}
        data={students}
        pageSize={10}
      />
</Card>
    </div>
  )
}

export default Page
