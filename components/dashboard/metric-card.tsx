import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Metric } from '@/types/dashboard'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils/formatters'

interface MetricCardProps {
  metric: Metric
}

export function MetricCard({ metric }: MetricCardProps) {
  const formatValue = () => {
    switch (metric.format) {
      case 'currency':
        return formatCurrency(Number(metric.value))
      case 'percentage':
        return formatPercentage(Number(metric.value))
      case 'number':
        return formatNumber(Number(metric.value))
      default:
        return metric.value
    }
  }

  const changeColor =
    metric.changeType === 'increase'
      ? 'text-green-600 dark:text-green-400'
      : metric.changeType === 'decrease'
        ? 'text-red-600 dark:text-red-400'
        : 'text-gray-600 dark:text-gray-400'

  const changeIcon =
    metric.changeType === 'increase' ? (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ) : metric.changeType === 'decrease' ? (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
      </svg>
    ) : null

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {metric.label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {formatValue()}
        </div>
        {metric.change !== undefined && (
          <p className={`mt-1 flex items-center gap-1 text-xs ${changeColor}`}>
            {changeIcon}
            {Math.abs(metric.change)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}
