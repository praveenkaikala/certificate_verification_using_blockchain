'use client'

import { DataTable } from '@/components/TableCom'
import axiosApi from '@/utils/axios'
import { endPoints } from '@/utils/publicUrls'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Institute = {
  _id: string
  name: string
  email: string
  isApproved: boolean
}

const Page = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [page,setPage]=useState(1);
  const [limit,setLimit]=useState(10)
  const [totalPages,setTotalPages]=useState(0)
  useEffect(() => {
    fetchInstitutes()
  }, [])

  const fetchInstitutes = async () => {
    try {
      const res = await axiosApi({
        ...endPoints.admin.getInstitutes(page,limit)
      })
     
      setInstitutes(res?.data?.data?.institutes)
      setTotalPages(res?.data?.data?.totalPages)
    } catch (error) {
      console.error('Failed to fetch institutes', error)
    }
  }

  const toggleBlock = async (instituteId:string) => {
    setLoadingId(instituteId)

    try {
      await axiosApi({
        ...endPoints.admin.verifyInstitute(instituteId)
      })
      // optimistic update
      setInstitutes((prev) =>
        prev.map((inst) =>
          inst._id === instituteId
            ? {
                ...inst,
                isApproved:
                  inst.isApproved
                    ? false
                    : true,
              }
            : inst
        )
      )
      toast.success("Updated Successfully")
    } catch (error) {
      toast.error('Failed to update institute')
    } finally {
      setLoadingId(null)
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'Institute Name',
    },
    {
      key: 'reg_no',
      header: 'RegNo',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'isApproved',
      header: 'Status',
      cell: (row: Institute) => (
        <span
          className={`capitalize font-medium ${
            row.isApproved
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {row.isApproved ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      cell: (row: Institute) => (
        <button
          onClick={() => toggleBlock(row._id)}
          disabled={loadingId === row._id}
          className={`px-3 py-1 rounded text-xs text-white disabled:opacity-50 ${
           row.isApproved
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loadingId === row._id
            ? 'Processing...'
            : row.isApproved
            ? 'Block'
            : 'Unblock'}
        </button>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Manage Institutes
      </h1>

      <DataTable
        columns={columns}
        data={institutes}
        pageSize={limit}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  )
}

export default Page
