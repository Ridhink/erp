'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EmptyState } from '@/components/common/empty-state'
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Lead, LeadListResponse, LeadSource, LeadStatus } from '@/types/lead'
import { formatDate } from '@/lib/utils/formatters'
import { debounce } from '@/lib/utils/helpers'
import { cn } from '@/lib/utils/helpers'

interface LeadsTableProps {
  initialData: LeadListResponse
  searchParams: {
    page?: string
    limit?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    search?: string
    status?: string
    source?: string
  }
}

const getSourceIcon = (source: LeadSource) => {
  switch (source) {
    case 'website':
      return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    case 'social-media':
      return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'google-ads':
      return (
        <span className="flex h-4 w-4 items-center justify-center text-xs font-bold text-blue-600">
          G
        </span>
      )
    case 'whatsapp':
      return (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      )
    case 'upload':
      return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      )
    default:
      return (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
  }
}

const getSourceLabel = (source: LeadSource): string => {
  const labels: Record<LeadSource, string> = {
    website: 'Website',
    'social-media': 'Social Media',
    'google-ads': 'Google Ads',
    whatsapp: 'WhatsApp',
    upload: 'Upload',
    manual: 'Manual',
  }
  return labels[source]
}

const getStatusBadge = (status: LeadStatus) => {
  const statusConfig: Record<
    LeadStatus,
    { label: string; variant: 'success' | 'warning' | 'error' | 'neutral' | 'info' }
  > = {
    new: { label: 'New', variant: 'info' },
    assigned: { label: 'Assigned', variant: 'warning' },
    interested: { label: 'Interested', variant: 'success' },
    'follow-up': { label: 'Follow-up', variant: 'warning' },
    'not-interested': { label: 'Not Interested', variant: 'error' },
  }

  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}

export function LeadsTable({ initialData, searchParams }: LeadsTableProps) {
  const router = useRouter()
  const [search, setSearch] = React.useState(searchParams.search || '')

  const debouncedSearch = React.useMemo(
    () =>
      debounce((...args: unknown[]) => {
        const value = typeof args[0] === 'string' ? args[0] : ''
        const params = new URLSearchParams(window.location.search)
        if (value) {
          params.set('search', value)
        } else {
          params.delete('search')
        }
        params.set('page', '1')
        router.push(`/leads?${params.toString()}`)
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
    router.push(`/leads?${params.toString()}`)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            Showing {initialData.leads.length} of {initialData.total} leads
          </CardTitle>
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={handleSearchChange}
            className="w-64"
          />
        </div>
      </CardHeader>
      <CardContent>
        {initialData.leads.length === 0 ? (
          <EmptyState
            title="No leads found"
            message={
              searchParams.search
                ? 'No leads match your search criteria'
                : 'Get started by adding your first lead'
            }
            actionLabel={searchParams.search ? undefined : 'Add New Lead'}
            onAction={
              searchParams.search ? undefined : () => router.push('/leads/new')
            }
          />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Lead ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Source
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Assigned To
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Created
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {initialData.leads.map((lead) => (
                    <LeadRow key={lead.id} lead={lead} router={router} />
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
                  {initialData.total} leads
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

function LeadRow({ lead, router }: { lead: Lead; router: ReturnType<typeof useRouter> }) {
  const [showActions, setShowActions] = React.useState(false)

  const handleEdit = () => {
    router.push(`/leads/${lead.id}/edit`)
  }

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete lead ${lead.leadId}?`)) {
      // In production, call API to delete lead
      console.log('Deleting lead:', lead.id)
      // You can add API call here
    }
  }

  return (
    <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50">
      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
        {lead.leadId}
      </td>
      <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
        {lead.name}
      </td>
      <td className="px-4 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {lead.phone}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {lead.email}
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="text-blue-500">{getSourceIcon(lead.source)}</span>
          {getSourceLabel(lead.source)}
        </div>
      </td>
      <td className="px-4 py-4">{getStatusBadge(lead.status)}</td>
      <td className="px-4 py-4">
        <span
          className={cn(
            'text-sm',
            lead.assignedTo
              ? 'text-gray-900 dark:text-white'
              : 'text-red-600 dark:text-red-400'
          )}
        >
          {lead.assignedTo || 'Unassigned'}
        </span>
      </td>
      <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
        {formatDate(lead.createdAt, 'short')}
      </td>
      <td className="px-4 py-4 text-right">
        <div className="relative flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/leads/${lead.id}`)}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Button>
          <div className="relative">
            <DropdownMenuTrigger
              isOpen={showActions}
              onToggle={() => setShowActions(!showActions)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenu
              items={[
                {
                  label: 'Edit Lead',
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
                  onClick: handleEdit,
                  variant: 'default',
                },
                {
                  label: 'Delete Lead',
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
                  onClick: handleDelete,
                  variant: 'danger',
                },
              ]}
              isOpen={showActions}
              onClose={() => setShowActions(false)}
            />
          </div>
        </div>
      </td>
    </tr>
  )
}
