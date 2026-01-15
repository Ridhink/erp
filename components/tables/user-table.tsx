'use client'

import * as React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/common/empty-state'
import { UserListResponse } from '@/types/user'
import { formatDate } from '@/lib/utils/formatters'
import { debounce } from '@/lib/utils/helpers'

interface UserTableProps {
  initialData: UserListResponse
  searchParams: {
    page?: string
    limit?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    search?: string
  }
}

export function UserTable({ initialData, searchParams }: UserTableProps) {
  const router = useRouter()
  const params = useSearchParams()
  const [search, setSearch] = React.useState(searchParams.search || '')
  const [isLoading, setIsLoading] = React.useState(false)

  const debouncedSearch = React.useMemo(
    () =>
      debounce((...args: unknown[]) => {
        const value = typeof args[0] === 'string' ? args[0] : ''
        const newParams = new URLSearchParams(params.toString())
        if (value) {
          newParams.set('search', value)
        } else {
          newParams.delete('search')
        }
        newParams.set('page', '1') // Reset to first page
        router.push(`/users?${newParams.toString()}`)
      }, 300),
    [params, router]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debouncedSearch(value)
  }

  const handleSort = (column: string) => {
    const newParams = new URLSearchParams(params.toString())
    const currentSort = params.get('sortBy')
    const currentOrder = params.get('sortOrder') as 'asc' | 'desc' | null

    if (currentSort === column && currentOrder === 'asc') {
      newParams.set('sortOrder', 'desc')
    } else {
      newParams.set('sortBy', column)
      newParams.set('sortOrder', 'asc')
    }
    router.push(`/users?${newParams.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(params.toString())
    newParams.set('page', newPage.toString())
    router.push(`/users?${newParams.toString()}`)
  }

  const getSortIcon = (column: string) => {
    const sortBy = params.get('sortBy')
    const sortOrder = params.get('sortOrder')
    if (sortBy !== column) return null

    return sortOrder === 'asc' ? (
      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>All Users</CardTitle>
          <Input
            placeholder="Search users..."
            value={search}
            onChange={handleSearchChange}
            className="w-64"
          />
        </div>
      </CardHeader>
      <CardContent>
        {initialData.users.length === 0 ? (
          <EmptyState
            title="No users found"
            message={
              searchParams.search
                ? 'No users match your search criteria'
                : 'Get started by creating your first user'
            }
            actionLabel={searchParams.search ? undefined : 'Add New User'}
            onAction={
              searchParams.search
                ? undefined
                : () => router.push('/users/new')
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th
                      className="cursor-pointer px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Name
                        {getSortIcon('name')}
                      </div>
                    </th>
                    <th
                      className="cursor-pointer px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center">
                        Email
                        {getSortIcon('email')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">
                      Role
                    </th>
                    <th
                      className="cursor-pointer px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center">
                        Created
                        {getSortIcon('createdAt')}
                      </div>
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {initialData.users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        {user.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {user.email}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="neutral">{user.role}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(user.createdAt, 'short')}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/users/${user.id}`)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {initialData.totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {((initialData.page - 1) * initialData.limit) + 1} to{' '}
                  {Math.min(initialData.page * initialData.limit, initialData.total)} of{' '}
                  {initialData.total} users
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(initialData.page - 1)}
                    disabled={initialData.page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(initialData.page + 1)}
                    disabled={initialData.page >= initialData.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
