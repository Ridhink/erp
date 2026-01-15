import { Card, CardContent } from '@/components/ui/card'
import { formatNumber } from '@/lib/utils/formatters'

interface LeadSummaryCardProps {
  title: string
  value: number
  subtitle: string
  subtitleColor?: 'green' | 'red' | 'orange' | 'gray'
  icon: React.ReactNode
}

export function LeadSummaryCard({
  title,
  value,
  subtitle,
  subtitleColor = 'gray',
  icon,
}: LeadSummaryCardProps) {
  const subtitleColors = {
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    orange: 'text-orange-600 dark:text-orange-400',
    gray: 'text-gray-600 dark:text-gray-400',
  }

  return (
    <Card variant="outlined" className="flex-1">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              <span className="text-blue-500">{icon}</span>
              {title}
            </div>
            <div className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
              {formatNumber(value)}
            </div>
            <div className={`text-sm font-medium ${subtitleColors[subtitleColor]}`}>
              {subtitle}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
