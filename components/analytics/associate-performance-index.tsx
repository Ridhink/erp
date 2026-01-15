import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercentage } from '@/lib/utils/formatters'

interface AssociatePerformance {
  name: string
  totalLeads: number
  avgDealValue: number
  conversionRate: number
  targetCompletion: number
}

interface AssociatePerformanceIndexProps {
  data: AssociatePerformance[]
}

// Generate avatar initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function AssociatePerformanceIndex({ data }: AssociatePerformanceIndexProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Associate Performance Index</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Associate
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Total Leads
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Avg. Deal Value
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Conversion Rate
                </th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Target Completion
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((associate, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  {/* Associate with Avatar */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {getInitials(associate.name)}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {associate.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                    {associate.totalLeads}
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                    {associate.avgDealValue > 0 
                      ? `$${associate.avgDealValue.toLocaleString()}` 
                      : '$0'}
                  </td>
                  <td className="px-4 py-4 text-right text-sm text-gray-600 dark:text-gray-400">
                    {formatPercentage(associate.conversionRate / 100)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2 rounded-full dark:bg-blue-500"
                          style={{ width: `${associate.targetCompletion}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                        {associate.targetCompletion}%
                      </span>
                    </div>
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
