import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils/formatters'

interface AnalyticsMetricCardProps {
  title: string
  value: number | string
  label: string
  icon: React.ReactNode
  trend?: {
    value: string
    type: 'positive' | 'negative' | 'neutral'
    icon?: React.ReactNode
  }
  status?: string
  format?: 'number' | 'currency' | 'percentage'
}

export function AnalyticsMetricCard({
  title,
  value,
  label,
  icon,
  trend,
  status,
  format = 'number',
}: AnalyticsMetricCardProps) {
  const formatValue = () => {
    if (typeof value === 'string') return value
    switch (format) {
      case 'currency':
        return formatCurrency(value)
      case 'percentage':
        return formatPercentage(value / 100)
      default:
        return formatNumber(value)
    }
  }

  const trendColor =
    trend?.type === 'positive'
      ? 'text-green-600 dark:text-green-400'
      : trend?.type === 'negative'
        ? 'text-red-600 dark:text-red-400'
        : 'text-gray-600 dark:text-gray-400'

  return (
    <Card variant="outlined">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                {icon}
              </div>
            </div>
            <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
              {formatValue()}
            </div>
            <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {label}
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
                {trend.icon}
                {trend.value}
              </div>
            )}
          </div>
          {status && (
            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
              {status}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
