import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardMetricCard } from '@/components/dashboard/dashboard-metric-card'
import { TeamSalesForecastChart } from '@/components/dashboard/team-sales-forecast-chart'
import { LiveActivityMonitor } from '@/components/dashboard/live-activity-monitor'

// Get lead dashboard data (static for GitHub Pages)
function getLeadDashboardData() {
  return {
    userName: 'Team Lead',
    metrics: {
      leadsAwaitingAllocation: 40,
      teamConversionRate: 60.0,
      monthlyForecast: 74000,
      activeLeads: 10,
      teamMembers: 5,
      totalTeamMembers: 6,
    },
    salesForecast: {
      data: [
        { name: 'John', value: 25000 },
        { name: 'Maria', value: 18000 },
        { name: 'Robert', value: 35000 },
        { name: 'Lisa', value: 12000 },
        { name: 'Ahmed', value: 15000 },
      ],
      total: 43000,
    },
    liveActivity: [
      {
        name: 'John Davis',
        calls: 12,
        conversions: 3,
        dealValue: 28400,
      },
      {
        name: 'Maria Santos',
        calls: 9,
        conversions: 2,
        dealValue: 22100,
      },
      {
        name: 'Robert Kumar',
        calls: 8,
        conversions: 2,
        dealValue: 18750,
      },
      {
        name: 'Lisa Peterson',
        calls: 6,
        conversions: 1,
        dealValue: 17200,
      },
      {
        name: 'Ahmed Ali',
        calls: 5,
        conversions: 1,
        dealValue: 12800,
      },
    ],
  }
}

export default function LeadDashboard() {
  const data = getLeadDashboardData()

  return (
    <div className="space-y-6">
      <DashboardHeader userName={data.userName} />

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetricCard
          title="Leads Awaiting Allocation"
          value={data.metrics.leadsAwaitingAllocation}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        />
        <DashboardMetricCard
          title="Team Conversion Rate"
          value={data.metrics.teamConversionRate}
          format="percentage"
          trend={{
            value: '+2.1%',
            type: 'positive',
          }}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
        />
        <DashboardMetricCard
          title="Monthly Forecast"
          value={data.metrics.monthlyForecast}
          format="currency"
          subtitle={`${data.metrics.activeLeads} active leads`}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <DashboardMetricCard
          title="Team Members"
          value={data.metrics.teamMembers}
          subtitle={`${data.metrics.totalTeamMembers} total in team`}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TeamSalesForecastChart data={data.salesForecast.data} total={data.salesForecast.total} />
        <LiveActivityMonitor members={data.liveActivity} />
      </div>
    </div>
  )
}
