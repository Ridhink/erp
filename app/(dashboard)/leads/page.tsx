import { Suspense } from 'react'
import { LeadsTable } from '@/components/tables/leads-table'
import { LeadSummaryCard } from '@/components/dashboard/lead-summary-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { AddLeadModal } from '@/components/forms/add-lead-modal'

// Server Component - fetches data on the server
async function getLeadsData(searchParams: {
  page?: string
  limit?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  status?: string
  source?: string
}) {
  // In production, this would fetch from your API
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay

  const page = Number(searchParams.page) || 1
  const limit = Number(searchParams.limit) || 25

  // Mock leads data
  const mockLeads = [
    {
      id: '1',
      leadId: 'L001',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@email.com',
      source: 'website' as const,
      status: 'new' as const,
      assignedTo: undefined,
      createdAt: new Date('2025-12-04T09:30:00').toISOString(),
    },
    {
      id: '2',
      leadId: 'L002',
      name: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya.sharma@email.com',
      source: 'social-media' as const,
      status: 'new' as const,
      assignedTo: undefined,
      createdAt: new Date('2025-12-04T10:15:00').toISOString(),
    },
    {
      id: '3',
      leadId: 'L003',
      name: 'Amit Patel',
      phone: '+91 98765 43212',
      email: 'amit.patel@email.com',
      source: 'google-ads' as const,
      status: 'assigned' as const,
      assignedTo: 'Ravi Mehta',
      createdAt: new Date('2025-12-03T14:20:00').toISOString(),
    },
    {
      id: '4',
      leadId: 'L004',
      name: 'Sunita Rao',
      phone: '+91 98765 43213',
      email: 'sunita.rao@email.com',
      source: 'whatsapp' as const,
      status: 'interested' as const,
      assignedTo: 'Priya Joshi',
      createdAt: new Date('2025-12-03T11:45:00').toISOString(),
    },
    {
      id: '5',
      leadId: 'L005',
      name: 'Vikram Singh',
      phone: '+91 98765 43214',
      email: 'vikram.singh@email.com',
      source: 'upload' as const,
      status: 'follow-up' as const,
      assignedTo: 'Ravi Mehta',
      createdAt: new Date('2025-12-02T16:30:00').toISOString(),
    },
    {
      id: '6',
      leadId: 'L006',
      name: 'Anjali Mehta',
      phone: '+91 98765 43215',
      email: 'anjali.mehta@email.com',
      source: 'website' as const,
      status: 'interested' as const,
      assignedTo: 'Sunita Rao',
      createdAt: new Date('2025-12-02T10:00:00').toISOString(),
    },
    {
      id: '7',
      leadId: 'L007',
      name: 'Rahul Gupta',
      phone: '+91 98765 43216',
      email: 'rahul.gupta@email.com',
      source: 'social-media' as const,
      status: 'follow-up' as const,
      assignedTo: undefined,
      createdAt: new Date('2025-12-01T13:20:00').toISOString(),
    },
    {
      id: '8',
      leadId: 'L008',
      name: 'Kavita Nair',
      phone: '+91 98765 43217',
      email: 'kavita.nair@email.com',
      source: 'google-ads' as const,
      status: 'assigned' as const,
      assignedTo: 'Priya Joshi',
      createdAt: new Date('2025-12-01T09:15:00').toISOString(),
    },
    {
      id: '9',
      leadId: 'L009',
      name: 'Suresh Iyer',
      phone: '+91 98765 43218',
      email: 'suresh.iyer@email.com',
      source: 'whatsapp' as const,
      status: 'new' as const,
      assignedTo: undefined,
      createdAt: new Date('2025-12-04T08:00:00').toISOString(),
    },
    {
      id: '10',
      leadId: 'L010',
      name: 'Meera Krishnan',
      phone: '+91 98765 43219',
      email: 'meera.krishnan@email.com',
      source: 'manual' as const,
      status: 'not-interested' as const,
      assignedTo: 'Ravi Mehta',
      createdAt: new Date('2025-11-30T15:45:00').toISOString(),
    },
  ]

  // Apply filters
  let filteredLeads = mockLeads
  if (searchParams.search) {
    const search = searchParams.search.toLowerCase()
    filteredLeads = mockLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(search) ||
        lead.email.toLowerCase().includes(search) ||
        lead.leadId.toLowerCase().includes(search) ||
        lead.phone.includes(search)
    )
  }

  if (searchParams.status) {
    filteredLeads = filteredLeads.filter((lead) => lead.status === searchParams.status)
  }

  if (searchParams.source) {
    filteredLeads = filteredLeads.filter((lead) => lead.source === searchParams.source)
  }

  // Apply pagination
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedLeads = filteredLeads.slice(start, end)

  // Calculate summary stats
  const summary = {
    totalLeads: mockLeads.length,
    newLeads: mockLeads.filter((l) => l.status === 'new' && !l.assignedTo).length,
    interested: mockLeads.filter((l) => l.status === 'interested').length,
    followUps: mockLeads.filter((l) => l.status === 'follow-up').length,
    notInterested: mockLeads.filter((l) => l.status === 'not-interested').length,
  }

  // Calculate today's new leads (mock: assume 2 new today)
  const todayNew = 2

  return {
    leads: {
      leads: paginatedLeads,
      total: filteredLeads.length,
      page,
      limit,
      totalPages: Math.ceil(filteredLeads.length / limit),
    },
    summary: {
      ...summary,
      todayNew,
    },
  }
}

function LeadsTableSkeleton() {
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

// Static page for static export - searchParams handled client-side
export default async function LeadsPage() {
  // Use default/empty params for static generation
  const data = await getLeadsData({})

  return (
    <div className="space-y-6">
      <DashboardHeader userName="Renjith" />

      {/* Title Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Leads Overview
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Master Lead Database
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <LeadSummaryCard
          title="Total Leads"
          value={data.summary.totalLeads}
          subtitle={`+${data.summary.todayNew} today`}
          subtitleColor="green"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <LeadSummaryCard
          title="New Leads"
          value={data.summary.newLeads}
          subtitle="Unassigned"
          subtitleColor="red"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />
        <LeadSummaryCard
          title="Interested"
          value={data.summary.interested}
          subtitle="Hot leads!"
          subtitleColor="orange"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <LeadSummaryCard
          title="Follow-ups"
          value={data.summary.followUps}
          subtitle="Pending"
          subtitleColor="orange"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <LeadSummaryCard
          title="Not Interested"
          value={data.summary.notInterested}
          subtitle="Closed"
          subtitleColor="red"
          icon={
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
        />
      </div>

      {/* Leads Table */}
      <Suspense fallback={<LeadsTableSkeleton />}>
        <LeadsTable initialData={data.leads} searchParams={{}} />
      </Suspense>
    </div>
  )
}
