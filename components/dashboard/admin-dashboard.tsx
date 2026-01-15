import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { LeadMetricCard } from '@/components/dashboard/lead-metric-card'
import { RevenueForecastChart } from '@/components/dashboard/revenue-forecast-chart'
import { LeadSourcesChart } from '@/components/dashboard/lead-sources-chart'
import { TeamPerformanceTable } from '@/components/dashboard/team-performance-table'

// Get admin dashboard data (static for GitHub Pages)
function getAdminDashboardData() {
  return {
    userName: 'Admin',
    metrics: [
      {
        title: 'Total Leads',
        value: 1284,
        change: 12.5,
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ),
        format: 'number' as const,
      },
      {
        title: 'Conversion Rate',
        value: 24.2,
        change: 3.1,
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        format: 'percentage' as const,
      },
      {
        title: 'Revenue',
        value: 42500,
        change: 18.2,
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
        format: 'currency' as const,
      },
      {
        title: 'Active Teams',
        value: 12,
        change: 18.2,
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        ),
        format: 'number' as const,
      },
    ],
    revenueData: [
      { day: 'Mon', value: 4500 },
      { day: 'Tue', value: 6200 },
      { day: 'Wed', value: 9800 },
      { day: 'Thu', value: 7800 },
      { day: 'Fri', value: 8500 },
      { day: 'Sat', value: 7200 },
      { day: 'Sun', value: 6900 },
    ],
    leadSources: [
      { name: 'Website', value: 578, percentage: 45, color: '#1e3a8a' },
      { name: 'Google Ads', value: 321, percentage: 25, color: '#3b82f6' },
      { name: 'Social', value: 257, percentage: 20, color: '#60a5fa' },
      { name: 'WhatsApp', value: 103, percentage: 8, color: '#93c5fd' },
      { name: 'Manual', value: 25, percentage: 2, color: '#dbeafe' },
    ],
    teamMembers: [
      {
        name: 'Ravi Mehta',
        totalLeads: 0,
        callsToday: 0,
        interested: 0,
        conversionRate: 25,
      },
      {
        name: 'Priya Joshi',
        totalLeads: 0,
        callsToday: 0,
        interested: 0,
        conversionRate: 33,
      },
      {
        name: 'Anil Kumar',
        totalLeads: 0,
        callsToday: 0,
        interested: 0,
        conversionRate: 0,
      },
      {
        name: 'Sunita Rao',
        totalLeads: 0,
        callsToday: 0,
        interested: 0,
        conversionRate: 0,
      },
    ],
  }
}

export default function AdminDashboard() {
  const data = getAdminDashboardData()

  return (
    <div className="space-y-6">
      <DashboardHeader userName={data.userName} />

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.metrics.map((metric, index) => (
          <LeadMetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            format={metric.format}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueForecastChart data={data.revenueData} />
        <LeadSourcesChart data={data.leadSources} />
      </div>

      {/* Team Performance Table */}
      <TeamPerformanceTable members={data.teamMembers} />
    </div>
  )
}
