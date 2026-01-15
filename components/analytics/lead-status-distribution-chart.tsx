import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LeadStatusItem {
  status: string
  count: number
  color: string
}

interface LeadStatusDistributionChartProps {
  data: LeadStatusItem[]
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

export function LeadStatusDistributionChart({
  data,
}: LeadStatusDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0)
  let currentAngle = -90 // Start at top

  const centerX = 120
  const centerY = 120
  const outerRadius = 80
  const innerRadius = 50

  // Calculate segments for donut chart
  const segments = data.map((item) => {
    const percentage = (item.count / total) * 100
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
      percentage,
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lead Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6">
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
                  className="dark:stroke-gray-800"
                />
              ))}
              {/* Inner circle to ensure clean center */}
              <circle
                cx={centerX}
                cy={centerY}
                r={innerRadius}
                fill="white"
                className="dark:fill-gray-900"
              />
            </svg>
          </div>

          {/* Legend */}
          <div className="w-full space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.status}:
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
