import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils/formatters'

interface LeadMetricCardProps {
  title: string
  value: number | string
  change: number
  icon: React.ReactNode
  format?: 'number' | 'currency' | 'percentage'
}

export function LeadMetricCard({
  title,
  value,
  change,
  icon,
  format = 'number',
}: LeadMetricCardProps) {
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

  const isPositive = change >= 0
  const changeColor = isPositive
    ? 'text-green-600 dark:text-green-400'
    : 'text-red-600 dark:text-red-400'

  return (
    <Card className="flex-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              {icon}
              {title}
            </div>
            <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
              {formatValue()}
            </div>
            <div className={`flex items-center gap-1 text-sm font-medium ${changeColor}`}>
              {isPositive ? (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              )}
              {Math.abs(change)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
