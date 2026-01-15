import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent } from '@/components/ui/card'

// Get sales dashboard data (static for GitHub Pages)
function getSalesDashboardData() {
  return {
    userName: 'Sales Associate',
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
  }
}

export default function SalesDashboard() {
  const data = getSalesDashboardData()

  return (
    <div className="space-y-6">
      <DashboardHeader userName={data.userName} />

      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {data.userName}!
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Here&apos;s your personal performance overview
        </p>
      </div>

      {/* Metric Cards */}
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
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Conversions
            </div>
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

      {/* Recent Leads */}
      <Card>
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Recent Leads
          </h3>
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
