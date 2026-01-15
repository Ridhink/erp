'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { EmptyState } from '@/components/common/empty-state'
import { Member, MemberListResponse, MemberRole } from '@/types/member'
import { debounce } from '@/lib/utils/helpers'

interface MembersTableProps {
  initialData: MemberListResponse
  searchParams: {
    page?: string
    limit?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    search?: string
    role?: string
  }
  activeTab?: string
}

const getRoleBadge = (role: MemberRole) => {
  if (role === 'team-lead') {
    return (
      <Badge
        className="bg-[#FFD56A] text-gray-900 font-semibold dark:bg-[#FFD56A] dark:text-gray-900"
      >
        <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Team Lead
      </Badge>
    )
  }
  return (
    <Badge
      className="bg-[#FFADEA] text-gray-900 font-semibold dark:bg-[#FFADEA] dark:text-gray-900"
    >
      <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      Associate
    </Badge>
  )
}

export function MembersTable({ initialData, searchParams, activeTab }: MembersTableProps) {
  const router = useRouter()
  const [search, setSearch] = React.useState(searchParams.search || '')
  const [showActionsMap, setShowActionsMap] = React.useState<Record<string, boolean>>({})

  const debouncedSearch = React.useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(window.location.search)
        if (value) {
          params.set('search', value)
        } else {
          params.delete('search')
        }
        params.set('page', '1')
        router.push(`/members?${params.toString()}`)
      }, 300),
    [router]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    debouncedSearch(value)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', newPage.toString())
    router.push(`/members?${params.toString()}`)
  }

  const toggleActions = (memberId: string) => {
    setShowActionsMap((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }))
  }

  const handleEdit = (member: Member) => {
    router.push(`/members/${member.id}/edit`)
  }

  const handleDelete = (member: Member) => {
    if (confirm(`Are you sure you want to delete ${member.name}?`)) {
      console.log('Delete member:', member.id)
      // Call API to delete member
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {initialData.total} {initialData.total === 1 ? 'member' : 'members'}
          </CardTitle>
          <Input
            placeholder="Search members..."
            value={search}
            onChange={handleSearchChange}
            className="w-64"
          />
        </div>
      </CardHeader>
      <CardContent>
        {initialData.members.length === 0 ? (
          <EmptyState
            title="No members found"
            message={
              searchParams.search
                ? 'No members match your search criteria'
                : 'Get started by adding your first member'
            }
            actionLabel={searchParams.search ? undefined : 'Add New Member'}
            onAction={
              searchParams.search ? undefined : () => router.push('/members/new')
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Member
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Team
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {initialData.members.map((member) => (
                    <MemberRow
                      key={member.id}
                      member={member}
                      router={router}
                      showActions={showActionsMap[member.id]}
                      onToggleActions={() => toggleActions(member.id)}
                      onEdit={() => handleEdit(member)}
                      onDelete={() => handleDelete(member)}
                    />
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
                  {initialData.total} members
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

function MemberRow({
  member,
  router,
  showActions,
  onToggleActions,
  onEdit,
  onDelete,
}: {
  member: Member
  router: ReturnType<typeof useRouter>
  showActions: boolean
  onToggleActions: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300 text-sm font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {member.avatar ? (
              <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
            ) : (
              member.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {member.name}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {member.email}
            </div>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">{getRoleBadge(member.role)}</td>
      <td className="px-4 py-4">
        {member.teamName ? (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {member.teamName}
          </div>
        ) : (
          <span className="text-sm text-gray-400 dark:text-gray-500">No team</span>
        )}
      </td>
      <td className="px-4 py-4 text-right">
        <div className="relative flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/members/${member.id}`)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
          <div className="relative">
            <DropdownMenuTrigger
              isOpen={showActions}
              onToggle={onToggleActions}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenu
              items={[
                {
                  label: 'Edit Member',
                  icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  ),
                  onClick: onEdit,
                  variant: 'default',
                },
                {
                  label: 'Delete Member',
                  icon: (
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  ),
                  onClick: onDelete,
                  variant: 'danger',
                },
              ]}
              isOpen={showActions}
              onClose={() => onToggleActions()}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}
