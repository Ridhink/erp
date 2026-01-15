import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/formatters'

interface RevenueDataPoint {
  day: string
  value: number
}

interface RevenueForecastChartProps {
  data: RevenueDataPoint[]
}

export function RevenueForecastChart({ data }: RevenueForecastChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const chartHeight = 200
  const padding = 40
  const chartWidth = 600
  const barWidth = chartWidth / data.length - 10

  // Calculate points for line chart
  const points = data.map((point, index) => {
    const x = padding + (index * chartWidth) / data.length + barWidth / 2
    const y = chartHeight - padding - (point.value / maxValue) * (chartHeight - padding * 2)
    return { x, y, value: point.value, day: point.day }
  })

  // Create path for line
  const linePath = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  // Create path for area (filled under line)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <svg width={chartWidth + padding * 2} height={chartHeight + padding} className="w-full">
            {/* Y-axis labels */}
            {[0, 2500, 5000, 7500, 10000].map((value) => {
              const y = chartHeight - padding - (value / maxValue) * (chartHeight - padding * 2)
              return (
                <g key={value}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={chartWidth + padding}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    strokeDasharray="2,2"
                  />
                  <text
                    x={padding - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="text-xs fill-gray-600 dark:fill-gray-400"
                  >
                    {value === 0 ? '$0' : value >= 1000 ? `$${(value / 1000).toFixed(0)}k` : `$${value}`}
                  </text>
                </g>
              )
            })}

            {/* Area under line */}
            <path d={areaPath} fill="#93c5fd" fillOpacity={0.3} />

            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {points.map((point, index) => (
              <g key={index}>
                <circle cx={point.x} cy={point.y} r={4} fill="#3b82f6" />
                {/* Tooltip on hover would go here */}
              </g>
            ))}

            {/* X-axis labels */}
            {data.map((point, index) => {
              const x = padding + (index * chartWidth) / data.length + barWidth / 2
              return (
                <text
                  key={index}
                  x={x}
                  y={chartHeight - padding + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 dark:fill-gray-400"
                >
                  {point.day}
                </text>
              )
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
