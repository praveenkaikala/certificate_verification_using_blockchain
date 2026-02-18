"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Eye, Download, Trash2 } from "lucide-react"
import { DataTable } from "../TableCom"
import axiosApi from "@/utils/axios"
import { endPoints, pinata_gateway } from "@/utils/publicUrls"
import toast from "react-hot-toast"
import ConfirmModal from "../PopupModel"

type Certificate = {
  _id: string
  studentId: {
    name: String
    email: String
  }
  courseName: String
  createdAt: string
  transactionHash: string
  valid: boolean
  ipfsHash:String
}

export function InstituteDashboard() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
const [selectedId, setSelectedId] = useState<string | null>(null)
const [modalOpen, setModalOpen] = useState(false)
const [loadingId, setLoadingId] = useState<string | null>(null)
  useEffect(() => {
    fetchCertificates()
  }, [page])

  const fetchCertificates = async () => {
    try {
      const res = await axiosApi({
        ...endPoints.institute.certificates.getIssued(page, limit),
      })

      setCertificates(res?.data?.data?.certificates)
      setTotalPages(res?.data?.data?.totalPages)

    } catch (error) {
      toast.error("Failed to fetch certificates")
    }
  }
const handleDownload = async (
  hash: String,
  name: String,
  courseName: String
) => {
  try {
    const url = `${pinata_gateway}${hash}`;

    const response = await fetch(url);
    const blob = await response.blob();

    // 🧠 Detect file type
    const contentType = blob.type; 
    const extension = contentType.split("/")[1]; 
    // example:
    // application/pdf -> pdf
    // image/png -> png
    // image/jpeg -> jpeg

    const safeName = `${name.replace(/\s+/g, "")}-${courseName.replace(/\s+/g, "")}`;

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${safeName}.${extension}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  } catch (error) {
    console.error("Download failed", error);
  }
};
const handleDelete = async () => {
  if (!selectedId) return

  try {
    setLoadingId(selectedId)

    await axiosApi({
      ...endPoints.institute.certificates.deleteCertificate(selectedId)
    })

    setCertificates((prev) =>
      prev.filter((cert) => cert._id !== selectedId)
    )

    toast.success("Deleted successfully")

  } catch (error) {
    toast.error("Delete failed")
  } finally {
    setLoadingId(null)
    setModalOpen(false)
    setSelectedId(null)
  }
}



  const getStatusColor = (status: boolean) =>
    status === true
      ? "text-green-500 bg-green-500/10"
      : "text-yellow-500 bg-yellow-500/10"

  const columns = [
    {
      key: "certificateId",
      header: "Certificate ID",
      cell: (row: Certificate) =>
      (
         <span
  title={row._id}
  className="font-mono text-xs text-muted-foreground"
>
  {row.transactionHash
    ? `${row._id.slice(0, 6)}...${row._id.slice(-4)}`
    : "-"}
</span>
      )
    },
    {
      key: "recipient",
      header: "Recipient",
      cell: (row: Certificate) => (
        <div>
          <div className="font-medium">{row.studentId?.name}</div>
          <div className="text-xs text-muted-foreground">
            {row.studentId?.email}
          </div>
        </div>
      ),
    },
    {
      key: "courseName",
      header: "Program",
    },
    {
      key: "issued",
      header: "Issued",
      cell: (row: Certificate) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Certificate) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
            row.valid
          )}`}
        >
          {row.valid ? "Active" : "InActive"}
        </span>
      ),
    },
    {
      key: "transactionHash",
      header: "Blockchain ID",
      cell: (row: Certificate) => (
       <span
  title={row.transactionHash}
  className="font-mono text-xs text-muted-foreground"
>
  {row.transactionHash
    ? `${row.transactionHash.slice(0, 6)}...${row.transactionHash.slice(-4)}`
    : "-"}
</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row:Certificate) => (
        <div className="flex gap-2 justify-center">
          <a
  href={`${pinata_gateway}${row.ipfsHash}`}
  target="_blank"
  rel="noopener noreferrer"
  className="h-8 w-8 p-0 flex items-center justify-center"
>
  <Eye className="h-4 w-4" />
</a>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={()=>handleDownload(row.ipfsHash,row.studentId.name,row.courseName)}>
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:text-destructive"
             onClick={() => {
    setSelectedId(row._id)
    setModalOpen(true)
  }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card className="p-4">
        <div className="flex gap-3 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search certificates..."
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
            />
          </div>
        </div>
      </Card>

      {/* DataTable */}
      <Card className="p-4">
        <DataTable
          columns={columns}
          data={certificates}
          pageSize={limit}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </Card>
      <ConfirmModal
  open={modalOpen}
  title="Delete Certificate"
  description="This certificate will be permanently deleted."
  confirmText="Delete"
  loading={loadingId !== null}
  onCancel={() => {
    setModalOpen(false)
    setSelectedId(null)
  }}
  onConfirm={handleDelete}
/>

    </div>
  )
}
