import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils/formatters'

interface DashboardMetricCardProps {
  title: string
  value: number | string
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: string
    type: 'positive' | 'negative'
  }
  format?: 'number' | 'currency' | 'percentage'
}

export function DashboardMetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  format = 'number',
}: DashboardMetricCardProps) {
  const formatValue = () => {
    if (typeof value === 'string') return value
    switch (format) {
      case 'currency':
        // Format as compact currency (e.g., $74K instead of $74,000)
        if (value >= 1000) {
          return `$${(value / 1000).toFixed(0)}K`
        }
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
      : 'text-red-600 dark:text-red-400'

  return (
    <Card className="flex-1">
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
            <div className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </div>
            {subtitle && (
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {subtitle}
              </div>
            )}
            {trend && (
              <div className={`mt-2 flex items-center gap-1 text-sm font-medium ${trendColor}`}>
                {/* Blue horizontal bar with triangle indicator */}
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-8 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                  <svg className="h-3 w-3 fill-blue-500 dark:fill-blue-400" viewBox="0 0 12 12">
                    <path d="M4 2l4 4-4 4V2z"/>
                  </svg>
                </div>
                {trend.value}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
