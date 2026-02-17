'use client'

import { DataTable } from '@/components/TableCom'
import React, { useEffect, useState } from 'react'

type Institute = {
  id: string
  name: string
  email: string
  status: 'active' | 'blocked'
}

const Page = () => {
  const [institutes, setInstitutes] = useState<Institute[]>([])
  const [loadingId, setLoadingId] = useState<string | null>(null)

  useEffect(() => {
    fetchInstitutes()
  }, [])

  const fetchInstitutes = async () => {
    try {
      const res = await fetch('https://api.example.com/institutes')
      const data = await res.json()
      setInstitutes(data)
    } catch (error) {
      console.error('Failed to fetch institutes', error)
    }
  }

  const toggleBlock = async (institute: Institute) => {
    setLoadingId(institute.id)

    try {
      await fetch(
        `https://api.example.com/institutes/${institute.id}/block`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status:
              institute.status === 'active'
                ? 'blocked'
                : 'active',
          }),
        }
      )

      // optimistic update
      setInstitutes((prev) =>
        prev.map((inst) =>
          inst.id === institute.id
            ? {
                ...inst,
                status:
                  inst.status === 'active'
                    ? 'blocked'
                    : 'active',
              }
            : inst
        )
      )
    } catch (error) {
      console.error('Failed to update institute', error)
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
      key: 'RegNo',
      header: 'RegNo',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'status',
      header: 'Status',
      cell: (row: Institute) => (
        <span
          className={`capitalize font-medium ${
            row.status === 'active'
              ? 'text-green-600'
              : 'text-red-600'
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      cell: (row: Institute) => (
        <button
          onClick={() => toggleBlock(row)}
          disabled={loadingId === row.id}
          className={`px-3 py-1 rounded text-xs text-white disabled:opacity-50 ${
            row.status === 'active'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loadingId === row.id
            ? 'Processing...'
            : row.status === 'active'
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
        pageSize={10}
      />
    </div>
  )
}

export default Page
