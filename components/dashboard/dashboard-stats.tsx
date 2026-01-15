import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DashboardStats as DashboardStatsType } from '@/types/dashboard'
import { formatCurrency, formatNumber } from '@/lib/utils/formatters'

interface DashboardStatsProps {
  stats: DashboardStatsType
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Users
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatNumber(stats.totalUsers)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Products
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatNumber(stats.totalProducts)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Revenue
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(stats.totalRevenue)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Active Orders
            </span>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatNumber(stats.activeOrders)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
