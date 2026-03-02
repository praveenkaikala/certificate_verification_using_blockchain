"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, Ban } from "lucide-react"
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
  // course: string
  valid:boolean
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
        ...endPoints.institute.students.getAll(page, limit),
      })

      setStudents(res?.data?.data?.students)
      setTotalPages(res?.data?.data?.totalPages)

    } catch (error) {
      toast.error("Failed to fetch students")
    }
  }

  const handleToggleBlock = async () => {
    if (!selectedStudent) return

    try {
      setLoadingId(selectedStudent._id)

      await axiosApi({
        ...endPoints.institute.students.remove(selectedStudent._id)
      })

      // optimistic update
      fetchStudents()

      toast.success("Status updated successfully")

    } catch (error) {
      toast.error("Failed to update status")
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
    // {
    //   key: "course",
    //   header: "Course",
    // },
    {
      key: "status",
      header: "Status",
      cell: (row: Student) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium capitalize ${
            row.valid 
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.valid ? "Active" : "InActive"}
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
            variant="outline"
            size="sm"
            disabled={loadingId === row._id}
            onClick={() => {
              setSelectedStudent(row)
              setModalOpen(true)
            }}
            className={
              row.valid
                ? "text-red-600"
                : "text-green-600"
            }
          >
            {row.valid ? "Block" :"UnBlock"}
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
          pageSize={limit}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </Card>

      {/* Confirmation Modal */}
      <ConfirmModal
        open={modalOpen}
        title={
          selectedStudent?.valid
            ? "Block Student"
            : "Unblock Student"
        }
        description={`Are you sure you want to ${
          selectedStudent?.valid
            ? "block"
            : "unblock"
        } this student?`}
        confirmText="Confirm"
        loading={loadingId !== null}
        onCancel={() => {
          setModalOpen(false)
          setSelectedStudent(null)
        }}
        onConfirm={handleToggleBlock}
      />
    </div>
  )
}

export default Page
