'use client'

import { useAuth } from '@/providers/auth-provider'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { LeadMetricCard } from '@/components/dashboard/lead-metric-card'
import { RevenueForecastChart } from '@/components/dashboard/revenue-forecast-chart'
import { LeadSourcesChart } from '@/components/dashboard/lead-sources-chart'
import { TeamPerformanceTable } from '@/components/dashboard/team-performance-table'
import { DashboardMetricCard } from '@/components/dashboard/dashboard-metric-card'
import { TeamSalesForecastChart } from '@/components/dashboard/team-sales-forecast-chart'
import { LiveActivityMonitor } from '@/components/dashboard/live-activity-monitor'
import { Card, CardContent } from '@/components/ui/card'
import { useMemo } from 'react'

// Admin Dashboard Component
function AdminDashboard() {
  const { user } = useAuth()
  
  const data = useMemo(() => ({
    userName: user?.name || 'Admin',
    metrics: [
      {
        title: 'Total Leads',
        value: 1284,
        change: 12.5,
        icon: (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
      { name: 'Ravi Mehta', totalLeads: 0, callsToday: 0, interested: 0, conversionRate: 25 },
      { name: 'Priya Joshi', totalLeads: 0, callsToday: 0, interested: 0, conversionRate: 33 },
      { name: 'Anil Kumar', totalLeads: 0, callsToday: 0, interested: 0, conversionRate: 0 },
      { name: 'Sunita Rao', totalLeads: 0, callsToday: 0, interested: 0, conversionRate: 0 },
    ],
  }), [user])

  return (
    <div className="space-y-6">
      <DashboardHeader userName={data.userName} />
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
      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueForecastChart data={data.revenueData} />
        <LeadSourcesChart data={data.leadSources} />
      </div>
      <TeamPerformanceTable members={data.teamMembers} />
    </div>
  )
}

// Lead Dashboard Component
function LeadDashboard() {
  const { user } = useAuth()
  
  const data = useMemo(() => ({
    userName: user?.name || 'Team Lead',
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
        { name: 'John', value: 43000 },
        { name: 'Maria', value: 20000 },
        { name: 'Robert', value: 50000 },
        { name: 'Lisa', value: 7000 },
        { name: 'Ahmed', value: 12000 },
      ],
      total: 43000, // Total Team Pipeline
    },
    liveActivity: [
      { name: 'John Davis', calls: 12, conversions: 3, dealValue: 28400 },
      { name: 'Maria Santos', calls: 9, conversions: 2, dealValue: 22100 },
      { name: 'Robert Kumar', calls: 8, conversions: 2, dealValue: 18750 },
      { name: 'Lisa Peterson', calls: 6, conversions: 1, dealValue: 17200 },
      { name: 'Ahmed Ali', calls: 5, conversions: 1, dealValue: 12800 },
    ],
  }), [user])

  return (
    <div className="space-y-6">
      <DashboardHeader userName={data.userName} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardMetricCard
          title="Leads Awaiting Allocation"
          value={data.metrics.leadsAwaitingAllocation}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
        <DashboardMetricCard
          title="Team Conversion Rate"
          value={data.metrics.teamConversionRate}
          format="percentage"
          trend={{ value: '+2.1%', type: 'positive' }}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <DashboardMetricCard
          title="Team Members"
          value={data.metrics.teamMembers}
          subtitle={`${data.metrics.totalTeamMembers} total in team`}
          icon={
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <TeamSalesForecastChart data={data.salesForecast.data} total={data.salesForecast.total} />
        <LiveActivityMonitor members={data.liveActivity} />
      </div>
    </div>
  )
}

// Sales Dashboard Component
function SalesDashboard() {
  const { user } = useAuth()
  
  const data = useMemo(() => ({
    userName: user?.name || 'Sales Associate',
    metrics: {
      myLeads: 15,
      callsToday: 8,
      conversions: 2,
      revenue: 12400,
    },
    recentLeads: [
      { id: '1', name: 'John Doe', status: 'Contacted', value: 2500 },
      { id: '2', name: 'Jane Smith', status: 'Interested', value: 3500 },
      { id: '3', name: 'Bob Johnson', status: 'New', value: 1800 },
    ],
  }), [user])

  return (
    <div className="space-y-6">
      <DashboardHeader userName={data.userName} />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {data.userName}!
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Here&apos;s your personal performance overview
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">My Leads</div>
            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {data.metrics.myLeads}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Calls Today</div>
            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {data.metrics.callsToday}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversions</div>
            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              {data.metrics.conversions}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</div>
            <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
              ${(data.metrics.revenue / 1000).toFixed(0)}K
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Recent Leads</h3>
          <div className="space-y-4">
            {data.recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 dark:border-gray-800"
              >
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{lead.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{lead.status}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    ${(lead.value / 1000).toFixed(1)}K
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Main Dashboard Page Component
export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Render dashboard based on user role
  switch (user.role) {
    case 'admin':
      return <AdminDashboard />
    case 'lead':
      return <LeadDashboard />
    case 'sales':
      return <SalesDashboard />
    default:
      return <AdminDashboard />
  }
}
