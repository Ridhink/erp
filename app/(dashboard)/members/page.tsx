import { Suspense } from 'react'
import { MembersTable } from '@/components/tables/members-table'
import { MembersTabs } from '@/components/members/members-tabs'
import { AddMemberButton } from '@/components/members/add-member-button'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'

// Server Component - fetches data on the server
async function getMembersData(searchParams: {
  page?: string
  limit?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  role?: string
  tab?: string
}) {
  // In production, this would fetch from your API
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay

  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 25
  const activeTab = searchParams.tab || 'all'

  // Mock members data
  const mockMembers = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'team-lead' as const,
      teamId: 'team-1',
      teamName: 'Asia Pacific Team',
    },
    {
      id: '2',
      name: 'Marco Rossi',
      email: 'marco.rossi@example.com',
      role: 'team-lead' as const,
      teamId: 'team-2',
      teamName: 'Europe Team',
    },
    {
      id: '3',
      name: 'Robert Kumar',
      email: 'robert.kumar@example.com',
      role: 'associate' as const,
      teamId: 'team-1',
      teamName: 'Asia Pacific Team',
    },
    {
      id: '4',
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      role: 'associate' as const,
      teamId: 'team-2',
      teamName: 'Europe Team',
    },
    {
      id: '5',
      name: 'John Davis',
      email: 'john.davis@example.com',
      role: 'associate' as const,
      teamId: 'team-1',
      teamName: 'Asia Pacific Team',
    },
    {
      id: '6',
      name: 'Priya Joshi',
      email: 'priya.joshi@example.com',
      role: 'associate' as const,
      teamId: 'team-3',
      teamName: 'Americas Team',
    },
    {
      id: '7',
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      role: 'team-lead' as const,
      teamId: 'team-3',
      teamName: 'Americas Team',
    },
    {
      id: '8',
      name: 'Lisa Wong',
      email: 'lisa.wong@example.com',
      role: 'associate' as const,
      teamId: 'team-1',
      teamName: 'Asia Pacific Team',
    },
  ]

  // Apply tab filter
  let filteredMembers = mockMembers
  if (activeTab === 'team-leads') {
    filteredMembers = mockMembers.filter((m) => m.role === 'team-lead')
  } else if (activeTab === 'associates') {
    filteredMembers = mockMembers.filter((m) => m.role === 'associate')
  }

  // Apply role filter if specified
  if (searchParams.role) {
    filteredMembers = filteredMembers.filter((m) => m.role === searchParams.role)
  }

  // Apply search filter
  if (searchParams.search) {
    const search = searchParams.search.toLowerCase()
    filteredMembers = filteredMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(search) ||
        member.email.toLowerCase().includes(search)
    )
  }

  // Apply pagination
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedMembers = filteredMembers.slice(start, end)

  return {
    members: paginatedMembers,
    total: filteredMembers.length,
    page,
    limit,
    totalPages: Math.ceil(filteredMembers.length / limit),
  }
}

async function getTeamsData() {
  // In production, this would fetch from your API
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay

  // Mock teams data for the dropdown
  return [
    { id: 'team-1', name: 'Asia Pacific Team' },
    { id: 'team-2', name: 'Europe Team' },
    { id: 'team-3', name: 'Americas Team' },
  ]
}

function MembersTableSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default async function MembersPage({
  searchParams,
}: {
  searchParams: {
    page?: string
    limit?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    search?: string
    role?: string
    tab?: string
  }
}) {
  const data = await getMembersData(searchParams)
  const teams = await getTeamsData()
  const activeTab = searchParams.tab || 'all'

  return (
    <div className="space-y-6">
      <DashboardHeader userName="Renjith" />

      {/* Title Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Members Management
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create and manage sales teams with dedicated team leads
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button variant="ghost" size="sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Button>
          <Button variant="ghost" size="sm">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export Report
          </Button>
          <AddMemberButton teams={teams} />
        </div>
      </div>

      {/* Tabs and Table */}
      <div className="space-y-4">
        <Suspense fallback={<div className="h-10 w-48 rounded-lg bg-gray-100 dark:bg-gray-800" />}>
          <MembersTabs activeTab={activeTab} />
        </Suspense>
        <Suspense fallback={<MembersTableSkeleton />}>
          <MembersTable initialData={data} searchParams={searchParams} activeTab={activeTab} />
        </Suspense>
      </div>
    </div>
  )
}
