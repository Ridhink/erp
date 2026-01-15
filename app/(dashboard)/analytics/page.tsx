import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { LeadStatusDistributionChart } from '@/components/analytics/lead-status-distribution-chart'
import { RevenueByAssociateChart } from '@/components/analytics/revenue-by-associate-chart'
import { AssociatePerformanceIndex } from '@/components/analytics/associate-performance-index'

// Get analytics data (static for GitHub Pages)
function getAnalyticsData() {
  return {
    userName: 'Team Lead',
    leadDistribution: [
      { status: 'Interested', count: 5, color: '#1e3a8a' }, // Dark blue
      { status: 'Contacted', count: 2, color: '#3b82f6' }, // Light blue
      { status: 'Confirmed', count: 1, color: '#93c5fd' }, // Very light blue
      { status: 'Lost', count: 0, color: '#9ca3af' }, // Gray
    ],
    revenueByAssociate: [
      { name: 'John', value: 48000 },
      { name: 'Maria', value: 0 },
      { name: 'Robert', value: 0 },
      { name: 'Lisa', value: 0 },
      { name: 'Ahmed', value: 0 },
    ],
    associatePerformance: [
      {
        name: 'John Davis',
        totalLeads: 7,
        avgDealValue: 7112,
        conversionRate: 14.3,
        targetCompletion: 85,
      },
      {
        name: 'Maria Santos',
        totalLeads: 0,
        avgDealValue: 0,
        conversionRate: 0.0,
        targetCompletion: 85,
      },
      {
        name: 'Robert Kumar',
        totalLeads: 0,
        avgDealValue: 0,
        conversionRate: 0.0,
        targetCompletion: 85,
      },
      {
        name: 'Lisa Peterson',
        totalLeads: 0,
        avgDealValue: 0,
        conversionRate: 0.0,
        targetCompletion: 85,
      },
      {
        name: 'Ahmed Ali',
        totalLeads: 0,
        avgDealValue: 0,
        conversionRate: 0.0,
        targetCompletion: 85,
      },
    ],
  }
}

export default function AnalyticsPage() {
  const data = getAnalyticsData()

  return (
    <div className="space-y-6">
      <DashboardHeader userName={data.userName} />

      {/* Charts Grid - Three Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Lead Distribution Card */}
        <div>
          <LeadStatusDistributionChart data={data.leadDistribution} />
        </div>

        {/* Revenue by Associate Card */}
        <div>
          <RevenueByAssociateChart data={data.revenueByAssociate} />
        </div>

        {/* Associate Performance Index Card - Takes full width */}
        <div className="lg:col-span-2">
          <AssociatePerformanceIndex data={data.associatePerformance} />
        </div>
      </div>
    </div>
  )
}
