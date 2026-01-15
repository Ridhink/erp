import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface TimelineDataPoint {
  week: string
  leads: number
  conversions: number
  revenue: number
}

interface PerformanceTimelineChartProps {
  data: TimelineDataPoint[]
}

export function PerformanceTimelineChart({ data }: PerformanceTimelineChartProps) {
  const maxValue = Math.max(
    ...data.map((d) => Math.max(d.leads, d.conversions, d.revenue)),
    1
  )
  const chartHeight = 250
  const padding = 50
  const chartWidth = 700

  // Calculate Y-axis labels (0, 15, 30, 45, 60)
  const yAxisLabels = [0, 15, 30, 45, 60]
  const maxYValue = Math.max(...yAxisLabels, maxValue)

  // Calculate points for each series
  const calculatePoints = (values: number[]) => {
    return values.map((value, index) => {
      const x = padding + (index * (chartWidth - padding * 2)) / (data.length - 1)
      const y =
        chartHeight -
        padding -
        (value / maxYValue) * (chartHeight - padding * 2)
      return { x, y, value }
    })
  }

  const leadsPoints = calculatePoints(data.map((d) => d.leads))
  const conversionsPoints = calculatePoints(data.map((d) => d.conversions))
  const revenuePoints = calculatePoints(data.map((d) => d.revenue))

  // Create paths for areas
  const createAreaPath = (points: Array<{ x: number; y: number }>) => {
    if (points.length === 0) return ''
    const path = points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ')
    const lastPoint = points[points.length - 1]
    const firstPoint = points[0]
    return `${path} L ${lastPoint.x} ${chartHeight - padding} L ${firstPoint.x} ${chartHeight - padding} Z`
  }

  // Create paths for lines
  const createLinePath = (points: Array<{ x: number; y: number }>) => {
    if (points.length === 0) return ''
    return points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ')
  }

  const leadsAreaPath = createAreaPath(leadsPoints)
  const leadsLinePath = createLinePath(leadsPoints)
  const conversionsAreaPath = createAreaPath(conversionsPoints)
  const conversionsLinePath = createLinePath(conversionsPoints)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-200 dark:bg-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Leads</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-blue-600 dark:bg-blue-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Conversions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-sm bg-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Revenue (K)</span>
            </div>
          </div>

          {/* Chart */}
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
                      {value}
                    </text>
                  </g>
                )
              })}

              {/* Leads Area */}
              <path
                d={leadsAreaPath}
                fill="#bfdbfe"
                fillOpacity={0.5}
                className="dark:fill-blue-400 dark:fill-opacity-30"
              />
              <path
                d={leadsLinePath}
                fill="none"
                stroke="#93c5fd"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:stroke-blue-400"
              />

              {/* Conversions Area */}
              <path
                d={conversionsAreaPath}
                fill="#3b82f6"
                fillOpacity={0.3}
                className="dark:fill-blue-500 dark:fill-opacity-30"
              />
              <path
                d={conversionsLinePath}
                fill="none"
                stroke="#2563eb"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="dark:stroke-blue-600"
              />

              {/* X-axis labels */}
              {data.map((point, index) => {
                const x = padding + (index * (chartWidth - padding * 2)) / (data.length - 1)
                return (
                  <text
                    key={index}
                    x={x}
                    y={chartHeight - padding + 20}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 dark:fill-gray-400"
                  >
                    {point.week}
                  </text>
                )
              })}
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
