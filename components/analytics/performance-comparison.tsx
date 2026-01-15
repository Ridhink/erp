'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils/helpers'
import { formatCurrency, formatNumber } from '@/lib/utils/formatters'

interface ComparisonDataPoint {
  label: string
  value: number
}

interface PerformanceComparisonProps {
  teamsData: ComparisonDataPoint[]
  individualsData?: ComparisonDataPoint[]
  sourcesData?: ComparisonDataPoint[]
}

export function PerformanceComparison({
  teamsData,
  individualsData = [],
  sourcesData = [],
}: PerformanceComparisonProps) {
  const [activeTab, setActiveTab] = React.useState<'teams' | 'individuals' | 'sources'>('teams')

  const currentData =
    activeTab === 'teams'
      ? teamsData
      : activeTab === 'individuals'
        ? individualsData
        : sourcesData

  const maxValue = Math.max(...currentData.map((d) => d.value), 1)
  const chartHeight = 250
  const padding = 50
  const chartWidth = 600
  const barWidth = chartWidth / currentData.length - 20
  const barGap = 20

  // Calculate Y-axis labels (0 to 8000)
  const yAxisLabels = [0, 2000, 4000, 6000, 8000]
  const maxYValue = Math.max(...yAxisLabels, maxValue)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Performance Comparison</CardTitle>
          <Tabs defaultValue="teams" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-auto grid-cols-3">
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="individuals">Individuals</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
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
            {currentData.map((item, index) => {
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
                    {item.label}
                  </text>
                  {/* Value label on top of bar */}
                  {item.value > 0 && (
                    <text
                      x={x + barWidth / 2}
                      y={y - 5}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-900 dark:fill-white"
                    >
                      {item.value >= 1000 ? `${(item.value / 1000).toFixed(1)}k` : item.value}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
