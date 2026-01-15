import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface LeadSource {
  name: string
  value: number
  percentage: number
  color: string
}

interface LeadSourcesChartProps {
  data: LeadSource[]
}

// Helper function to create arc path
function createArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const startAngleRad = (startAngle * Math.PI) / 180
  const endAngleRad = (endAngle * Math.PI) / 180

  const x1 = centerX + radius * Math.cos(startAngleRad)
  const y1 = centerY + radius * Math.sin(startAngleRad)
  const x2 = centerX + radius * Math.cos(endAngleRad)
  const y2 = centerY + radius * Math.sin(endAngleRad)

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
}

export function LeadSourcesChart({ data }: LeadSourcesChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = -90 // Start at top

  const centerX = 120
  const centerY = 120
  const outerRadius = 60
  const innerRadius = 40

  // Calculate segments for donut chart
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100
    const angle = (percentage / 100) * 360
    const startAngle = currentAngle
    const endAngle = currentAngle + angle

    const outerPath = createArcPath(centerX, centerY, outerRadius, startAngle, endAngle)
    const innerPath = createArcPath(centerX, centerY, innerRadius, endAngle, startAngle)

    // Combine paths to create donut segment
    const path = `${outerPath} ${innerPath}`

    currentAngle = endAngle

    return {
      ...item,
      path,
      startAngle,
      endAngle,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 md:flex-row">
          {/* Donut Chart */}
          <div className="flex-shrink-0">
            <svg width="240" height="240" viewBox="0 0 240 240">
              {segments.map((segment, index) => (
                <path
                  key={index}
                  d={segment.path}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
              {/* Inner circle to ensure clean center */}
              <circle cx={centerX} cy={centerY} r={innerRadius} fill="white" />
              <text
                x={centerX}
                y={centerY - 5}
                textAnchor="middle"
                className="text-2xl font-bold fill-gray-900 dark:fill-white"
              >
                {total}
              </text>
              <text
                x={centerX}
                y={centerY + 15}
                textAnchor="middle"
                className="text-sm fill-gray-600 dark:fill-gray-400"
              >
                Total Leads
              </text>
            </svg>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </span>
                </div>
                <Badge variant="neutral" className="font-medium">
                  {item.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
