import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters'

interface PerformanceMetric {
  team: string
  totalLeads: number
  conversions: number
  conversionRate: number
  revenue: number
}

interface PerformanceMetricsTableProps {
  data: PerformanceMetric[]
}

export function PerformanceMetricsTable({ data }: PerformanceMetricsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Team
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Total Leads
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Conversions
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Conversion Rate
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((metric, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {metric.team}
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                    {metric.totalLeads}
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                    {metric.conversions}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                      {formatPercentage(metric.conversionRate / 100)}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(metric.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
