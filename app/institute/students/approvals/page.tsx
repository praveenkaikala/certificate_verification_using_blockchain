"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { DataTable } from "@/components/TableCom"
import { Card } from "@/components/ui/card"
import axiosApi from "@/utils/axios"
import { endPoints } from "@/utils/publicUrls"
import toast from "react-hot-toast"
import ConfirmModal from "@/components/PopupModel"

type Student = {
  _id: string
  reg_no: string
  name: string
  email: string
  verificationStatus: boolean
}

const Page = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetchStudents()
  }, [page])

  const fetchStudents = async () => {
    try {
      const res = await axiosApi({
        ...endPoints.institute.students.getPending(page, limit),
      })

      setStudents(res?.data?.data?.students)
      setTotalPages(res?.data?.data?.totalPages)

    } catch (error) {
      toast.error("Failed to fetch students")
    }
  }

  const handleVerify = async () => {
    if (!selectedStudent) return

    try {
      setLoadingId(selectedStudent._id)

      await axiosApi({
        ...endPoints.institute.students.verify(selectedStudent._id),
      })

      // Optimistic update (remove verified student from pending list)
      fetchStudents()

      toast.success("Student verified successfully")

    } catch (error) {
      toast.error("Verification failed")
    } finally {
      setLoadingId(null)
      setModalOpen(false)
      setSelectedStudent(null)
    }
  }

  const columns = [
    {
      key: "reg_no",
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
      key: "verificationStatus",
      header: "Verification Status",
      cell: (row: Student) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.verificationStatus
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {row.verificationStatus ? "Verified" : "Pending"}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      cell: (row: Student) =>
        row.verificationStatus ? (
          <span className="text-sm text-muted-foreground">—</span>
        ) : (
          <Button
            size="sm"
            disabled={loadingId === row._id}
            onClick={() => {
              setSelectedStudent(row)
              setModalOpen(true)
            }}
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
          pageSize={limit}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </Card>

      {/* Confirmation Modal */}
      <ConfirmModal
        open={modalOpen}
        title="Verify Student"
        description="Are you sure you want to verify this student?"
        confirmText="Verify"
        loading={loadingId !== null}
        onCancel={() => {
          setModalOpen(false)
          setSelectedStudent(null)
        }}
        onConfirm={handleVerify}
      />
    </div>
  )
}

export default Page
