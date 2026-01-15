import { Suspense } from 'react'
import { TeamsList } from '@/components/teams/teams-list'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Team } from '@/types/team'

// Server Component - fetches data on the server
async function getTeamsData() {
  // In production, this would fetch from your API
  await new Promise((resolve) => setTimeout(resolve, 100)) // Simulate API delay

  const mockTeams: Team[] = [
    {
      id: '1',
      name: 'Asia Pacific Team',
      memberCount: 5,
      teamLead: {
        id: 'lead-1',
        name: 'Sarah Chen',
        title: 'Team Lead',
        isStarred: true,
      },
      metrics: {
        conversion: 14.2,
        revenue: 385000,
      },
      members: [
        { id: 'm1', name: 'Robert Kumar' },
        { id: 'm2', name: 'Maria' },
        { id: 'm3', name: 'John Davis' },
      ],
      performance: {
        change: 12,
        period: 'this month',
      },
    },
    {
      id: '2',
      name: 'Europe Team',
      memberCount: 0,
      teamLead: {
        id: 'lead-2',
        name: 'Marco Rossi',
        title: 'Team Lead',
        isStarred: true,
      },
      metrics: {
        conversion: 12.8,
        revenue: 342000,
      },
      members: [],
      performance: undefined,
    },
  ]

  return {
    teams: mockTeams,
    total: mockTeams.length,
  }
}

function TeamsGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} variant="outlined">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function TeamsPage() {
  const data = await getTeamsData()

  return (
    <div className="space-y-6">
      <DashboardHeader userName="Renjith" />

      {/* Title Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Teams Management
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Create and manage sales teams with dedicated team leads
          </p>
        </div>
      </div>

      {/* Teams Grid */}
      <Suspense fallback={<TeamsGridSkeleton />}>
        <TeamsList teams={data.teams} />
      </Suspense>
    </div>
  )
}
