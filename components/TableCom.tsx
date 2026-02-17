'use client'

import * as React from 'react'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

type Column<T> = {
  key: keyof T | string
  header: React.ReactNode
  cell?: (row: T) => React.ReactNode
  className?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  pageSize?: number
  className?: string
}

export function DataTable<T>({
  columns,
  data,
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(1)

  const totalPages = Math.ceil(data.length / pageSize)

  const paginatedData = React.useMemo(() => {
    const start = (page - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, page, pageSize])

  return (
    <div className="space-y-4">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((col, idx) => (
              <TableHead key={idx} className={col.className}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, rowIdx) => (
              <TableRow key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <TableCell key={colIdx} className={col.className}>
                    {col.cell
                      ? col.cell(row)
                      : (row as any)[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
    
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>

            <button
              className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      
    </div>
  )
}
