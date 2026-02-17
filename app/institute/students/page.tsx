"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Ban } from "lucide-react"
import { DataTable } from "@/components/TableCom"
import { Card } from "@/components/ui/card"

type Student = {
  id: string
  regNo: string
  name: string
  email: string
  course: string
  status: "active" | "blocked"
}

const Page = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      regNo: "REG-2025-001",
      name: "John Doe",
      email: "john@example.com",
      course: "Blockchain Development",
      status: "active",
    },
    {
      id: "2",
      regNo: "REG-2025-002",
      name: "Jane Smith",
      email: "jane@example.com",
      course: "Data Science",
      status: "blocked",
    },
  ])

  const toggleBlock = (student: Student) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === student.id
          ? {
              ...s,
              status: s.status === "active" ? "blocked" : "active",
            }
          : s
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
      key: "status",
      header: "Status",
      cell: (row: Student) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium capitalize ${
            row.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: Student) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleBlock(row)}
            className={
              row.status === "active"
                ? "text-red-600"
                : "text-green-600"
            }
          >
            <Ban className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-3 space-y-6">
      <h1 className="text-2xl font-semibold">
        Students List
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
