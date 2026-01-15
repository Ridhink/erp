import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils/formatters'

interface RevenueDataPoint {
  name: string
  value: number
}

interface RevenueByAssociateChartProps {
  data: RevenueDataPoint[]
}

export function RevenueByAssociateChart({ data }: RevenueByAssociateChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1)
  const chartHeight = 250
  const padding = 50
  const chartWidth = 600
  const barWidth = chartWidth / data.length - 20
  const barGap = 20

  // Calculate Y-axis labels (0 to 60000)
  const yAxisLabels = [0, 15000, 30000, 45000, 60000]
  const maxYValue = Math.max(...yAxisLabels, maxValue)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Associate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <svg
            width={chartWidth + padding * 2}
            height={chartHeight + padding}
            className="w-full"
          >
            {/* Y-axis grid lines and labels */}
            {yAxisLabels.map((value) => {
              const y =
                chartHeight - padding - (value / maxYValue) * (chartHeight - padding * 2)
              return (
                <g key={value}>
                  <line
                    x1={padding}
                    y1={y}
                    x2={chartWidth + padding}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth={1}
                    className="dark:stroke-gray-700"
                  />
                  <text
                    x={padding - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="text-xs fill-gray-600 dark:fill-gray-400"
                  >
                    {value >= 1000 ? `${value / 1000}k` : value}
                  </text>
                </g>
              )
            })}

            {/* Bars */}
            {data.map((item, index) => {
              const barHeight = (item.value / maxYValue) * (chartHeight - padding * 2)
              const x = padding + index * (barWidth + barGap) + barGap / 2
              const y = chartHeight - padding - barHeight

              return (
                <g key={index}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill="#93c5fd"
                    className="dark:fill-blue-400"
                    rx={4}
                  />
                  {/* Bar label */}
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight - padding + 20}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 dark:fill-gray-400"
                  >
                    {item.name}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
